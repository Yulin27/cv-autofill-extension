/**
 * Configuration for CV Auto-Fill Extension
 * Contains API settings, model parameters, and storage keys
 */

export const CONFIG = {
  // OpenAI API Configuration
  OPENAI_API_KEY: '', // User will set this via popup
  OPENAI_MODEL: 'gpt-4-turbo-preview', // Model for all LLM operations
  OPENAI_API_URL: 'https://api.openai.com/v1/chat/completions',

  // Model Parameters
  MAX_TOKENS: 2000, // Maximum tokens for responses
  TEMPERATURE_ANALYSIS: 0.3, // Lower temperature for consistent field analysis
  TEMPERATURE_GENERATION: 0.7, // Higher temperature for creative content generation
  TEMPERATURE_PARSING: 0.2, // Very low for structured data extraction

  // Chrome Storage Keys
  STORAGE_KEY_CV_DATA: 'cvData',
  STORAGE_KEY_API_KEY: 'openaiApiKey',
  STORAGE_KEY_CV_TEXT: 'cvRawText',

  // API Retry Configuration
  MAX_RETRIES: 3,
  RETRY_DELAY_MS: 1000, // Base delay, will exponentially backoff

  // Form Filling Configuration
  FILL_DELAY_MS: 150, // Delay between filling fields
  HIGHLIGHT_DURATION_MS: 1000, // How long to highlight filled fields

  // PDF Processing
  MAX_PDF_SIZE_MB: 10,

  // Timeouts
  API_TIMEOUT_MS: 30000, // 30 second timeout for API calls
};

// Validation helpers
export const VALIDATORS = {
  isValidAPIKey: (key) => {
    return typeof key === 'string' && key.startsWith('sk-') && key.length > 20;
  },

  isValidEmail: (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  isValidPhone: (phone) => {
    return /^[\d\s\-\+\(\)]+$/.test(phone);
  }
};
