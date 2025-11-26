"""
CV Management API routes (No Authentication - Personal Use)
"""
import time
from fastapi import APIRouter, HTTPException, status
from app.core.redis_client import redis_client
from app.schemas import (
    CVUploadRequest,
    CVParseResponse
)
from app.services.pdf_service import PDFService
from app.services.llm_service import LLMService

router = APIRouter(prefix="/cv", tags=["cv"])

# Single user mode - using constant cache key
CACHE_KEY = "cv_data:single_user"


@router.post("/upload", response_model=CVParseResponse)
async def upload_cv(request: CVUploadRequest):
    """
    Upload and parse CV from PDF (No authentication required)
    """
    start_time = time.time()

    try:
        # Decode PDF data
        pdf_bytes = PDFService.decode_base64_pdf(request.file_data)

        # Validate PDF
        if not PDFService.validate_pdf(pdf_bytes):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid PDF file"
            )

        # Convert PDF to images
        print(f"[CV-API] Converting PDF to images: {request.filename}")
        page_images = await PDFService.convert_pdf_to_images(pdf_bytes)

        if not page_images:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to convert PDF to images"
            )

        print(f"[CV-API] Converted {len(page_images)} page(s) to images")

        # Get LLM provider and API key from request
        provider = request.llm_provider or "groq"  # Default to Groq for multi-modal
        api_key = request.api_key

        if not api_key:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="API key required. Please provide an LLM API key."
            )

        # Initialize LLM service
        llm_service = LLMService(api_key, provider)

        # Parse CV from images using multi-modal LLM
        print(f"[CV-API] Parsing CV from images with {provider}")
        cv_data = await llm_service.parse_cv_from_images(page_images)

        # Store CV data in Redis (no database needed for single user)
        await redis_client.set(CACHE_KEY, cv_data, ttl=86400)  # 24 hour TTL

        processing_time = int((time.time() - start_time) * 1000)

        return {
            "success": True,
            "cv_data": cv_data,
            "cv_id": 1,  # Dummy ID for compatibility
            "processing_time_ms": processing_time,
            "message": "CV uploaded and parsed successfully"
        }

    except HTTPException:
        raise
    except Exception as e:
        print(f"[CV-API] Error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process CV: {str(e)}"
        )


@router.get("/data")
async def get_cv_data():
    """
    Get CV data (No authentication required)
    """
    # Get from Redis
    cached_data = await redis_client.get(CACHE_KEY)

    if not cached_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No CV data found. Please upload a CV first."
        )

    return {
        "success": True,
        "cv_data": cached_data,
        "structured_data": cached_data
    }


@router.delete("/data")
async def delete_cv_data():
    """
    Delete CV data (No authentication required)
    """
    # Delete from Redis
    deleted = await redis_client.delete(CACHE_KEY)
    await redis_client.delete(f"{CACHE_KEY}:raw_text")

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No CV data found"
        )

    return {"success": True, "message": "CV data deleted successfully"}
