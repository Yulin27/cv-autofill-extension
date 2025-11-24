/**
 * Field Analyzer Agent (Agent 1)
 * Analyzes form fields and determines the best strategy to fill them
 */

import { CONFIG } from '../config/config.js';
import { safeJSONParse } from '../utils/helpers.js';

export class FieldAnalyzerAgent {
  /**
   * Initialize Field Analyzer Agent
   * @param {LLMClient} llmClient - Initialized LLM client
   */
  constructor(llmClient) {
    this.llmClient = llmClient;
    this.analysisCache = new Map(); // Cache analyses to avoid redundant calls
  }

  /**
   * Analyze a single form field
   * @param {Object} field - Field information
   * @param {Object} cvData - Parsed CV data
   * @param {Object} jobContext - Job/page context
   * @returns {Promise<Object>} - Field analysis result
   */
  async analyzeField(field, cvData, jobContext) {
    // Generate cache key
    const cacheKey = this._generateCacheKey(field);

    // Check cache first
    if (this.analysisCache.has(cacheKey)) {
      return this.analysisCache.get(cacheKey);
    }

    const prompt = this._buildAnalysisPrompt(field, cvData, jobContext);

    try {
      const response = await this.llmClient.complete(prompt, {
        temperature: CONFIG.TEMPERATURE_ANALYSIS,
        response_format: { type: 'json_object' },
        max_tokens: 500
      });

      const analysis = safeJSONParse(response);

      if (!analysis) {
        throw new Error('Failed to parse field analysis');
      }

      // Validate analysis structure
      const validatedAnalysis = this._validateAnalysis(analysis, field);

      // Cache the result
      this.analysisCache.set(cacheKey, validatedAnalysis);

      return validatedAnalysis;

    } catch (error) {
      console.error('Field analysis error:', error);

      // Return fallback analysis
      return this._getFallbackAnalysis(field);
    }
  }

  /**
   * Analyze multiple fields in batch for efficiency
   * @param {Array<Object>} fields - Array of field objects
   * @param {Object} cvData - Parsed CV data
   * @param {Object} jobContext - Job/page context
   * @returns {Promise<Array<Object>>} - Array of field analyses
   */
  async analyzeBatch(fields, cvData, jobContext) {
    // For very large forms, process in smaller batches
    const batchSize = 10;
    const results = [];

    for (let i = 0; i < fields.length; i += batchSize) {
      const batch = fields.slice(i, i + batchSize);

      // Check cache first for this batch
      const uncachedFields = [];
      const cachedResults = [];

      for (const field of batch) {
        const cacheKey = this._generateCacheKey(field);
        if (this.analysisCache.has(cacheKey)) {
          cachedResults.push(this.analysisCache.get(cacheKey));
        } else {
          uncachedFields.push(field);
        }
      }

      // If all fields are cached, use cached results
      if (uncachedFields.length === 0) {
        results.push(...cachedResults);
        continue;
      }

      // Analyze uncached fields
      const prompt = this._buildBatchAnalysisPrompt(uncachedFields, cvData, jobContext);

      try {
        const response = await this.llmClient.complete(prompt, {
          temperature: CONFIG.TEMPERATURE_ANALYSIS,
          response_format: { type: 'json_object' },
          max_tokens: 1500
        });

        const batchAnalysis = safeJSONParse(response);

        if (batchAnalysis && batchAnalysis.analyses && Array.isArray(batchAnalysis.analyses)) {
          // Validate each analysis
          const validatedBatch = uncachedFields.map((field, index) => {
            const analysis = batchAnalysis.analyses[index] || this._getFallbackAnalysis(field);
            const validated = this._validateAnalysis(analysis, field);

            // Cache the result
            const cacheKey = this._generateCacheKey(field);
            this.analysisCache.set(cacheKey, validated);

            return validated;
          });

          results.push(...cachedResults, ...validatedBatch);
        } else {
          throw new Error('Invalid batch analysis response');
        }

      } catch (error) {
        console.error('Batch analysis error:', error);

        // Fallback to individual analysis for this batch
        const individualResults = await Promise.all(
          uncachedFields.map(field => this.analyzeField(field, cvData, jobContext))
        );

        results.push(...cachedResults, ...individualResults);
      }
    }

    return results;
  }

  /**
   * Build analysis prompt for single field
   * @param {Object} field - Field information
   * @param {Object} cvData - CV data
   * @param {Object} jobContext - Job context
   * @returns {string} - Formatted prompt
   * @private
   */
  _buildAnalysisPrompt(field, cvData, jobContext) {
    return `
You are a form field analyzer for job applications. Analyze this form field and determine how to fill it.

FIELD INFORMATION:
- Label: "${field.label || 'N/A'}"
- Placeholder: "${field.placeholder || 'N/A'}"
- Name: "${field.name || 'N/A'}"
- ID: "${field.id || 'N/A'}"
- Type: "${field.type || 'text'}"
- Required: ${field.required ? 'Yes' : 'No'}
- Max Length: ${field.maxLength || 'None'}
- Context: "${field.context || 'N/A'}"

JOB CONTEXT:
- Company: ${jobContext.company || 'Unknown'}
- Position: ${jobContext.position || 'Unknown'}

AVAILABLE CV DATA:
The candidate has the following data available:
- Personal Info: ${cvData.personalInfo?.fullName ? 'Yes' : 'No'}
- Email: ${cvData.personalInfo?.email ? 'Yes' : 'No'}
- Phone: ${cvData.personalInfo?.phone ? 'Yes' : 'No'}
- Work Experience: ${cvData.workExperience?.length || 0} entries
- Education: ${cvData.education?.length || 0} entries
- Technical Skills: ${cvData.skills?.technical?.length || 0} skills
- Summary: ${cvData.summary ? 'Yes' : 'No'}

TASK:
Determine how to fill this field. Return a JSON object with this structure:

{
  "fieldType": "one of: personal_info|experience|education|skills|motivation|custom_question|other",
  "strategy": "one of: direct_match|generate|skip",
  "cvDataPath": "path.to.cv.data (e.g., personalInfo.email) or null",
  "reasoning": "brief explanation of your decision",
  "needsJobContext": true or false,
  "priority": "one of: critical|important|optional"
}

GUIDELINES:
- Use "direct_match" for fields that map directly to CV data (name, email, phone, etc.)
- Use "generate" for fields requiring customized content (cover letter, why this company, etc.)
- Use "skip" only for fields that cannot be filled from CV data and require user-specific input
- Set "critical" priority for required fields and key information
- Set needsJobContext=true if the response should be tailored to this specific job/company

Return ONLY the JSON object:
`;
  }

