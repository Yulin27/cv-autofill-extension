/**
 * Popup UI Logic
 * Handles user interactions, CV upload, API key management, and form filling triggers
 */

import { CONFIG, VALIDATORS } from '../config/config.js';

// DOM Elements
let apiKeyInput, toggleApiKeyBtn, saveApiKeyBtn, apiKeyStatus;
let cvUploadInput, uploadArea, cvStatus, cvSummary;
let apiConfigStatus, cvDataStatus, fillFormBtn, viewDataBtn, clearDataBtn;
let loadingOverlay, loadingText, toast;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePopup);

/**
 * Initialize popup UI and load saved state
 */
async function initializePopup() {
  // Get DOM elements
  apiKeyInput = document.getElementById('apiKey');
  toggleApiKeyBtn = document.getElementById('toggleApiKey');
  saveApiKeyBtn = document.getElementById('saveApiKey');
  apiKeyStatus = document.getElementById('apiKeyStatus');

  cvUploadInput = document.getElementById('cvUpload');
  uploadArea = document.getElementById('uploadArea');
  cvStatus = document.getElementById('cvStatus');
  cvSummary = document.getElementById('cvSummary');

  apiConfigStatus = document.getElementById('apiConfigStatus');
  cvDataStatus = document.getElementById('cvDataStatus');
  fillFormBtn = document.getElementById('fillFormBtn');
  viewDataBtn = document.getElementById('viewDataBtn');
  clearDataBtn = document.getElementById('clearDataBtn');

  loadingOverlay = document.getElementById('loadingOverlay');
  loadingText = document.getElementById('loadingText');
  toast = document.getElementById('toast');

  // Set up event listeners
  setupEventListeners();

  // Load and display current state
  await loadCurrentState();
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
  // API Key actions
  toggleApiKeyBtn.addEventListener('click', toggleApiKeyVisibility);
  saveApiKeyBtn.addEventListener('click', saveApiKey);
  apiKeyInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') saveApiKey();
  });

  // CV Upload actions
  uploadArea.addEventListener('click', () => cvUploadInput.click());
  cvUploadInput.addEventListener('change', handleCVUpload);

  // Drag and drop for CV upload
  uploadArea.addEventListener('dragover', handleDragOver);
  uploadArea.addEventListener('dragleave', handleDragLeave);
  uploadArea.addEventListener('drop', handleDrop);

  // Action buttons
  fillFormBtn.addEventListener('click', triggerFormFill);
  viewDataBtn.addEventListener('click', viewCVData);
  clearDataBtn.addEventListener('click', clearAllData);
}

/**
 * Toggle API key visibility
 */
function toggleApiKeyVisibility() {
  if (apiKeyInput.type === 'password') {
    apiKeyInput.type = 'text';
    toggleApiKeyBtn.textContent = '🙈';
  } else {
    apiKeyInput.type = 'password';
    toggleApiKeyBtn.textContent = '👁️';
  }
}

/**
 * Save API key to storage
 */
async function saveApiKey() {
  const apiKey = apiKeyInput.value.trim();

  if (!apiKey) {
    showStatus(apiKeyStatus, 'Please enter an API key', 'error');
    return;
  }

  if (!VALIDATORS.isValidAPIKey(apiKey)) {
    showStatus(apiKeyStatus, 'Invalid API key format. Should start with "sk-"', 'error');
    return;
  }

  try {
    await chrome.storage.local.set({ [CONFIG.STORAGE_KEY_API_KEY]: apiKey });
    showStatus(apiKeyStatus, 'API key saved successfully!', 'success');
    showToast('API key saved successfully!', 'success');
    await updateStatusDisplay();
  } catch (error) {
    showStatus(apiKeyStatus, `Error saving API key: ${error.message}`, 'error');
  }
}

/**
 * Handle CV file upload
 */
async function handleCVUpload(event) {
  const file = event.target.files[0];
  if (file) {
    await processCVFile(file);
  }
}

/**
 * Handle drag over event
 */
function handleDragOver(event) {
  event.preventDefault();
  uploadArea.classList.add('dragover');
}

/**
 * Handle drag leave event
 */
function handleDragLeave(event) {
  event.preventDefault();
  uploadArea.classList.remove('dragover');
}

/**
 * Handle file drop
 */
