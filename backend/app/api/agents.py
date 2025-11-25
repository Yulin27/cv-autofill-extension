"""
AI Agents API routes
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.redis_client import redis_client
from app.models import User
from app.schemas import (
    FieldAnalysisRequest,
    FieldAnalysisResponse,
    ContentGenerationRequest,
    ContentGenerationResponse
)
from app.services.llm_service import LLMService
from app.services.field_analyzer_service import FieldAnalyzerService
from app.services.content_generator_service import ContentGeneratorService
from app.api.cv import get_current_user
import hashlib
import json

router = APIRouter(prefix="/agents", tags=["agents"])


@router.post("/analyze-field", response_model=FieldAnalysisResponse)
async def analyze_field(
    request: FieldAnalysisRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Analyze a form field using Field Analyzer Agent
    """
    try:
        # Create cache key for this specific field analysis
        field_hash = hashlib.md5(
            f"{request.field_label}_{request.field_type}".encode()
        ).hexdigest()
        cache_key = f"field_analysis:{current_user.id}:{field_hash}"

        # Check cache
        cached_analysis = await redis_client.get(cache_key)
        if cached_analysis:
            print(f"[AGENTS-API] Using cached analysis for field: {request.field_label}")
            return cached_analysis

        # Note: User needs to provide API key via extension
        # In a production setup, you might want to store encrypted API keys
        # For now, we'll require the extension to pass the API key per request
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This endpoint requires API key to be passed through the extension. Use the batch endpoint instead."
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
async def generate_content(
    request: ContentGenerationRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Generate content for a form field using Content Generator Agent
    """
    try:
        # Similar to field analysis, this would require API key
        # In practice, the extension will handle the LLM calls client-side
        # Or you can implement server-side API key management
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This endpoint requires API key management. The extension should make LLM calls directly."
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
    fields: list,
    api_key: str,
    provider: str = "openai",
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Batch endpoint for analyzing fields and generating content
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
        }
    }
    """
    try:
        # Get CV data from cache or database
        cache_key = f"cv_data:{current_user.id}"
        cv_data = await redis_client.get(cache_key)

        if not cv_data:
            from app.models import CVData
            cv_entry = db.query(CVData).filter(CVData.user_id == current_user.id).first()
            if not cv_entry:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="No CV data found"
                )
            cv_data = cv_entry.structured_data

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
                page_context=field.get("page_context")
            )

            # Generate content
            content = await generator.generate_content(
                field_label=field.get("label", ""),
                field_type=field.get("type", "text"),
                analysis=analysis,
                cv_data=cv_data,
                page_context=field.get("page_context"),
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
