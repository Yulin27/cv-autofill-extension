/**
 * Content Generator Agent (Agent 2)
 * Generates appropriate content for form fields based on CV data and job context
 */

import { CONFIG } from '../config/config.js';
import { getNestedValue, truncate } from '../utils/helpers.js';

export class ContentGeneratorAgent {
  /**
   * Initialize Content Generator Agent
   * @param {LLMClient} llmClient - Initialized LLM client
   */
  constructor(llmClient) {
    this.llmClient = llmClient;
    this.generatedContent = {}; // Track generated content for consistency
  }

  /**
   * Generate content for a form field
   * @param {Object} field - Field information
   * @param {Object} fieldAnalysis - Analysis from FieldAnalyzerAgent
   * @param {Object} cvData - Parsed CV data
   * @param {Object} jobContext - Job/page context
   * @returns {Promise<string|null>} - Generated content or null if skipped
   */
  async generateContent(field, fieldAnalysis, cvData, jobContext) {
    try {
      // Strategy 1: Direct match - extract from CV
      if (fieldAnalysis.strategy === 'direct_match') {
        return this.extractFromCV(cvData, fieldAnalysis.cvDataPath);
      }

      // Strategy 2: Skip - return null
      if (fieldAnalysis.strategy === 'skip') {
        console.log(`Skipping field: ${field.label || field.name}`);
        return null;
      }

      // Strategy 3: Generate - use LLM to create content
      if (fieldAnalysis.strategy === 'generate') {
        const content = await this._generateWithLLM(field, fieldAnalysis, cvData, jobContext);

        // Store for consistency tracking
        this.generatedContent[field.name || field.id] = content;

        return content;
      }

      return null;

    } catch (error) {
      console.error(`Error generating content for field ${field.name}:`, error);
      return null;
    }
  }

  /**
   * Extract data directly from CV using path
   * @param {Object} cvData - CV data
   * @param {string} path - Dot-notation path to data
   * @returns {string|null} - Extracted value or null
   */
  extractFromCV(cvData, path) {
    if (!path) return null;

    const value = getNestedValue(cvData, path);

    if (value === null || value === undefined) {
      return null;
    }

    // Handle arrays (e.g., skills list)
    if (Array.isArray(value)) {
      return value.join(', ');
    }

    // Handle objects
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    // Return as string
    return String(value);
  }

  /**
   * Generate content using LLM
   * @param {Object} field - Field information
   * @param {Object} fieldAnalysis - Field analysis
   * @param {Object} cvData - CV data
   * @param {Object} jobContext - Job context
   * @returns {Promise<string>} - Generated content
   * @private
   */
  async _generateWithLLM(field, fieldAnalysis, cvData, jobContext) {
    const prompt = this._buildGenerationPrompt(field, fieldAnalysis, cvData, jobContext);

    try {
      const response = await this.llmClient.complete(prompt, {
        temperature: CONFIG.TEMPERATURE_GENERATION,
        max_tokens: Math.min(field.maxLength ? field.maxLength / 2 : 1000, CONFIG.MAX_TOKENS)
      });

      // Clean up response (remove quotes if present)
      let content = response.trim();
      if (content.startsWith('"') && content.endsWith('"')) {
        content = content.slice(1, -1);
      }

      // Respect character limit if specified
      if (field.maxLength && content.length > field.maxLength) {
        content = truncate(content, field.maxLength, '...');
      }

      return content;

    } catch (error) {
      console.error('LLM generation error:', error);
      throw error;
    }
  }

  /**
   * Build generation prompt
   * @param {Object} field - Field information
   * @param {Object} fieldAnalysis - Field analysis
   * @param {Object} cvData - CV data
   * @param {Object} jobContext - Job context
   * @returns {string} - Formatted prompt
   * @private
   */
  _buildGenerationPrompt(field, fieldAnalysis, cvData, jobContext) {
    // Build context about previously generated content
    const previousContentContext = Object.keys(this.generatedContent).length > 0
      ? `\n\nPREVIOUSLY GENERATED CONTENT (maintain consistency):\n${JSON.stringify(this.generatedContent, null, 2)}`
      : '';

    return `
You are a job application assistant helping fill out a form field. Generate appropriate, honest content based on the candidate's CV.

FIELD TO FILL:
- Question/Label: "${field.label || field.placeholder || 'N/A'}"
- Field Type: ${field.type || 'text'}
- Character Limit: ${field.maxLength || 'None'}
- Required: ${field.required ? 'Yes' : 'No'}
- Context: ${fieldAnalysis.fieldType}

JOB INFORMATION:
- Company: ${jobContext.company || 'Unknown'}
- Position: ${jobContext.position || 'Unknown'}
${jobContext.description ? `- Job Description: ${jobContext.description.substring(0, 500)}...` : ''}

CANDIDATE PROFILE:
${this._formatCVForPrompt(cvData)}
${previousContentContext}

REQUIREMENTS:
1. Generate content that accurately represents the candidate based on their CV
2. Tailor the response to this specific job and company
3. Be honest and genuine - don't exaggerate or make up information
4. Match the tone and style appropriate for a job application
5. ${field.maxLength ? `Stay within ${field.maxLength} characters` : 'Be concise but comprehensive'}
6. Maintain consistency with any previously generated content
7. For motivation/cover letter fields, explain why the candidate is a good fit
8. For experience questions, draw from the candidate's actual work history
9. Sound natural and professional, not robotic

IMPORTANT: Return ONLY the text to fill in the field. No explanations, no JSON, no quotation marks unless they're part of the actual content, just the plain text that should go in the field.

Generate the content now:
`;
  }