async function handleDrop(event) {
  event.preventDefault();
  uploadArea.classList.remove('dragover');

  const file = event.dataTransfer.files[0];
  if (file && file.type === 'application/pdf') {
    await processCVFile(file);
  } else {
    showStatus(cvStatus, 'Please drop a PDF file', 'error');
  }
}

/**
 * Process uploaded CV file
 */
async function processCVFile(file) {
  // Validate file
  if (file.type !== 'application/pdf') {
    showStatus(cvStatus, 'Only PDF files are supported', 'error');
    return;
  }

  if (file.size > CONFIG.MAX_PDF_SIZE_MB * 1024 * 1024) {
    showStatus(cvStatus, `File too large. Max size: ${CONFIG.MAX_PDF_SIZE_MB}MB`, 'error');
    return;
  }

  // Check if API key is configured
  const { [CONFIG.STORAGE_KEY_API_KEY]: apiKey } = await chrome.storage.local.get(CONFIG.STORAGE_KEY_API_KEY);
  if (!apiKey) {
    showStatus(cvStatus, 'Please configure your API key first', 'error');
    return;
  }

  try {
    showLoading('Extracting text from PDF...');

    // Read file as array buffer
    const arrayBuffer = await file.arrayBuffer();

    // Send to background script for processing
    const response = await chrome.runtime.sendMessage({
      action: 'parseCVFromPDF',
      pdfData: Array.from(new Uint8Array(arrayBuffer)),
      apiKey: apiKey
    });

    hideLoading();

    if (response.success) {
      showStatus(cvStatus, 'CV uploaded and parsed successfully!', 'success');
      showToast('CV processed successfully!', 'success');
      displayCVSummary(response.cvData);
      await updateStatusDisplay();
    } else {
      showStatus(cvStatus, `Error: ${response.error}`, 'error');
      showToast(`Error processing CV: ${response.error}`, 'error');
    }

  } catch (error) {
    hideLoading();
    showStatus(cvStatus, `Error processing CV: ${error.message}`, 'error');
    showToast(`Error: ${error.message}`, 'error');
  }
}

/**
 * Display CV summary
 */
function displayCVSummary(cvData) {
  if (!cvData) return;

  const { personalInfo, workExperience, education, skills } = cvData;

  let summaryHTML = '<h3>CV Summary</h3>';

  if (personalInfo?.fullName) {
    summaryHTML += `<p><strong>Name:</strong> ${personalInfo.fullName}</p>`;
  }

  if (personalInfo?.email) {
    summaryHTML += `<p><strong>Email:</strong> ${personalInfo.email}</p>`;
  }

  if (workExperience?.length > 0) {
    summaryHTML += `<p><strong>Experience:</strong> ${workExperience.length} positions</p>`;
  }

  if (education?.length > 0) {
    summaryHTML += `<p><strong>Education:</strong> ${education.length} entries</p>`;
  }

  if (skills?.technical?.length > 0) {
    summaryHTML += `<p><strong>Skills:</strong> ${skills.technical.length} technical skills</p>`;
  }

  cvSummary.innerHTML = summaryHTML;
  cvSummary.style.display = 'block';
}

/**
 * Trigger form filling on current page
 */
async function triggerFormFill() {
  try {
    showLoading('Analyzing and filling form...');

    // Get active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Send message to content script
    const response = await chrome.tabs.sendMessage(tab.id, {
      action: 'fillForm'
    });

    hideLoading();

    if (response.success) {
      showToast(`Form filled successfully! ${response.fieldsCount} fields filled.`, 'success');
    } else {
      showToast(`Error: ${response.error}`, 'error');
    }

  } catch (error) {
    hideLoading();
    showToast(`Error: ${error.message}`, 'error');
  }
}

/**
 * View stored CV data
 */
