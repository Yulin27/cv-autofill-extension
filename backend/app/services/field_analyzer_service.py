"""
Field Analyzer Service (Agent 1)
Analyzes form fields and determines the best strategy to fill them
"""
import json
from typing import Dict, Any, List, Optional
from app.services.llm_service import LLMService


class FieldAnalyzerService:
    """Service for analyzing form fields"""

    def __init__(self, llm_service: LLMService):
        """
        Initialize Field Analyzer Service
        Args:
            llm_service: Initialized LLM service
        """
        self.llm_service = llm_service
        self.analysis_cache = {}

    async def analyze_field(
        self,
        field_label: str,
        field_type: str,
        cv_data: Dict[str, Any],
        field_placeholder: Optional[str] = None,
        field_context: Optional[str] = None,
        page_context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Analyze a single form field
        Args:
            field_label: Field label or question
            field_type: Field type (text, email, etc.)
            cv_data: Parsed CV data
            field_placeholder: Optional placeholder text
            field_context: Optional field context
            page_context: Optional page context (company, job title, etc.)
        Returns:
            Field analysis result with strategy
        """
        # Generate cache key
        cache_key = f"{field_label}_{field_type}"

        # Check cache
        if cache_key in self.analysis_cache:
            return self.analysis_cache[cache_key]

        # Build prompt
        prompt = self._build_analysis_prompt(
            field_label,
            field_type,
            cv_data,
            field_placeholder,
            field_context,
            page_context
        )

        try:
            response = await self.llm_service.complete(
                prompt,
                temperature=0.3,  # Low temperature for consistent analysis
                max_tokens=500,
                response_format={"type": "json_object"} if self.llm_service.provider != "anthropic" else None
            )

            # Parse response
            analysis = json.loads(response)

            # Validate and cache
            validated = self._validate_analysis(analysis)
            self.analysis_cache[cache_key] = validated

            return validated

        except Exception as e:
            print(f"Field analysis error: {e}")
            return self._get_fallback_analysis()

    def _build_analysis_prompt(
        self,
        field_label: str,
        field_type: str,
        cv_data: Dict[str, Any],
        field_placeholder: Optional[str],
        field_context: Optional[str],
        page_context: Optional[Dict[str, Any]]
    ) -> str:
        """Build analysis prompt for the field"""

        company = page_context.get("company", "Unknown") if page_context else "Unknown"
        job_title = page_context.get("job_title", "Unknown") if page_context else "Unknown"

        return f"""
Analyze this job application form field and determine how to fill it using the candidate's CV data.

FIELD INFORMATION:
- Label/Question: "{field_label}"
- Type: {field_type}
- Placeholder: {field_placeholder or 'N/A'}
- Context: {field_context or 'N/A'}

JOB CONTEXT:
- Company: {company}
- Position: {job_title}

CV DATA SUMMARY:
- Name: {cv_data.get('personalInfo', {}).get('fullName', 'N/A')}
- Email: {cv_data.get('personalInfo', {}).get('email', 'N/A')}
- Experience: {len(cv_data.get('workExperience', []))} positions
- Education: {len(cv_data.get('education', []))} entries
- Skills: {', '.join(cv_data.get('skills', {}).get('technical', [])[:5])}

AVAILABLE CV DATA PATHS:
- personalInfo.fullName, personalInfo.email, personalInfo.phone, personalInfo.location
- personalInfo.linkedin, personalInfo.website
- summary
- workExperience[0].company, workExperience[0].position, workExperience[0].description
- education[0].institution, education[0].degree, education[0].field
- skills.technical, skills.languages, skills.soft
- certifications

TASK:
Determine the best strategy to fill this field. Choose one of:
1. "direct_match" - Extract directly from CV (provide the CV data path)
2. "generate" - Generate content using CV data and job context (provide guidance)
3. "skip" - Leave empty (sensitive/unknown field)

Return a JSON object with this structure:
{{
  "strategy": "direct_match|generate|skip",
  "reasoning": "Brief explanation of the decision",
  "cv_field_path": "path.to.cv.data (only if direct_match)",
  "generation_guidance": "Guidelines for content generation (only if generate)"
}}

Return only the JSON object, no additional text.
"""

    def _validate_analysis(self, analysis: Dict[str, Any]) -> Dict[str, Any]:
        """Validate analysis structure"""
        if "strategy" not in analysis:
            analysis["strategy"] = "skip"

        if analysis["strategy"] not in ["direct_match", "generate", "skip"]:
            analysis["strategy"] = "skip"

        if "reasoning" not in analysis:
            analysis["reasoning"] = "Unable to analyze field"

        return analysis

    def _get_fallback_analysis(self) -> Dict[str, Any]:
        """Get fallback analysis when LLM fails"""
        return {
            "strategy": "skip",
            "reasoning": "Unable to analyze field due to error",
            "cv_field_path": None,
            "generation_guidance": None
        }
