import { CVData, ParseResponse, FillFormResponse } from '../types';

declare const chrome: any;

/**
 * Safe wrapper to get storage values.
 * Returns null if not in a chrome extension environment.
 */
export const getStorageLocal = async (keys: string[]): Promise<Record<string, any>> => {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    return await chrome.storage.local.get(keys);
  }
  console.warn('Chrome Storage API not available (Dev Mode)');
  return {};
};

/**
 * Safe wrapper to set storage values.
 */
export const setStorageLocal = async (data: Record<string, any>): Promise<void> => {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    await chrome.storage.local.set(data);
  } else {
    console.warn('Chrome Storage API not available (Dev Mode): Setting', data);
  }
};

/**
 * Safe wrapper to clear storage.
 */
export const clearStorageLocal = async (): Promise<void> => {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    await chrome.storage.local.clear();
  } else {
    console.warn('Chrome Storage API not available (Dev Mode): Cleared');
  }
};

/**
 * Send message to background script to parse PDF
 */
export const sendParsePDFMessage = async (
  pdfData: number[],
  apiKey: string,
  provider: string
): Promise<ParseResponse> => {
  if (typeof chrome !== 'undefined' && chrome.runtime) {
    return await chrome.runtime.sendMessage({
      action: 'parseCVFromPDF',
      pdfData,
      apiKey,
      provider,
    });
  }
  // Mock response for dev
  return new Promise((resolve) =>
    setTimeout(() => resolve({ success: true, cvData: { personalInfo: { fullName: 'John Doe' } } }), 2000)
  );
};

/**
 * Send message to content script to fill form
 */
export const sendFillFormMessage = async (): Promise<FillFormResponse> => {
  if (typeof chrome !== 'undefined' && chrome.tabs) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) {
      return await chrome.tabs.sendMessage(tab.id, { action: 'fillForm' });
    }
  }
  return { success: false, error: 'No active tab found or not in extension mode' };
};