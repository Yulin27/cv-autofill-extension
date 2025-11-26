export const STORAGE_KEYS = {
  API_KEY_OPENAI: "cv_assistant_api_key_openai",
  API_KEY_ANTHROPIC: "cv_assistant_api_key_anthropic",
  API_KEY_GROQ: "cv_assistant_api_key_groq",
  LLM_PROVIDER: "cv_assistant_provider",
  CV_DATA: "cv_assistant_data",
};

export const MAX_PDF_SIZE_MB = 10;

export const PROVIDERS = [
  { value: "openai", label: "OpenAI (GPT-4)" },
  { value: "anthropic", label: "Anthropic (Claude 3.5)" },
  { value: "groq", label: "Groq (Llama 3)" },
] as const;
