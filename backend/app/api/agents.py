"""
AI Agents API routes (No Authentication - Personal Use)
"""
from fastapi import APIRouter, HTTPException, status, Body
from app.core.redis_client import redis_client
from app.schemas import (
    FieldAnalysisRequest,
    FieldAnalysisResponse,
    ContentGenerationRequest,
    ContentGenerationResponse
)
from app.services.llm_service import LLMService
from app.services.field_analyzer_service import FieldAnalyzerService
from app.services.content_generator_service import ContentGeneratorService
import hashlib
import json

router = APIRouter(prefix="/agents", tags=["agents"])

# Single user mode - using constant cache key
CACHE_KEY = "cv_data:single_user"


@router.post("/analyze-field", response_model=FieldAnalysisResponse)
async def analyze_field(request: FieldAnalysisRequest):
    """
    Analyze a form field using Field Analyzer Agent (No authentication required)
    """
    try:
        # Create cache key for this specific field analysis
        field_hash = hashlib.md5(
            f"{request.field_label}_{request.field_type}".encode()
        ).hexdigest()
        cache_key = f"field_analysis:{field_hash}"

        # Check cache
        cached_analysis = await redis_client.get(cache_key)
        if cached_analysis:
            print(f"[AGENTS-API] Using cached analysis for field: {request.field_label}")
            return cached_analysis

        # Note: For individual field analysis, use the batch endpoint instead
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please use the /agents/analyze-and-generate endpoint for batch processing"
        )

    except HTTPException:
        raise
    except Exception as e:
        print(f"[AGENTS-API] Error analyzing field: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Field analysis failed: {str(e)}"
        )


@router.post("/generate-content", response_model=ContentGenerationResponse)
async def generate_content(request: ContentGenerationRequest):
    """
    Generate content for a form field using Content Generator Agent (No authentication required)
    """
    try:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please use the /agents/analyze-and-generate endpoint for batch processing"
        )

    except HTTPException:
        raise
    except Exception as e:
        print(f"[AGENTS-API] Error generating content: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Content generation failed: {str(e)}"
        )


@router.post("/analyze-and-generate")
async def analyze_and_generate_batch(
    fields: list = Body(...),
    api_key: str = Body(...),
    provider: str = Body("openai"),
    page_context: dict = Body(None),
    cv_data: dict = Body(None)
):
    """
    Batch endpoint for analyzing fields and generating content (No authentication required)
    This is more efficient for form filling operations

    Request body:
    {
        "fields": [
            {
                "label": "Full Name",
                "type": "text",
                "placeholder": null,
                "context": null
            }
        ],
        "api_key": "sk-...",
        "provider": "openai",
        "page_context": {
            "company": "Company Name",
            "job_title": "Job Title"
        },
        "cv_data": { ... } (optional - if not provided, will fetch from Redis)
    }
    """
    try:
        # If CV data is provided in request, use it; otherwise get from Redis
        if not cv_data:
            cv_data = await redis_client.get(CACHE_KEY)

        if not cv_data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No CV data found. Please upload a CV first."
            )

        # Initialize services
        llm_service = LLMService(api_key, provider)
        analyzer = FieldAnalyzerService(llm_service)
        generator = ContentGeneratorService(llm_service)

        results = []

        # Process each field
        for field in fields:
            # Analyze field
            analysis = await analyzer.analyze_field(
                field_label=field.get("label", ""),
                field_type=field.get("type", "text"),
                cv_data=cv_data,
                field_placeholder=field.get("placeholder"),
                field_context=field.get("context"),
                page_context=page_context or field.get("page_context")
            )

            # Generate content
            content = await generator.generate_content(
                field_label=field.get("label", ""),
                field_type=field.get("type", "text"),
                analysis=analysis,
                cv_data=cv_data,
                page_context=page_context or field.get("page_context"),
                max_length=field.get("maxLength")
            )

            results.append({
                "field_name": field.get("name"),
                "field_label": field.get("label"),
                "analysis": analysis,
                "content": content
            })

        return {
            "success": True,
            "results": results
        }

    except HTTPException:
        raise
    except Exception as e:
        print(f"[AGENTS-API] Batch processing error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Batch processing failed: {str(e)}"
        )
