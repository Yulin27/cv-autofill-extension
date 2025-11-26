/**
 * Background Service Worker
 * Handles CV parsing, storage operations, and background tasks
 */

console.log('[SERVICE-WORKER] ========================================');
console.log('[SERVICE-WORKER] Service worker script starting to load...');
console.log('[SERVICE-WORKER] ========================================');

// Import required modules - static imports for service worker
console.log('[SERVICE-WORKER] Importing modules...');
import { extractTextFromPDF } from '../utils/pdf-parser.js';
console.log('[SERVICE-WORKER] ✓ pdf-parser imported');

import { LLMClient } from '../core/llm-client.js';
console.log('[SERVICE-WORKER] ✓ llm-client imported');

import { CVParser } from '../core/cv-parser.js';
console.log('[SERVICE-WORKER] ✓ cv-parser imported');

import { StorageManager } from '../core/storage-manager.js';
console.log('[SERVICE-WORKER] ✓ storage-manager imported');

import { APIClient } from '../core/api-client.js';
console.log('[SERVICE-WORKER] ✓ api-client imported');

import { CONFIG } from '../config/config.js';
console.log('[SERVICE-WORKER] ✓ config imported');

console.log('[SERVICE-WORKER] ✓✓✓ All modules loaded successfully');
console.log('[SERVICE-WORKER] Background service worker ready and listening for messages');

/**
 * Handle messages from popup and content scripts
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('[SERVICE-WORKER] ========================================');
  console.log('[SERVICE-WORKER] Message received!');
  console.log('[SERVICE-WORKER] Action:', request.action);
  console.log('[SERVICE-WORKER] Sender:', sender.tab ? `Tab ${sender.tab.id}` : 'Extension popup');
  console.log('[SERVICE-WORKER] ========================================');

  // Handle different actions
  if (request.action === 'parseCVFromPDF') {
    console.log('[SERVICE-WORKER] Handling parseCVFromPDF action...');
    handleParseCVFromPDF(request, sendResponse);
    return true; // Keep channel open for async response
  }

  if (request.action === 'testAPIKey') {
    console.log('[SERVICE-WORKER] Handling testAPIKey action...');
    handleTestAPIKey(request, sendResponse);
    return true;
  }

  if (request.action === 'getStatus') {
    console.log('[SERVICE-WORKER] Handling getStatus action...');
    handleGetStatus(sendResponse);
    return true;
  }

  console.warn('[SERVICE-WORKER] Unknown action:', request.action);
  return false;
});

/**
 * Handle CV parsing from PDF data
 * @param {Object} request - Request object
 * @param {Function} sendResponse - Response callback
 */
