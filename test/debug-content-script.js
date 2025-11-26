/**
 * Debug Script to Test Content Script Loading
 *
 * Run this in the browser console on your test page to check if content script is loaded
 */

console.log('=== CONTENT SCRIPT DEBUG ===');

// Check if autoFiller exists
if (typeof autoFiller !== 'undefined') {
  console.log('✓ AutoFiller instance found');
  console.log('AutoFiller initialized:', autoFiller.isInitialized);
} else {
  console.log('✗ AutoFiller instance NOT found - content script may not have loaded');
}

// Check if chrome.runtime.onMessage listener is active
console.log('Chrome runtime available:', typeof chrome !== 'undefined' && typeof chrome.runtime !== 'undefined');

// Try to manually trigger form fill
if (typeof autoFiller !== 'undefined') {
  console.log('Attempting manual form fill test...');
  autoFiller.fillForm()
    .then(result => {
      console.log('Form fill result:', result);
    })
    .catch(error => {
      console.error('Form fill error:', error);
    });
} else {
  console.error('Cannot test form fill - autoFiller not loaded');
}

console.log('=== END DEBUG ===');