async function viewCVData() {
  try {
    const { [CONFIG.STORAGE_KEY_CV_DATA]: cvData } = await chrome.storage.local.get(CONFIG.STORAGE_KEY_CV_DATA);

    if (!cvData) {
      showToast('No CV data found', 'info');
      return;
    }

    // Open a new window/tab to display data
    const dataWindow = window.open('', 'CV Data', 'width=600,height=700');
    dataWindow.document.write(`
      <html>
        <head>
          <title>CV Data</title>
          <style>
            body {
              font-family: monospace;
              padding: 20px;
              background: #1e1e1e;
              color: #d4d4d4;
            }
            pre {
              background: #252526;
              padding: 15px;
              border-radius: 5px;
              overflow: auto;
              white-space: pre-wrap;
              word-wrap: break-word;
            }
            button {
              background: #007acc;
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 5px;
              cursor: pointer;
              margin-bottom: 15px;
            }
            button:hover {
              background: #005a9e;
            }
          </style>
        </head>
        <body>
          <h2>Stored CV Data</h2>
          <button onclick="navigator.clipboard.writeText(document.getElementById('data').textContent)">
            Copy to Clipboard
          </button>
          <pre id="data">${JSON.stringify(cvData, null, 2)}</pre>
        </body>
      </html>
    `);
  } catch (error) {
    showToast(`Error viewing data: ${error.message}`, 'error');
  }
}

/**
 * Clear all stored data
 */
async function clearAllData() {
  if (!confirm('Are you sure you want to clear all data? This cannot be undone.')) {
    return;
  }

  try {
    await chrome.storage.local.clear();
    apiKeyInput.value = '';
    cvSummary.style.display = 'none';
    showToast('All data cleared successfully', 'success');
    await updateStatusDisplay();
  } catch (error) {
    showToast(`Error clearing data: ${error.message}`, 'error');
  }
}

/**
 * Load and display current state
 */
async function loadCurrentState() {
  try {
    const data = await chrome.storage.local.get([
      CONFIG.STORAGE_KEY_API_KEY,
      CONFIG.STORAGE_KEY_CV_DATA
    ]);

    // Check API key
    const hasApiKey = data[CONFIG.STORAGE_KEY_API_KEY] ? true : false;

    // Check CV data
    const hasCVData = data[CONFIG.STORAGE_KEY_CV_DATA] ? true : false;

    // Update status display
    await updateStatusDisplay();

    // Display CV summary if exists
    if (hasCVData) {
      displayCVSummary(data[CONFIG.STORAGE_KEY_CV_DATA]);
    }

  } catch (error) {
    console.error('Error loading state:', error);
  }
}

/**
 * Update status display
 */
async function updateStatusDisplay() {
  try {
    const data = await chrome.storage.local.get([
      CONFIG.STORAGE_KEY_API_KEY,
      CONFIG.STORAGE_KEY_CV_DATA
    ]);

    const hasApiKey = data[CONFIG.STORAGE_KEY_API_KEY] ? true : false;
    const hasCVData = data[CONFIG.STORAGE_KEY_CV_DATA] ? true : false;

    // Update API key status
    if (hasApiKey) {
      apiConfigStatus.textContent = 'Configured';
      apiConfigStatus.classList.add('configured');
      apiConfigStatus.classList.remove('not-configured');
    } else {
      apiConfigStatus.textContent = 'Not configured';
      apiConfigStatus.classList.add('not-configured');
      apiConfigStatus.classList.remove('configured');
    }

    // Update CV data status
    if (hasCVData) {
      cvDataStatus.textContent = 'Uploaded';
      cvDataStatus.classList.add('configured');
      cvDataStatus.classList.remove('not-configured');
    } else {
      cvDataStatus.textContent = 'Not uploaded';
      cvDataStatus.classList.add('not-configured');
      cvDataStatus.classList.remove('configured');
    }

    // Enable/disable fill form button
    fillFormBtn.disabled = !(hasApiKey && hasCVData);

  } catch (error) {
    console.error('Error updating status:', error);
  }
}

/**
 * Show status message
 */
function showStatus(element, message, type) {
  element.textContent = message;
  element.className = `status-indicator ${type}`;
  element.style.display = 'block';

  // Auto-hide after 5 seconds
  setTimeout(() => {
    element.style.display = 'none';
  }, 5000);
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
  toast.textContent = message;
  toast.className = `toast ${type}`;

  // Trigger reflow to restart animation
  void toast.offsetWidth;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/**
 * Show loading overlay
 */
function showLoading(message = 'Processing...') {
  loadingText.textContent = message;
  loadingOverlay.style.display = 'flex';
}

/**
 * Hide loading overlay
 */
function hideLoading() {
  loadingOverlay.style.display = 'none';
}
