/**
 * LLM Client
 * Wrapper for OpenAI API calls with error handling and retry logic
 */

import { CONFIG } from '../config/config.js';
import { retryWithBackoff, safeJSONParse } from '../utils/helpers.js';

export class LLMClient {
  /**
   * Initialize LLM client
   * @param {string} apiKey - API key (OpenAI, Anthropic, or Groq)
   * @param {string} provider - Provider name ('openai', 'anthropic', or 'groq')
   * @param {string} model - Model name (optional, uses default for provider)
   */
  constructor(apiKey, provider = 'openai', model = null) {
    this.apiKey = apiKey;
    this.provider = provider;

    if (provider === 'anthropic') {
      this.model = model || CONFIG.ANTHROPIC_MODEL;
      this.apiUrl = CONFIG.ANTHROPIC_API_URL;
      this.apiVersion = CONFIG.ANTHROPIC_VERSION;
    } else if (provider === 'groq') {
      this.model = model || CONFIG.GROQ_MODEL;
      this.apiUrl = CONFIG.GROQ_API_URL;
    } else {
      this.model = model || CONFIG.OPENAI_MODEL;
      this.apiUrl = CONFIG.OPENAI_API_URL;
    }
  }

  /**
   * Complete a prompt with LLM API (OpenAI, Anthropic, or Groq)
   * @param {string} prompt - The prompt to send
   * @param {Object} options - Additional options
   * @param {number} options.temperature - Temperature setting
   * @param {number} options.max_tokens - Max tokens in response
   * @param {Object} options.response_format - Response format (e.g., { type: "json_object" }) - OpenAI and Groq only
   * @returns {Promise<string>} - Response text
   */
  async complete(prompt, options = {}) {
    let requestBody;

    if (this.provider === 'anthropic') {
      // Anthropic API request format
      requestBody = {
        model: this.model,
        max_tokens: options.max_tokens ?? CONFIG.MAX_TOKENS,
        temperature: options.temperature ?? CONFIG.TEMPERATURE_GENERATION,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      };

      // Add system prompt as a separate parameter for Anthropic
      requestBody.system = 'You are a helpful assistant that provides accurate and well-formatted responses.';

    } else {
      // OpenAI and Groq API request format (both use OpenAI-compatible format)
      requestBody = {
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that provides accurate and well-formatted responses.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: options.temperature ?? CONFIG.TEMPERATURE_GENERATION,
        max_tokens: options.max_tokens ?? CONFIG.MAX_TOKENS
      };

      // Add response format if specified (for JSON mode - OpenAI and Groq)
      if (options.response_format) {
        requestBody.response_format = options.response_format;
      }
    }

    try {
      // Use retry with exponential backoff
      const response = await retryWithBackoff(
        () => this._makeRequest(requestBody),
        CONFIG.MAX_RETRIES,
        CONFIG.RETRY_DELAY_MS
      );

      return response;

    } catch (error) {
      console.error('LLM completion error:', error);
      throw new Error(`LLM API call failed: ${error.message}`);
    }
  }

