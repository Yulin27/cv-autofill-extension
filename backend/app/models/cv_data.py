"""
CV Data database model
"""
from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


class CVData(Base):
    """CV Data model for storing parsed CV information"""

    __tablename__ = "cv_data"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)

    # Raw CV text extracted from PDF
    raw_text = Column(Text, nullable=True)

    # Structured CV data as JSON
    # Structure: {personalInfo, summary, workExperience, education, skills, certifications}
    structured_data = Column(JSON, nullable=False)

    # Metadata
    filename = Column(String, nullable=True)
    file_size_bytes = Column(Integer, nullable=True)
    processing_time_ms = Column(Integer, nullable=True)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    user = relationship("User", back_populates="cv_data")

    def __repr__(self):
        return f"<CVData(id={self.id}, user_id={self.user_id})>"
