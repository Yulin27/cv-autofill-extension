"""
Pydantic schemas for API validation
"""
from app.schemas.user import (
    UserBase,
    UserCreate,
    UserLogin,
    UserUpdate,
    UserResponse,
    Token,
    TokenData,
)
from app.schemas.cv import (
    PersonalInfo,
    WorkExperience,
    Education,
    Skills,
    CVStructuredData,
    CVUploadRequest,
    CVParseResponse,
    CVDataResponse,
    FieldAnalysisRequest,
    FieldAnalysisResponse,
    ContentGenerationRequest,
    ContentGenerationResponse,
)

__all__ = [
    "UserBase",
    "UserCreate",
    "UserLogin",
    "UserUpdate",
    "UserResponse",
    "Token",
    "TokenData",
    "PersonalInfo",
    "WorkExperience",
    "Education",
    "Skills",
    "CVStructuredData",
    "CVUploadRequest",
    "CVParseResponse",
    "CVDataResponse",
    "FieldAnalysisRequest",
    "FieldAnalysisResponse",
    "ContentGenerationRequest",
    "ContentGenerationResponse",
]
