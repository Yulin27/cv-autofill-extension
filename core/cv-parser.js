/**
 * CV Parser
 * Parses raw CV text into structured JSON using LLM
 */

import { CONFIG } from '../config/config.js';
import { safeJSONParse } from '../utils/helpers.js';

export class CVParser {
  /**
   * Initialize CV parser
   * @param {LLMClient} llmClient - Initialized LLM client
   */
  constructor(llmClient) {
    this.llmClient = llmClient;
  }

  /**
   * Parse raw CV text into structured data
   * @param {string} cvText - Raw CV text from PDF
   * @returns {Promise<Object>} - Structured CV data
   */
  async parse(cvText) {
    if (!cvText || cvText.trim().length === 0) {
      throw new Error('CV text is empty');
    }

    const prompt = this._buildParsingPrompt(cvText);

    try {
      // Use LLM to extract structured data
      const response = await this.llmClient.complete(prompt, {
        temperature: CONFIG.TEMPERATURE_PARSING,
        response_format: { type: 'json_object' },
        max_tokens: CONFIG.MAX_TOKENS
      });

      // Parse JSON response
      const cvData = safeJSONParse(response);

      if (!cvData) {
        throw new Error('Failed to parse LLM response as JSON');
      }

      // Validate and clean the structure
      const validatedData = this._validateAndCleanData(cvData);

      return validatedData;

    } catch (error) {
      console.error('CV parsing error:', error);
      throw new Error(`Failed to parse CV: ${error.message}`);
    }
  }

  /**
   * Build the parsing prompt
   * @param {string} cvText - Raw CV text
   * @returns {string} - Formatted prompt
   * @private
   */
  _buildParsingPrompt(cvText) {
    return `
You are an expert CV parser. Extract structured information from the following CV text.

CV TEXT:
${cvText}

TASK:
Parse the CV and return a JSON object with the following exact structure:

{
  "personalInfo": {
    "fullName": "Full name from CV",
    "email": "Email address",
    "phone": "Phone number",
    "location": "City, State/Country",
    "linkedin": "LinkedIn URL",
    "website": "Personal website URL"
  },
  "summary": "Professional summary or objective statement",
  "workExperience": [
    {
      "company": "Company name",
      "position": "Job title",
      "startDate": "Start date (format: YYYY-MM or YYYY)",
      "endDate": "End date or 'Present'",
      "description": "Brief description of role",
      "achievements": ["Achievement 1", "Achievement 2", "..."]
    }
  ],
  "education": [
    {
      "institution": "University/School name",
      "degree": "Degree type (e.g., Bachelor of Science)",
      "field": "Field of study",
      "graduationDate": "Graduation date (format: YYYY-MM or YYYY)"
    }
  ],
  "skills": {
    "technical": ["Skill 1", "Skill 2", "..."],
    "languages": ["Language 1 (proficiency)", "Language 2 (proficiency)", "..."],
    "soft": ["Soft skill 1", "Soft skill 2", "..."]
  },
  "certifications": ["Certification 1", "Certification 2", "..."]
}

IMPORTANT INSTRUCTIONS:
1. Extract ALL information present in the CV
2. Use empty strings ("") for missing text fields
3. Use empty arrays ([]) for missing list fields
4. Keep dates in consistent format (YYYY-MM or YYYY)
5. For current positions, use "Present" as endDate
6. Separate multiple achievements/responsibilities into array items
7. Group skills appropriately (technical, languages, soft skills)
8. Include ALL work experience entries chronologically (most recent first)
9. Include ALL education entries
10. Return ONLY the JSON object, no markdown formatting, no explanation text

Return the JSON object:
`;
  }

  /**
   * Validate and clean the parsed CV data
   * @param {Object} cvData - Raw parsed CV data
   * @returns {Object} - Validated and cleaned CV data
   * @private
   */
  _validateAndCleanData(cvData) {
    // Ensure all required top-level fields exist
    const cleaned = {
      personalInfo: cvData.personalInfo || {},
      summary: cvData.summary || '',
      workExperience: Array.isArray(cvData.workExperience) ? cvData.workExperience : [],
      education: Array.isArray(cvData.education) ? cvData.education : [],
      skills: cvData.skills || {},
      certifications: Array.isArray(cvData.certifications) ? cvData.certifications : []
    };

    // Validate and clean personalInfo
    cleaned.personalInfo = {
      fullName: cleaned.personalInfo.fullName || '',
      email: cleaned.personalInfo.email || '',
      phone: cleaned.personalInfo.phone || '',
      location: cleaned.personalInfo.location || '',
      linkedin: cleaned.personalInfo.linkedin || '',
      website: cleaned.personalInfo.website || ''
    };

    // Validate and clean skills
    cleaned.skills = {
      technical: Array.isArray(cleaned.skills.technical) ? cleaned.skills.technical : [],
      languages: Array.isArray(cleaned.skills.languages) ? cleaned.skills.languages : [],
      soft: Array.isArray(cleaned.skills.soft) ? cleaned.skills.soft : []
    };

    // Clean work experience entries
    cleaned.workExperience = cleaned.workExperience.map(exp => ({
      company: exp.company || '',
      position: exp.position || '',
      startDate: exp.startDate || '',
      endDate: exp.endDate || '',
      description: exp.description || '',
      achievements: Array.isArray(exp.achievements) ? exp.achievements : []
    }));

    // Clean education entries
    cleaned.education = cleaned.education.map(edu => ({
      institution: edu.institution || '',
      degree: edu.degree || '',
      field: edu.field || '',
      graduationDate: edu.graduationDate || ''
    }));

    return cleaned;
  }

  /**
   * Get a summary of parsed CV data
   * @param {Object} cvData - Parsed CV data
   * @returns {Object} - Summary statistics
   */
  static getSummary(cvData) {
    return {
      hasPersonalInfo: !!cvData.personalInfo?.fullName,
      hasEmail: !!cvData.personalInfo?.email,
      hasPhone: !!cvData.personalInfo?.phone,
      workExperienceCount: cvData.workExperience?.length || 0,
      educationCount: cvData.education?.length || 0,
      technicalSkillsCount: cvData.skills?.technical?.length || 0,
      certificationsCount: cvData.certifications?.length || 0,
      hasSummary: !!cvData.summary
    };
  }
}
