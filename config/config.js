/**
 * Configuration for CV Auto-Fill Extension
 * Contains API settings, model parameters, and storage keys
 */

export const CONFIG = {
  // OpenAI API Configuration
  OPENAI_API_KEY: '', // User will set this via popup
  OPENAI_MODEL: 'gpt-4-turbo-preview', // Model for all LLM operations
  OPENAI_API_URL: 'https://api.openai.com/v1/chat/completions',

  // Anthropic API Configuration
  ANTHROPIC_API_KEY: '', // User will set this via popup
  ANTHROPIC_MODEL: 'claude-3-5-sonnet-20241022', // Model for all LLM operations
  ANTHROPIC_API_URL: 'https://api.anthropic.com/v1/messages',
  ANTHROPIC_VERSION: '2023-06-01', // API version header

  // Groq API Configuration
  GROQ_API_KEY: '', // User will set this via popup
  GROQ_MODEL: 'llama-3.3-70b-versatile', // Model for all LLM operations
  GROQ_API_URL: 'https://api.groq.com/openai/v1/chat/completions',

  // Model Parameters
  MAX_TOKENS: 2000, // Maximum tokens for responses
  TEMPERATURE_ANALYSIS: 0.3, // Lower temperature for consistent field analysis
  TEMPERATURE_GENERATION: 0.7, // Higher temperature for creative content generation
  TEMPERATURE_PARSING: 0.2, // Very low for structured data extraction

  // Chrome Storage Keys
  STORAGE_KEY_CV_DATA: 'cvData',
  STORAGE_KEY_API_KEY: 'openaiApiKey',
  STORAGE_KEY_ANTHROPIC_API_KEY: 'anthropicApiKey',
  STORAGE_KEY_GROQ_API_KEY: 'groqApiKey',
  STORAGE_KEY_CV_TEXT: 'cvRawText',
  STORAGE_KEY_LLM_PROVIDER: 'llmProvider', // 'openai', 'anthropic', or 'groq'

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
  isValidOpenAIKey: (key) => {
    return typeof key === 'string' && key.startsWith('sk-') && key.length > 20;
  },

  isValidAnthropicKey: (key) => {
    return typeof key === 'string' && key.startsWith('sk-ant-') && key.length > 20;
  },

  isValidGroqKey: (key) => {
    return typeof key === 'string' && key.startsWith('gsk_') && key.length > 20;
  },

  isValidAPIKey: (key, provider) => {
    if (provider === 'anthropic') {
      return VALIDATORS.isValidAnthropicKey(key);
    }
    if (provider === 'groq') {
      return VALIDATORS.isValidGroqKey(key);
    }
    return VALIDATORS.isValidOpenAIKey(key);
  },

  isValidEmail: (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  isValidPhone: (phone) => {
    return /^[\d\s\-\+\(\)]+$/.test(phone);
  }
};
