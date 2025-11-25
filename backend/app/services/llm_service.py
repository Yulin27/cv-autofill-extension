"""
LLM Service for interacting with OpenAI, Anthropic, and Groq APIs
"""
import json
import asyncio
from typing import Optional, Dict, Any, List
import httpx
from app.core.config import settings


class LLMService:
    """Service for LLM API calls with support for multiple providers"""

    def __init__(self, api_key: str, provider: str = "openai", model: Optional[str] = None):
        """
        Initialize LLM service
        Args:
            api_key: API key for the provider
            provider: Provider name ('openai', 'anthropic', 'groq')
            model: Optional model name, uses default if not provided
        """
        self.api_key = api_key
        self.provider = provider.lower()

        # Set provider-specific configuration
        if self.provider == "anthropic":
            self.model = model or "claude-3-5-sonnet-20241022"
            self.api_url = "https://api.anthropic.com/v1/messages"
            self.api_version = "2023-06-01"
        elif self.provider == "groq":
            self.model = model or "llama-3.3-70b-versatile"
            self.api_url = "https://api.groq.com/openai/v1/chat/completions"
        else:  # openai
            self.model = model or "gpt-4-turbo-preview"
            self.api_url = "https://api.openai.com/v1/chat/completions"

        self.timeout = 30.0
        self.max_retries = 3
        self.retry_delay = 1.0

    async def complete(
        self,
        prompt: str,
        temperature: float = 0.7,
        max_tokens: int = 2000,
        response_format: Optional[Dict[str, str]] = None
    ) -> str:
        """
        Complete a prompt using the LLM API
        Args:
            prompt: The prompt to send
            temperature: Temperature setting (0.0-2.0)
            max_tokens: Maximum tokens in response
            response_format: Response format (e.g., {"type": "json_object"})
        Returns:
            Response text from the LLM
        """
        # Build request body based on provider
        if self.provider == "anthropic":
            request_body = {
                "model": self.model,
                "max_tokens": max_tokens,
                "temperature": temperature,
                "messages": [{"role": "user", "content": prompt}],
                "system": "You are a helpful assistant that provides accurate and well-formatted responses."
            }
        else:  # openai and groq
            request_body = {
                "model": self.model,
                "messages": [
                    {"role": "system", "content": "You are a helpful assistant that provides accurate and well-formatted responses."},
                    {"role": "user", "content": prompt}
                ],
                "temperature": temperature,
                "max_tokens": max_tokens
            }

            # Add response format if specified (not supported by Anthropic)
            if response_format:
                request_body["response_format"] = response_format

        # Make request with retry logic
        for attempt in range(self.max_retries):
            try:
                response = await self._make_request(request_body)
                return response
            except Exception as e:
                if attempt == self.max_retries - 1:
                    raise
                await asyncio.sleep(self.retry_delay * (2 ** attempt))

    async def _make_request(self, request_body: Dict[str, Any]) -> str:
        """
        Make the actual API request
        Args:
            request_body: Request body for the API
        Returns:
            Response text
        """
        # Build headers based on provider
        headers = {"Content-Type": "application/json"}

        if self.provider == "anthropic":
            headers["x-api-key"] = self.api_key
            headers["anthropic-version"] = self.api_version
        else:  # openai and groq
            headers["Authorization"] = f"Bearer {self.api_key}"

        async with httpx.AsyncClient(timeout=self.timeout) as client:
            response = await client.post(
                self.api_url,
                headers=headers,
                json=request_body
            )

            if not response.is_success:
                error_data = response.json() if response.text else {}
                error_msg = error_data.get("error", {}).get("message", f"API request failed with status {response.status_code}")
                raise Exception(error_msg)

            data = response.json()

            # Extract content based on provider
            if self.provider == "anthropic":
                content = data.get("content", [{}])[0].get("text")
            else:  # openai and groq
                content = data.get("choices", [{}])[0].get("message", {}).get("content")

            if not content:
                raise Exception("No content in API response")

            return content.strip()

    async def parse_cv_text(self, cv_text: str) -> Dict[str, Any]:
        """
        Parse CV text into structured data
        Args:
            cv_text: Raw CV text
        Returns:
            Structured CV data as dictionary
        """
        prompt = f"""
Extract structured information from this CV text and return it as a JSON object.

CV Text:
{cv_text}

Return a JSON object with this exact structure:
{{
  "personalInfo": {{
    "fullName": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  }},
  "summary": "",
  "workExperience": [
    {{
      "company": "",
      "position": "",
      "startDate": "",
      "endDate": "",
      "description": "",
      "achievements": []
    }}
  ],
  "education": [
    {{
      "institution": "",
      "degree": "",
      "field": "",
      "graduationDate": ""
    }}
  ],
  "skills": {{
    "technical": [],
    "languages": [],
    "soft": []
  }},
  "certifications": []
}}

Instructions:
1. Extract all information present in the CV
2. Use empty strings for missing text fields
3. Use empty arrays for missing list fields
4. Ensure dates are in a consistent format (YYYY-MM or YYYY)
5. Return ONLY valid JSON, no markdown formatting or additional text

Return the JSON object now:
"""

        # Set options for CV parsing
        response_format = None
        if self.provider in ["openai", "groq"]:
            response_format = {"type": "json_object"}

        response = await self.complete(
            prompt,
            temperature=0.2,  # Low temperature for consistent parsing
            max_tokens=2000,
            response_format=response_format
        )

        # Parse JSON response
        try:
            cv_data = json.loads(response)
        except json.JSONDecodeError:
            # Try to extract JSON from markdown code blocks
            if "```json" in response:
                json_str = response.split("```json")[1].split("```")[0].strip()
                cv_data = json.loads(json_str)
            elif "```" in response:
                json_str = response.split("```")[1].split("```")[0].strip()
                cv_data = json.loads(json_str)
            else:
                raise Exception("Failed to parse CV data as JSON")

        # Validate structure
        self._validate_cv_structure(cv_data)
        return cv_data

    def _validate_cv_structure(self, cv_data: Dict[str, Any]) -> None:
        """
        Validate CV data structure
        Args:
            cv_data: CV data to validate
        Raises:
            ValueError: If structure is invalid
        """
        required_fields = ["personalInfo", "workExperience", "education", "skills"]

        for field in required_fields:
            if field not in cv_data:
                raise ValueError(f"Missing required field: {field}")

        # Ensure arrays are arrays
        if not isinstance(cv_data["workExperience"], list):
            cv_data["workExperience"] = []
        if not isinstance(cv_data["education"], list):
            cv_data["education"] = []

        # Ensure objects are objects
        if not isinstance(cv_data["personalInfo"], dict):
            cv_data["personalInfo"] = {}
        if not isinstance(cv_data["skills"], dict):
            cv_data["skills"] = {"technical": [], "languages": [], "soft": []}

    async def test_connection(self) -> bool:
        """
        Test API connection
        Returns:
            True if connection successful, False otherwise
        """
        try:
            await self.complete(
                "Respond with 'OK' if you can read this.",
                temperature=0,
                max_tokens=10
            )
            return True
        except Exception:
            return False

    async def batch_complete(
        self,
        prompts: List[str],
        temperature: float = 0.7,
        max_tokens: int = 2000
    ) -> List[str]:
        """
        Batch complete multiple prompts in parallel
        Args:
            prompts: List of prompts
            temperature: Temperature setting
            max_tokens: Maximum tokens per response
        Returns:
            List of responses
        """
        tasks = [
            self.complete(prompt, temperature, max_tokens)
            for prompt in prompts
        ]
        return await asyncio.gather(*tasks)
