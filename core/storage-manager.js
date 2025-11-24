/**
 * Storage Manager
 * Handles Chrome storage operations for API keys, CV data, and settings
 */

import { CONFIG } from '../config/config.js';

export class StorageManager {
  /**
   * Save OpenAI API key to storage
   * @param {string} apiKey - OpenAI API key
   * @returns {Promise<void>}
   */
  static async saveAPIKey(apiKey) {
    try {
      await chrome.storage.local.set({
        [CONFIG.STORAGE_KEY_API_KEY]: apiKey
      });
      console.log('API key saved successfully');
    } catch (error) {
      console.error('Error saving API key:', error);
      throw new Error('Failed to save API key');
    }
  }

  /**
   * Get OpenAI API key from storage
   * @returns {Promise<string|null>} - API key or null if not found
   */
  static async getAPIKey() {
    try {
      const result = await chrome.storage.local.get(CONFIG.STORAGE_KEY_API_KEY);
      return result[CONFIG.STORAGE_KEY_API_KEY] || null;
    } catch (error) {
      console.error('Error getting API key:', error);
      return null;
    }
  }

  /**
   * Save parsed CV data to storage
   * @param {Object} cvData - Structured CV data
   * @returns {Promise<void>}
   */
  static async saveCVData(cvData) {
    try {
      await chrome.storage.local.set({
        [CONFIG.STORAGE_KEY_CV_DATA]: cvData
      });
      console.log('CV data saved successfully');
    } catch (error) {
      console.error('Error saving CV data:', error);
      throw new Error('Failed to save CV data');
    }
  }

  /**
   * Get parsed CV data from storage
   * @returns {Promise<Object|null>} - CV data or null if not found
   */
  static async getCVData() {
    try {
      const result = await chrome.storage.local.get(CONFIG.STORAGE_KEY_CV_DATA);
      return result[CONFIG.STORAGE_KEY_CV_DATA] || null;
    } catch (error) {
      console.error('Error getting CV data:', error);
      return null;
    }
  }

  /**
   * Save raw CV text to storage
   * @param {string} cvText - Raw CV text
   * @returns {Promise<void>}
   */
  static async saveCVText(cvText) {
    try {
      await chrome.storage.local.set({
        [CONFIG.STORAGE_KEY_CV_TEXT]: cvText
      });
      console.log('CV text saved successfully');
    } catch (error) {
      console.error('Error saving CV text:', error);
      throw new Error('Failed to save CV text');
    }
  }

  /**
   * Get raw CV text from storage
   * @returns {Promise<string|null>} - CV text or null if not found
   */
  static async getCVText() {
    try {
      const result = await chrome.storage.local.get(CONFIG.STORAGE_KEY_CV_TEXT);
      return result[CONFIG.STORAGE_KEY_CV_TEXT] || null;
    } catch (error) {
      console.error('Error getting CV text:', error);
      return null;
    }
  }

  /**
   * Save custom key-value pair
   * @param {string} key - Storage key
   * @param {*} value - Value to store
   * @returns {Promise<void>}
   */
  static async save(key, value) {
    try {
      await chrome.storage.local.set({ [key]: value });
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
      throw new Error(`Failed to save ${key}`);
    }
  }

  /**
   * Get value by key
   * @param {string} key - Storage key
   * @returns {Promise<*>} - Stored value or null
   */
  static async get(key) {
    try {
      const result = await chrome.storage.local.get(key);
      return result[key] || null;
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
      return null;
    }
  }

  /**
   * Get multiple values by keys
   * @param {Array<string>} keys - Array of storage keys
   * @returns {Promise<Object>} - Object with key-value pairs
   */
  static async getMultiple(keys) {
    try {
      return await chrome.storage.local.get(keys);
    } catch (error) {
      console.error('Error getting multiple values:', error);
      return {};
    }
  }

  /**
   * Remove item from storage
   * @param {string} key - Storage key to remove
   * @returns {Promise<void>}
   */
  static async remove(key) {
    try {
      await chrome.storage.local.remove(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      throw new Error(`Failed to remove ${key}`);
    }
  }

  /**
   * Clear all storage
   * @returns {Promise<void>}
   */
  static async clear() {
    try {
      await chrome.storage.local.clear();
      console.log('All storage cleared');
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw new Error('Failed to clear storage');
    }
  }

  /**
   * Get storage usage info
   * @returns {Promise<Object>} - Object with bytes used and quota
   */
  static async getStorageInfo() {
    try {
      const bytesInUse = await chrome.storage.local.getBytesInUse();
      return {
        bytesInUse,
        bytesInUseMB: (bytesInUse / (1024 * 1024)).toFixed(2),
        // Chrome local storage quota is typically 10MB
        quotaMB: 10
      };
    } catch (error) {
      console.error('Error getting storage info:', error);
      return null;
    }
  }

  /**
   * Check if storage has required data for form filling
   * @returns {Promise<Object>} - Object indicating what data is available
   */
  static async checkReadiness() {
    try {
      const data = await chrome.storage.local.get([
        CONFIG.STORAGE_KEY_API_KEY,
        CONFIG.STORAGE_KEY_CV_DATA
      ]);

      return {
        hasAPIKey: !!data[CONFIG.STORAGE_KEY_API_KEY],
        hasCVData: !!data[CONFIG.STORAGE_KEY_CV_DATA],
        isReady: !!data[CONFIG.STORAGE_KEY_API_KEY] && !!data[CONFIG.STORAGE_KEY_CV_DATA]
      };
    } catch (error) {
      console.error('Error checking readiness:', error);
      return {
        hasAPIKey: false,
        hasCVData: false,
        isReady: false
      };
    }
  }
}