  /**
   * Build batch analysis prompt
   * @param {Array<Object>} fields - Array of fields
   * @param {Object} cvData - CV data
   * @param {Object} jobContext - Job context
   * @returns {string} - Formatted prompt
   * @private
   */
  _buildBatchAnalysisPrompt(fields, cvData, jobContext) {
    const fieldDescriptions = fields.map((field, index) => `
Field ${index + 1}:
- Label: "${field.label || 'N/A'}"
- Placeholder: "${field.placeholder || 'N/A'}"
- Name: "${field.name || 'N/A'}"
- Type: "${field.type || 'text'}"
- Required: ${field.required ? 'Yes' : 'No'}
`).join('\n');

    return `
You are a form field analyzer for job applications. Analyze these form fields and determine how to fill each one.

JOB CONTEXT:
- Company: ${jobContext.company || 'Unknown'}
- Position: ${jobContext.position || 'Unknown'}

FIELDS TO ANALYZE:
${fieldDescriptions}

AVAILABLE CV DATA:
- Personal Info: Name, Email, Phone, Location
- Work Experience: ${cvData.workExperience?.length || 0} entries
- Education: ${cvData.education?.length || 0} entries
- Skills: ${cvData.skills?.technical?.length || 0} technical skills

TASK:
For each field, determine how to fill it. Return a JSON object with this structure:

{
  "analyses": [
    {
      "fieldType": "personal_info|experience|education|skills|motivation|custom_question|other",
      "strategy": "direct_match|generate|skip",
      "cvDataPath": "path.to.cv.data or null",
      "reasoning": "brief explanation",
      "needsJobContext": true or false,
      "priority": "critical|important|optional"
    }
  ]
}

Return ONLY the JSON object with analyses for all ${fields.length} fields:
`;
  }

  /**
   * Validate analysis structure
   * @param {Object} analysis - Raw analysis
   * @param {Object} field - Original field
   * @returns {Object} - Validated analysis
   * @private
   */
  _validateAnalysis(analysis, field) {
    return {
      fieldName: field.name || field.id || 'unknown',
      fieldType: analysis.fieldType || 'other',
      strategy: analysis.strategy || 'skip',
      cvDataPath: analysis.cvDataPath || null,
      reasoning: analysis.reasoning || 'No reasoning provided',
      needsJobContext: analysis.needsJobContext === true,
      priority: analysis.priority || 'optional'
    };
  }

  /**
   * Get fallback analysis for when AI fails
   * @param {Object} field - Field information
   * @returns {Object} - Fallback analysis
   * @private
   */
  _getFallbackAnalysis(field) {
    // Simple heuristic-based analysis
    const label = (field.label || '').toLowerCase();
    const name = (field.name || '').toLowerCase();
    const combined = label + ' ' + name;

    // Email field
    if (combined.includes('email') || combined.includes('e-mail')) {
      return {
        fieldName: field.name || field.id,
        fieldType: 'personal_info',
        strategy: 'direct_match',
        cvDataPath: 'personalInfo.email',
        reasoning: 'Detected email field',
        needsJobContext: false,
        priority: 'critical'
      };
    }

    // Name field
    if (combined.includes('name') && !combined.includes('company')) {
      return {
        fieldName: field.name || field.id,
        fieldType: 'personal_info',
        strategy: 'direct_match',
        cvDataPath: 'personalInfo.fullName',
        reasoning: 'Detected name field',
        needsJobContext: false,
        priority: 'critical'
      };
    }

    // Phone field
    if (combined.includes('phone') || combined.includes('mobile') || combined.includes('tel')) {
      return {
        fieldName: field.name || field.id,
        fieldType: 'personal_info',
        strategy: 'direct_match',
        cvDataPath: 'personalInfo.phone',
        reasoning: 'Detected phone field',
        needsJobContext: false,
        priority: 'important'
      };
    }

    // Default: skip
    return {
      fieldName: field.name || field.id,
      fieldType: 'other',
      strategy: 'skip',
      cvDataPath: null,
      reasoning: 'Unable to determine field type',
      needsJobContext: false,
      priority: 'optional'
    };
  }

  /**
   * Generate cache key for field
   * @param {Object} field - Field information
   * @returns {string} - Cache key
   * @private
   */
  _generateCacheKey(field) {
    return `${field.name || field.id}_${field.label}_${field.type}`;
  }

  /**
   * Clear analysis cache
   */
  clearCache() {
    this.analysisCache.clear();
  }
}
