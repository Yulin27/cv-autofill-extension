"""
CV Management API routes
"""
import time
from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy.orm import Session
from typing import Optional
from app.core.database import get_db
from app.core.security import decode_access_token
from app.core.redis_client import redis_client
from app.models import User, CVData
from app.schemas import (
    CVUploadRequest,
    CVParseResponse,
    CVDataResponse,
    CVStructuredData
)
from app.services.pdf_service import PDFService
from app.services.llm_service import LLMService

router = APIRouter(prefix="/cv", tags=["cv"])


async def get_current_user(
    authorization: str = Header(...),
    db: Session = Depends(get_db)
) -> User:
    """Dependency to get current authenticated user"""
    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization header"
        )

    token = authorization.replace("Bearer ", "")
    payload = decode_access_token(token)

    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )

    user_id = payload.get("sub")
    user = db.query(User).filter(User.id == int(user_id)).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return user


@router.post("/upload", response_model=CVParseResponse)
async def upload_cv(
    request: CVUploadRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Upload and parse CV from PDF
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

        # Extract text from PDF
        print(f"[CV-API] Extracting text from PDF: {request.filename}")
        cv_text = await PDFService.extract_text_from_pdf(pdf_bytes)

        if not cv_text or len(cv_text) < 50:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Extracted text is too short or empty"
            )

        print(f"[CV-API] Extracted {len(cv_text)} characters")

        # Determine LLM provider and API key
        provider = request.llm_provider or current_user.preferred_llm_provider
        api_key = request.api_key  # User can provide their own API key

        if not api_key:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="API key required. Please provide an LLM API key."
            )

        # Initialize LLM service
        llm_service = LLMService(api_key, provider)

        # Parse CV text
        print(f"[CV-API] Parsing CV with {provider}")
        cv_data = await llm_service.parse_cv_text(cv_text)

        # Save to database
        cv_entry = CVData(
            user_id=current_user.id,
            raw_text=cv_text,
            structured_data=cv_data,
            filename=request.filename,
            file_size_bytes=len(pdf_bytes),
            processing_time_ms=int((time.time() - start_time) * 1000)
        )

        # Delete old CV data for this user (keep only latest)
        db.query(CVData).filter(CVData.user_id == current_user.id).delete()

        db.add(cv_entry)
        db.commit()
        db.refresh(cv_entry)

        # Cache CV data in Redis for faster access
        cache_key = f"cv_data:{current_user.id}"
        await redis_client.set(cache_key, cv_data, ttl=3600)

        processing_time = int((time.time() - start_time) * 1000)

        return {
            "success": True,
            "cv_data": cv_data,
            "cv_id": cv_entry.id,
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


@router.get("/data", response_model=CVDataResponse)
async def get_cv_data(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get user's CV data
    """
    # Try cache first
    cache_key = f"cv_data:{current_user.id}"
    cached_data = await redis_client.get(cache_key)

    if cached_data:
        print(f"[CV-API] Retrieved CV data from cache for user {current_user.id}")
        # We still need to get the CV entry for metadata
        cv_entry = db.query(CVData).filter(CVData.user_id == current_user.id).first()
        if cv_entry:
            return cv_entry

    # Get from database
    cv_entry = db.query(CVData).filter(CVData.user_id == current_user.id).first()

    if not cv_entry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No CV data found. Please upload a CV first."
        )

    # Cache for future requests
    await redis_client.set(cache_key, cv_entry.structured_data, ttl=3600)

    return cv_entry


@router.delete("/data")
async def delete_cv_data(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Delete user's CV data
    """
    # Delete from database
    deleted = db.query(CVData).filter(CVData.user_id == current_user.id).delete()
    db.commit()

    # Delete from cache
    cache_key = f"cv_data:{current_user.id}"
    await redis_client.delete(cache_key)

    if deleted == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No CV data found"
        )

    return {"success": True, "message": "CV data deleted successfully"}
