/**
 * Background Service Worker
 * Handles CV parsing, storage operations, and background tasks
 */

// Import required modules
import { extractTextFromPDF } from '../utils/pdf-parser.js';
import { LLMClient } from '../core/llm-client.js';
import { CVParser } from '../core/cv-parser.js';
import { StorageManager } from '../core/storage-manager.js';

console.log('Background service worker loaded');

/**
 * Handle messages from popup and content scripts
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received message:', request.action);

  // Handle different actions
  if (request.action === 'parseCVFromPDF') {
    handleParseCVFromPDF(request, sendResponse);
    return true; // Keep channel open for async response
  }

  if (request.action === 'testAPIKey') {
    handleTestAPIKey(request, sendResponse);
    return true;
  }

  if (request.action === 'getStatus') {
    handleGetStatus(sendResponse);
    return true;
  }

  return false;
});

/**
 * Handle CV parsing from PDF data
 * @param {Object} request - Request object
 * @param {Function} sendResponse - Response callback
 */
async function handleParseCVFromPDF(request, sendResponse) {
  try {
    console.log('Starting CV parsing process...');

    // Convert array back to Uint8Array
    const pdfData = new Uint8Array(request.pdfData);

    // Extract text from PDF
    console.log('Extracting text from PDF...');
    const cvText = await extractTextFromPDF(pdfData.buffer);

    if (!cvText || cvText.length < 50) {
      throw new Error('Extracted text is too short or empty. Please check your PDF.');
    }

    console.log(`Extracted ${cvText.length} characters from PDF`);

    // Save raw text
    await StorageManager.saveCVText(cvText);

    // Initialize LLM client
    const llmClient = new LLMClient(request.apiKey);

    // Parse CV text with LLM
    console.log('Parsing CV text with LLM...');
    const cvParser = new CVParser(llmClient);
    const cvData = await cvParser.parse(cvText);

    console.log('CV parsed successfully');

    // Save parsed data
    await StorageManager.saveCVData(cvData);

    // Send success response
    sendResponse({
      success: true,
      cvData: cvData,
      message: 'CV parsed and saved successfully'
    });

  } catch (error) {
    console.error('Error parsing CV:', error);
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
    const llmClient = new LLMClient(request.apiKey);
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
