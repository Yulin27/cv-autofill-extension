"""
CV schemas for API requests and responses
"""
from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel


# CV Structure schemas
class PersonalInfo(BaseModel):
    """Personal information schema"""
    fullName: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    linkedin: Optional[str] = None
    website: Optional[str] = None


class WorkExperience(BaseModel):
    """Work experience schema"""
    company: str
    position: str
    startDate: Optional[str] = None
    endDate: Optional[str] = None
    description: Optional[str] = None
    achievements: List[str] = []


class Education(BaseModel):
    """Education schema"""
    institution: str
    degree: str
    field: Optional[str] = None
    graduationDate: Optional[str] = None


class Skills(BaseModel):
    """Skills schema"""
    technical: List[str] = []
    languages: List[str] = []
    soft: List[str] = []


class CVStructuredData(BaseModel):
    """Complete structured CV data"""
    personalInfo: PersonalInfo
    summary: Optional[str] = None
    workExperience: List[WorkExperience] = []
    education: List[Education] = []
    skills: Skills
    certifications: List[str] = []


# API Request/Response schemas
class CVUploadRequest(BaseModel):
    """Schema for CV upload (base64 PDF)"""
    filename: str
    file_data: str  # Base64 encoded PDF
    llm_provider: Optional[str] = "openai"
    api_key: Optional[str] = None  # Optional: user can provide their own API key


class CVParseResponse(BaseModel):
    """Response after CV parsing"""
    success: bool
    cv_data: Optional[CVStructuredData] = None
    cv_id: int
    processing_time_ms: int
    message: Optional[str] = None


class CVDataResponse(BaseModel):
    """Response for getting CV data"""
    id: int
    user_id: int
    structured_data: CVStructuredData
    filename: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class FieldAnalysisRequest(BaseModel):
    """Request for field analysis"""
    field_label: str
    field_type: str
    field_placeholder: Optional[str] = None
    field_context: Optional[str] = None
    page_context: Optional[Dict[str, Any]] = None
    cv_data: CVStructuredData


class FieldAnalysisResponse(BaseModel):
    """Response from field analyzer agent"""
    strategy: str  # 'direct_match', 'generate', 'skip'
    reasoning: str
    cv_field_path: Optional[str] = None
    generation_guidance: Optional[str] = None


class ContentGenerationRequest(BaseModel):
    """Request for content generation"""
    field_label: str
    field_type: str
    analysis: FieldAnalysisResponse
    cv_data: CVStructuredData
    page_context: Optional[Dict[str, Any]] = None
    previous_content: Optional[Dict[str, str]] = None


class ContentGenerationResponse(BaseModel):
    """Response from content generator agent"""
    content: str
    source: str  # 'cv_direct', 'cv_generated', 'generated'