  /**
   * Make actual API request
   * @param {Object} requestBody - Request body for API
   * @returns {Promise<string>} - Response text
   * @private
   */
  async _makeRequest(requestBody) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.API_TIMEOUT_MS);

    try {
      // Build headers based on provider
      const headers = {
        'Content-Type': 'application/json'
      };

      if (this.provider === 'anthropic') {
        headers['x-api-key'] = this.apiKey;
        headers['anthropic-version'] = this.apiVersion;
      } else {
        // OpenAI and Groq both use Bearer token authentication
        headers['Authorization'] = `Bearer ${this.apiKey}`;
      }

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error?.message || errorData.error?.type || `API request failed with status ${response.status}`
        );
      }

      const data = await response.json();

      // Extract response text based on provider
      let content;
      if (this.provider === 'anthropic') {
        // Anthropic response format: { content: [{ type: "text", text: "..." }] }
        content = data.content?.[0]?.text;
      } else {
        // OpenAI and Groq response format: { choices: [{ message: { content: "..." } }] }
        content = data.choices?.[0]?.message?.content;
      }

      if (!content) {
        throw new Error('No content in API response');
      }

      return content.trim();

    } catch (error) {
      clearTimeout(timeoutId);

      // Handle specific error types
      if (error.name === 'AbortError') {
        throw new Error('API request timed out');
      }

      // Handle rate limits
      if (error.message.includes('rate_limit') || error.message.includes('429')) {
        throw new Error('Rate limit exceeded. Please wait and try again.');
      }

      // Handle authentication errors
      if (error.message.includes('401') || error.message.includes('403') || error.message.includes('authentication')) {
        throw new Error('Invalid API key. Please check your configuration.');
      }

      throw error;
    }
  }

  /**
   * Parse CV text into structured data
   * @param {string} cvText - Raw CV text
   * @returns {Promise<Object>} - Structured CV data
   */
  async parseCVText(cvText) {
    const prompt = `
Extract structured information from this CV text and return it as a JSON object.

CV Text:
${cvText}

Return a JSON object with this exact structure:
{
  "personalInfo": {
    "fullName": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "summary": "",
  "workExperience": [
    {
      "company": "",
      "position": "",
      "startDate": "",
      "endDate": "",
      "description": "",
      "achievements": []
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "graduationDate": ""
    }
  ],
  "skills": {
    "technical": [],
    "languages": [],
    "soft": []
  },
  "certifications": []
}

Instructions:
1. Extract all information present in the CV
2. Use empty strings for missing text fields
3. Use empty arrays for missing list fields
4. Ensure dates are in a consistent format (YYYY-MM or YYYY)
5. Return ONLY valid JSON, no markdown formatting or additional text

Return the JSON object now:
`;

    try {
      const options = {
        temperature: CONFIG.TEMPERATURE_PARSING
      };

      // Only add response_format for OpenAI and Groq (Anthropic doesn't support this parameter)
      if (this.provider === 'openai' || this.provider === 'groq') {
        options.response_format = { type: 'json_object' };
      }

      const response = await this.complete(prompt, options);

      // Parse JSON response
      const cvData = safeJSONParse(response);

      if (!cvData) {
        throw new Error('Failed to parse CV data as JSON');
      }

      // Validate structure
      this._validateCVStructure(cvData);

      return cvData;

    } catch (error) {
      console.error('CV parsing error:', error);
      throw new Error(`Failed to parse CV: ${error.message}`);
    }
  }

  /**
   * Validate CV data structure
   * @param {Object} cvData - CV data to validate
   * @throws {Error} - If structure is invalid
   * @private
   */
  _validateCVStructure(cvData) {
    const requiredFields = ['personalInfo', 'workExperience', 'education', 'skills'];

    for (const field of requiredFields) {
      if (!(field in cvData)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Ensure arrays are arrays
    if (!Array.isArray(cvData.workExperience)) {
      cvData.workExperience = [];
    }
    if (!Array.isArray(cvData.education)) {
      cvData.education = [];
    }

    // Ensure objects are objects
    if (typeof cvData.personalInfo !== 'object') {
      cvData.personalInfo = {};
    }
    if (typeof cvData.skills !== 'object') {
      cvData.skills = { technical: [], languages: [], soft: [] };
    }
  }

  /**
   * Batch complete multiple prompts
   * @param {Array<string>} prompts - Array of prompts
   * @param {Object} options - Options for completion
   * @returns {Promise<Array<string>>} - Array of responses
   */
  async batchComplete(prompts, options = {}) {
    try {
      // Execute all prompts in parallel
      const promises = prompts.map(prompt => this.complete(prompt, options));
      return await Promise.all(promises);
    } catch (error) {
      console.error('Batch completion error:', error);
      throw new Error(`Batch completion failed: ${error.message}`);
    }
  }

  /**
   * Test API connection
   * @returns {Promise<boolean>} - True if connection successful
   */
  async testConnection() {
    try {
      await this.complete('Respond with "OK" if you can read this.', {
        temperature: 0,
        max_tokens: 10
      });
      return true;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
}
