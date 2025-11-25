"""
Content Generator Service (Agent 2)
Generates appropriate content for form fields based on CV data
"""
import json
from typing import Dict, Any, Optional
from app.services.llm_service import LLMService


class ContentGeneratorService:
    """Service for generating form field content"""

    def __init__(self, llm_service: LLMService):
        """
        Initialize Content Generator Service
        Args:
            llm_service: Initialized LLM service
        """
        self.llm_service = llm_service
        self.generated_content = {}  # Track for consistency

    async def generate_content(
        self,
        field_label: str,
        field_type: str,
        analysis: Dict[str, Any],
        cv_data: Dict[str, Any],
        page_context: Optional[Dict[str, Any]] = None,
        max_length: Optional[int] = None
    ) -> Optional[str]:
        """
        Generate content for a form field
        Args:
            field_label: Field label
            field_type: Field type
            analysis: Analysis from FieldAnalyzerService
            cv_data: Parsed CV data
            page_context: Optional page context
            max_length: Optional character limit
        Returns:
            Generated content or None if skipped
        """
        try:
            strategy = analysis.get("strategy", "skip")

            # Strategy 1: Direct match - extract from CV
            if strategy == "direct_match":
                cv_path = analysis.get("cv_field_path")
                return self.extract_from_cv(cv_data, cv_path)

            # Strategy 2: Skip - return None
            if strategy == "skip":
                return None

            # Strategy 3: Generate - use LLM
            if strategy == "generate":
                content = await self._generate_with_llm(
                    field_label,
                    field_type,
                    analysis,
                    cv_data,
                    page_context,
                    max_length
                )

                # Store for consistency
                self.generated_content[field_label] = content
                return content

            return None

        except Exception as e:
            print(f"Error generating content for field {field_label}: {e}")
            return None

    def extract_from_cv(self, cv_data: Dict[str, Any], path: Optional[str]) -> Optional[str]:
        """
        Extract data from CV using dot-notation path
        Args:
            cv_data: CV data dictionary
            path: Dot-notation path (e.g., "personalInfo.email")
        Returns:
            Extracted value as string or None
        """
        if not path:
            return None

        try:
            # Navigate through nested dictionary
            keys = path.split(".")
            value = cv_data

            for key in keys:
                # Handle array indexing (e.g., workExperience[0])
                if "[" in key:
                    array_key = key.split("[")[0]
                    index = int(key.split("[")[1].rstrip("]"))
                    value = value[array_key][index]
                else:
                    value = value[key]

            if value is None:
                return None

            # Handle arrays
            if isinstance(value, list):
                return ", ".join(str(item) for item in value)

            # Handle objects
            if isinstance(value, dict):
                return json.dumps(value)

            return str(value)

        except (KeyError, IndexError, TypeError):
            return None

    async def _generate_with_llm(
        self,
        field_label: str,
        field_type: str,
        analysis: Dict[str, Any],
        cv_data: Dict[str, Any],
        page_context: Optional[Dict[str, Any]],
        max_length: Optional[int]
    ) -> str:
        """Generate content using LLM"""

        prompt = self._build_generation_prompt(
            field_label,
            field_type,
            analysis,
            cv_data,
            page_context,
            max_length
        )

        try:
            response = await self.llm_service.complete(
                prompt,
                temperature=0.7,  # Higher temperature for creative content
                max_tokens=min(max_length // 2 if max_length else 1000, 2000)
            )

            # Clean up response
            content = response.strip()
            if content.startswith('"') and content.endswith('"'):
                content = content[1:-1]

            # Respect character limit
            if max_length and len(content) > max_length:
                content = content[:max_length - 3] + "..."

            return content

        except Exception as e:
            print(f"LLM generation error: {e}")
            raise

    def _build_generation_prompt(
        self,
        field_label: str,
        field_type: str,
        analysis: Dict[str, Any],
        cv_data: Dict[str, Any],
        page_context: Optional[Dict[str, Any]],
        max_length: Optional[int]
    ) -> str:
        """Build generation prompt"""

        company = page_context.get("company", "Unknown") if page_context else "Unknown"
        job_title = page_context.get("job_title", "Unknown") if page_context else "Unknown"

        # Build previous content context
        previous_content = ""
        if self.generated_content:
            previous_content = f"\n\nPREVIOUSLY GENERATED CONTENT (maintain consistency):\n{json.dumps(self.generated_content, indent=2)}"

        # Extract relevant CV data
        personal_info = cv_data.get("personalInfo", {})
        work_exp = cv_data.get("workExperience", [])
        education = cv_data.get("education", [])
        skills = cv_data.get("skills", {})

        return f"""
You are a job application assistant. Generate appropriate, honest content for this form field based on the candidate's CV.

FIELD TO FILL:
- Question/Label: "{field_label}"
- Field Type: {field_type}
- Character Limit: {max_length or 'None'}
- Generation Guidance: {analysis.get('generation_guidance', 'N/A')}

JOB INFORMATION:
- Company: {company}
- Position: {job_title}

CANDIDATE CV DATA:

Personal Information:
- Name: {personal_info.get('fullName', 'N/A')}
- Email: {personal_info.get('email', 'N/A')}
- Phone: {personal_info.get('phone', 'N/A')}
- Location: {personal_info.get('location', 'N/A')}
- LinkedIn: {personal_info.get('linkedin', 'N/A')}

Summary:
{cv_data.get('summary', 'N/A')}

Work Experience ({len(work_exp)} positions):
{json.dumps(work_exp[:2], indent=2) if work_exp else 'None'}

Education ({len(education)} entries):
{json.dumps(education, indent=2) if education else 'None'}

Skills:
- Technical: {', '.join(skills.get('technical', [])[:10])}
- Languages: {', '.join(skills.get('languages', []))}
- Soft Skills: {', '.join(skills.get('soft', []))}

Certifications:
{', '.join(cv_data.get('certifications', [])) or 'None'}
{previous_content}

INSTRUCTIONS:
1. Generate content that directly answers the field question/label
2. Use information from the candidate's CV - be accurate and honest
3. Write in first person (as if the candidate is writing)
4. Be concise but complete
5. Match the field type and context
6. Maintain consistency with previously generated content
7. Respect the character limit if specified
8. Do NOT include quotes around your response
9. Return ONLY the content to fill in the field, nothing else

Generate the content now:
"""
