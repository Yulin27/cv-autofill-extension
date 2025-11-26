export type LLMProvider = 'openai' | 'anthropic' | 'groq';

export interface AppConfig {
  apiKeyOpenAI: string;
  apiKeyAnthropic: string;
  apiKeyGroq: string;
  selectedProvider: LLMProvider;
}

export interface CVData {
  personalInfo?: {
    fullName?: string;
    email?: string;
    phone?: string;
    linkedin?: string;
    portfolio?: string;
  };
  workExperience?: Array<{
    company: string;
    title: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education?: Array<{
    institution: string;
    degree: string;
    year: string;
  }>;
  skills?: {
    technical?: string[];
    soft?: string[];
  };
}

export interface ParseResponse {
  success: boolean;
  cvData?: CVData;
  error?: string;
}

export interface FillFormResponse {
  success: boolean;
  fieldsCount?: number;
  error?: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}