  /**
   * Format CV data for prompt
   * @param {Object} cvData - CV data
   * @returns {string} - Formatted CV summary
   * @private
   */
  _formatCVForPrompt(cvData) {
    let formatted = '';

    // Personal Info
    if (cvData.personalInfo) {
      formatted += 'Personal Information:\n';
      if (cvData.personalInfo.fullName) formatted += `- Name: ${cvData.personalInfo.fullName}\n`;
      if (cvData.personalInfo.email) formatted += `- Email: ${cvData.personalInfo.email}\n`;
      if (cvData.personalInfo.location) formatted += `- Location: ${cvData.personalInfo.location}\n`;
    }

    // Summary
    if (cvData.summary) {
      formatted += `\nProfessional Summary:\n${cvData.summary}\n`;
    }

    // Work Experience
    if (cvData.workExperience && cvData.workExperience.length > 0) {
      formatted += '\nWork Experience:\n';
      cvData.workExperience.slice(0, 3).forEach((exp, index) => {
        formatted += `${index + 1}. ${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate})\n`;
        if (exp.description) formatted += `   ${exp.description}\n`;
        if (exp.achievements && exp.achievements.length > 0) {
          formatted += `   Key achievements: ${exp.achievements.slice(0, 2).join('; ')}\n`;
        }
      });
    }

    // Education
    if (cvData.education && cvData.education.length > 0) {
      formatted += '\nEducation:\n';
      cvData.education.forEach((edu, index) => {
        formatted += `${index + 1}. ${edu.degree} in ${edu.field} from ${edu.institution}`;
        if (edu.graduationDate) formatted += ` (${edu.graduationDate})`;
        formatted += '\n';
      });
    }

    // Skills
    if (cvData.skills) {
      if (cvData.skills.technical && cvData.skills.technical.length > 0) {
        formatted += `\nTechnical Skills: ${cvData.skills.technical.join(', ')}\n`;
      }
      if (cvData.skills.languages && cvData.skills.languages.length > 0) {
        formatted += `Languages: ${cvData.skills.languages.join(', ')}\n`;
      }
    }

    // Certifications
    if (cvData.certifications && cvData.certifications.length > 0) {
      formatted += `\nCertifications: ${cvData.certifications.join(', ')}\n`;
    }

    return formatted;
  }

  /**
   * Generate content for multiple fields in batch
   * @param {Array<Object>} fields - Array of field objects
   * @param {Array<Object>} analyses - Array of field analyses
   * @param {Object} cvData - CV data
   * @param {Object} jobContext - Job context
   * @returns {Promise<Array<Object>>} - Array of {field, content} objects
   */
  async generateBatch(fields, analyses, cvData, jobContext) {
    const results = [];

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const analysis = analyses[i];

      try {
        const content = await this.generateContent(field, analysis, cvData, jobContext);
        results.push({
          field: field,
          analysis: analysis,
          content: content,
          success: true
        });
      } catch (error) {
        console.error(`Error generating content for field ${field.name}:`, error);
        results.push({
          field: field,
          analysis: analysis,
          content: null,
          success: false,
          error: error.message
        });
      }
    }

    return results;
  }

  /**
   * Get summary of generated content
   * @returns {Object} - Summary statistics
   */
  getSummary() {
    return {
      fieldsGenerated: Object.keys(this.generatedContent).length,
      fields: Object.keys(this.generatedContent)
    };
  }

  /**
   * Clear generated content cache
   */
  clearCache() {
    this.generatedContent = {};
  }

  /**
   * Generate a cover letter or motivation text
   * @param {Object} cvData - CV data
   * @param {Object} jobContext - Job context
   * @param {number} maxLength - Maximum character length
   * @returns {Promise<string>} - Generated cover letter
   */
  async generateCoverLetter(cvData, jobContext, maxLength = 2000) {
    const prompt = `
You are writing a cover letter paragraph for a job application.

JOB DETAILS:
- Company: ${jobContext.company || 'the company'}
- Position: ${jobContext.position || 'this position'}
${jobContext.description ? `- Job Description: ${jobContext.description}` : ''}

CANDIDATE PROFILE:
${this._formatCVForPrompt(cvData)}

TASK:
Write a compelling cover letter paragraph (${maxLength} characters max) that:
1. Expresses genuine interest in the position and company
2. Highlights the candidate's most relevant experience and skills
3. Explains why they're a great fit for this specific role
4. Sounds natural, professional, and authentic
5. References specific achievements from their CV

Return ONLY the cover letter text, no additional formatting or explanations:
`;

    try {
      const response = await this.llmClient.complete(prompt, {
        temperature: CONFIG.TEMPERATURE_GENERATION,
        max_tokens: Math.min(maxLength / 2, CONFIG.MAX_TOKENS)
      });

      let content = response.trim();

      // Respect character limit
      if (content.length > maxLength) {
        content = truncate(content, maxLength, '...');
      }

      return content;

    } catch (error) {
      console.error('Cover letter generation error:', error);
      throw error;
    }
  }
}