async function handleParseCVFromPDF(request, sendResponse) {
  const startTime = Date.now();
  try {
    console.log('\n========================================');
    console.log('[SERVICE-WORKER] Starting CV parsing process...');
    console.log('[SERVICE-WORKER] Using backend:', CONFIG.USE_BACKEND);
    console.log('[SERVICE-WORKER] Provider:', request.provider || 'openai');
    console.log('========================================\n');

    // Convert array back to Uint8Array
    console.log('[SERVICE-WORKER] Step 1: Converting PDF data...');
    const pdfData = new Uint8Array(request.pdfData);
    console.log('[SERVICE-WORKER] ✓ PDF data converted:', pdfData.length, 'bytes');

    let cvData;
    let cvText;

    if (CONFIG.USE_BACKEND) {
      // ===== BACKEND MODE: Use APIClient =====
      console.log('\n[SERVICE-WORKER] Using BACKEND API for CV parsing...');

      // Create File object from PDF data
      const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
      const pdfFile = new File([pdfBlob], 'cv.pdf', { type: 'application/pdf' });

      const provider = request.provider || 'openai';
      const apiClient = new APIClient();

      console.log('[SERVICE-WORKER] Uploading CV to backend...');
      const uploadStart = Date.now();
      const response = await apiClient.uploadCV(pdfFile, request.apiKey, provider);
      const uploadTime = Date.now() - uploadStart;
      console.log(`[SERVICE-WORKER] ✓ Backend processing completed in ${uploadTime}ms`);

      cvData = response.cv_data;
      cvText = response.raw_text || '';

      console.log('[SERVICE-WORKER] Parsed data structure:', {
        hasPersonalInfo: !!cvData.personalInfo,
        workExperienceCount: cvData.workExperience?.length || 0,
        educationCount: cvData.education?.length || 0,
        hasSkills: !!cvData.skills
      });

    } else {
      // ===== DIRECT MODE: Use LLM Client =====
      console.log('\n[SERVICE-WORKER] Using DIRECT LLM API for CV parsing...');

      // Extract text from PDF
      console.log('[SERVICE-WORKER] Step 2: Extracting text from PDF...');
      const extractStart = Date.now();
      cvText = await extractTextFromPDF(pdfData.buffer);
      const extractTime = Date.now() - extractStart;
      console.log(`[SERVICE-WORKER] ✓ Text extraction completed in ${extractTime}ms`);

      if (!cvText || cvText.length < 50) {
        throw new Error('Extracted text is too short or empty. Please check your PDF.');
      }

      console.log(`[SERVICE-WORKER] ✓ Extracted ${cvText.length} characters from PDF`);
      console.log('[SERVICE-WORKER] First 200 chars:', cvText.substring(0, 200) + '...');

      // Initialize LLM client with provider
      const provider = request.provider || 'openai';
      const llmClient = new LLMClient(request.apiKey, provider);

      // Parse CV text with LLM
      console.log(`[SERVICE-WORKER] Step 3: Parsing CV text with LLM (${provider})...`);
      const parseStart = Date.now();
      const cvParser = new CVParser(llmClient);
      cvData = await cvParser.parse(cvText);
      const parseTime = Date.now() - parseStart;
      console.log(`[SERVICE-WORKER] ✓ LLM parsing completed in ${parseTime}ms`);

      console.log('[SERVICE-WORKER] Parsed data structure:', {
        hasPersonalInfo: !!cvData.personalInfo,
        workExperienceCount: cvData.workExperience?.length || 0,
        educationCount: cvData.education?.length || 0,
        hasSkills: !!cvData.skills
      });
    }

    // Save raw text (if available)
    if (cvText) {
      console.log('\n[SERVICE-WORKER] Saving raw CV text to storage...');
      await StorageManager.saveCVText(cvText);
      console.log('[SERVICE-WORKER] ✓ Raw text saved');
    }

    // Save parsed data
    console.log('\n[SERVICE-WORKER] Saving parsed CV data to storage...');
    await StorageManager.saveCVData(cvData);
    console.log('[SERVICE-WORKER] ✓ Parsed data saved');

    const totalTime = Date.now() - startTime;
    console.log('\n========================================');
    console.log(`[SERVICE-WORKER] ✓✓✓ SUCCESS - Total time: ${totalTime}ms (${(totalTime/1000).toFixed(1)}s)`);
    console.log('========================================\n');

    // Send success response
    sendResponse({
      success: true,
      cvData: cvData,
      message: 'CV parsed and saved successfully'
    });

  } catch (error) {
    const totalTime = Date.now() - startTime;
    console.error('\n========================================');
    console.error(`[SERVICE-WORKER] ✗✗✗ ERROR after ${totalTime}ms`);
    console.error('[SERVICE-WORKER] Error details:', error);
    console.error('[SERVICE-WORKER] Error stack:', error.stack);
    console.error('========================================\n');
    sendResponse({
      success: false,
      error: error.message
    });
  }
}

/**
 * Test API key connection
 * @param {Object} request - Request object
 * @param {Function} sendResponse - Response callback
 */
async function handleTestAPIKey(request, sendResponse) {
  try {
    const provider = request.provider || 'openai';
    const llmClient = new LLMClient(request.apiKey, provider);
    const isValid = await llmClient.testConnection();

    sendResponse({
      success: true,
      valid: isValid,
      message: isValid ? 'API key is valid' : 'API key test failed'
    });

  } catch (error) {
    console.error('Error testing API key:', error);
    sendResponse({
      success: false,
      valid: false,
      error: error.message
    });
  }
}

/**
 * Get current extension status
 * @param {Function} sendResponse - Response callback
 */
async function handleGetStatus(sendResponse) {
  try {
    const readiness = await StorageManager.checkReadiness();
    const storageInfo = await StorageManager.getStorageInfo();

    sendResponse({
      success: true,
      readiness: readiness,
      storage: storageInfo
    });

  } catch (error) {
    console.error('Error getting status:', error);
    sendResponse({
      success: false,
      error: error.message
    });
  }
}

/**
 * Handle extension installation
 */
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Extension installed/updated:', details.reason);

  if (details.reason === 'install') {
    // First time installation
    console.log('First time installation - showing welcome message');

    // Open welcome page or show notification
    chrome.action.setBadgeText({ text: 'NEW' });
    chrome.action.setBadgeBackgroundColor({ color: '#10b981' });

    // Clear badge after 5 seconds
    setTimeout(() => {
      chrome.action.setBadgeText({ text: '' });
    }, 5000);
  }

  if (details.reason === 'update') {
    console.log('Extension updated to version:', chrome.runtime.getManifest().version);
  }
});

/**
 * Handle extension startup
 */
chrome.runtime.onStartup.addListener(() => {
  console.log('Extension started');
});

/**
 * Handle storage changes
 */
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local') {
    console.log('Storage changed:', Object.keys(changes));

    // Update badge if CV data is added
    if (changes.cvData) {
      if (changes.cvData.newValue) {
        chrome.action.setBadgeText({ text: '✓' });
        chrome.action.setBadgeBackgroundColor({ color: '#10b981' });
      } else {
        chrome.action.setBadgeText({ text: '' });
      }
    }
  }
});

/**
 * Handle errors
 */
self.addEventListener('error', (event) => {
  console.error('Service worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

console.log('Background service worker ready');
