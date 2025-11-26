/**
 * API Client for Backend Communication (No Authentication - Personal Use)
 * Handles all API requests to the FastAPI backend
 */

import { CONFIG } from '../config/config.js';

// Backend API configuration
const API_BASE_URL = 'http://localhost:8000/api/v1'; // Change in production
const API_TIMEOUT = 30000; // 30 seconds

export class APIClient {
  /**
   * Initialize API client (no authentication required)
   */
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  /**
   * Make HTTP request to backend
   * @param {string} endpoint - API endpoint path
   * @param {Object} options - Fetch options
   * @returns {Promise<Object>} - Response data
   * @private
   */
  async _request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    // Build headers
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    // Setup timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // Parse response
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || `API request failed with status ${response.status}`);
      }

      return data;

    } catch (error) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        throw new Error('API request timed out');
      }

      throw error;
    }
  }

  // ==================== CV Management APIs ====================

  /**
   * Upload and parse CV
   * @param {File} pdfFile - PDF file object
   * @param {string} apiKey - LLM API key
   * @param {string} provider - LLM provider (openai, anthropic, groq)
   * @returns {Promise<Object>} - Parsed CV data
   */
  async uploadCV(pdfFile, apiKey, provider = 'openai') {
    // Convert file to base64
    const arrayBuffer = await pdfFile.arrayBuffer();
    const base64 = btoa(
      new Uint8Array(arrayBuffer)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );

    return await this._request('/cv/upload', {
      method: 'POST',
      body: JSON.stringify({
        filename: pdfFile.name,
        file_data: base64,
        llm_provider: provider,
        api_key: apiKey
      })
    });
  }

  /**
   * Get user's CV data
   * @returns {Promise<Object>} - CV data
   */
  async getCVData() {
    return await this._request('/cv/data', {
      method: 'GET'
    });
  }

  /**
   * Delete user's CV data
   * @returns {Promise<Object>} - Success message
   */
  async deleteCVData() {
    return await this._request('/cv/data', {
      method: 'DELETE'
    });
  }

  // ==================== AI Agents APIs ====================

  /**
   * Analyze form field
   * @param {Object} field - Field information
   * @param {Object} cvData - CV data
   * @param {Object} pageContext - Page context
   * @returns {Promise<Object>} - Field analysis
   */
  async analyzeField(field, cvData, pageContext = null) {
    return await this._request('/agents/analyze-field', {
      method: 'POST',
      body: JSON.stringify({
        field_label: field.label,
        field_type: field.type,
        field_placeholder: field.placeholder,
        field_context: field.context,
        page_context: pageContext,
        cv_data: cvData
      })
    });
  }

  /**
   * Generate content for field
   * @param {Object} field - Field information
   * @param {Object} analysis - Field analysis
   * @param {Object} cvData - CV data
   * @param {Object} pageContext - Page context
   * @returns {Promise<Object>} - Generated content
   */
  async generateContent(field, analysis, cvData, pageContext = null) {
    return await this._request('/agents/generate-content', {
      method: 'POST',
      body: JSON.stringify({
        field_label: field.label,
        field_type: field.type,
        analysis: analysis,
        cv_data: cvData,
        page_context: pageContext,
        previous_content: null
      })
    });
  }

  /**
   * Batch analyze and generate content for multiple fields
   * This is more efficient for form filling
   * @param {Array} fields - Array of field objects
   * @param {string} apiKey - LLM API key
   * @param {string} provider - LLM provider
   * @param {Object} pageContext - Page context
   * @returns {Promise<Object>} - Batch results
   */
  async analyzeAndGenerateBatch(fields, apiKey, provider = 'openai', pageContext = null) {
    // Add page context to each field
    const fieldsWithContext = fields.map(field => ({
      ...field,
      page_context: pageContext
    }));

    return await this._request('/agents/analyze-and-generate', {
      method: 'POST',
      body: JSON.stringify({
        fields: fieldsWithContext,
        api_key: apiKey,
        provider: provider,
        page_context: pageContext
      })
    });
  }

  // ==================== Health Check ====================

  /**
   * Check API health
   * @returns {Promise<Object>} - Health status
   */
  async healthCheck() {
    return await this._request('/health', {
      method: 'GET'
    });
  }
}

// Helper function to get API client instance (no authentication needed)
export function getAPIClient() {
  return new APIClient();
}
