"""
Pytest configuration and fixtures for API testing
"""
import asyncio
import base64
import json
import os
from typing import AsyncGenerator, Dict, Any

import pytest
from httpx import AsyncClient
from app.main import app
from app.core.redis_client import redis_client

# Test data directory
TEST_DATA_DIR = os.path.join(os.path.dirname(__file__), "test_data")


@pytest.fixture(scope="session")
def event_loop():
    """Create event loop for async tests"""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


@pytest.fixture(scope="function")
async def client() -> AsyncGenerator[AsyncClient, None]:
    """Create async HTTP client for testing with lifespan events"""
    # Create client with app - this should trigger lifespan but doesn't always
    # So we manually ensure Redis is connected
    if not redis_client.redis:
        try:
            await redis_client.connect()
        except Exception as e:
            print(f"Redis connection warning: {e}")

    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac


@pytest.fixture(scope="function")
async def redis_cleanup():
    """Clean up Redis before and after each test"""
    # Clean up before test to ensure fresh state
    try:
        await redis_client.delete("cv_data:single_user")
        await redis_client.delete("cv_data:single_user:raw_text")
    except:
        pass

    yield

    # Clean up after test
    try:
        await redis_client.delete("cv_data:single_user")
        await redis_client.delete("cv_data:single_user:raw_text")
    except:
        pass


@pytest.fixture
def sample_cv_data() -> Dict[str, Any]:
    """Sample structured CV data for testing"""
    return {
        "personalInfo": {
            "fullName": "John Doe",
            "email": "john.doe@example.com",
            "phone": "+1-234-567-8900",
            "location": "San Francisco, CA",
            "linkedin": "linkedin.com/in/johndoe",
            "website": "johndoe.com"
        },
        "summary": "Experienced software engineer with 5+ years of full-stack development experience.",
        "workExperience": [
            {
                "company": "Tech Corp",
                "position": "Senior Software Engineer",
                "startDate": "2020-01",
                "endDate": "Present",
                "description": "Lead development of cloud-based applications",
                "achievements": [
                    "Reduced API response time by 40%",
                    "Led team of 5 developers"
                ]
            },
            {
                "company": "StartupXYZ",
                "position": "Software Engineer",
                "startDate": "2018-06",
                "endDate": "2019-12",
                "description": "Full-stack development using React and Node.js",
                "achievements": [
                    "Built responsive web applications",
                    "Implemented CI/CD pipelines"
                ]
            }
        ],
        "education": [
            {
                "institution": "University of California",
                "degree": "Bachelor of Science",
                "field": "Computer Science",
                "graduationDate": "2018-05"
            }
        ],
        "skills": {
            "technical": ["Python", "JavaScript", "React", "Node.js", "Docker"],
            "languages": ["English (Native)", "Spanish (Fluent)"],
            "soft": ["Leadership", "Communication", "Problem Solving"]
        },
        "certifications": [
            "AWS Certified Solutions Architect",
            "Professional Scrum Master I"
        ]
    }


@pytest.fixture
def sample_pdf_base64() -> str:
    """Load real PDF from test_data directory
    Uses an actual PDF file with extractable text content
    """
    pdf_path = os.path.join(TEST_DATA_DIR, "sample_cv.pdf")

    if not os.path.exists(pdf_path):
        # Fallback: create minimal PDF if real PDF doesn't exist
        print(f"WARNING: Test PDF not found at {pdf_path}")
        print("Please create backend/tests/test_data/sample_cv.pdf")
        # Return empty - tests will fail with clear message
        return ""

    with open(pdf_path, 'rb') as f:
        pdf_bytes = f.read()

    return base64.b64encode(pdf_bytes).decode('utf-8')


@pytest.fixture
def sample_form_fields() -> list:
    """Sample form fields for testing agent endpoints"""
    return [
        {
            "name": "full_name",
            "label": "Full Name",
            "type": "text",
            "placeholder": "Enter your full name",
            "context": None
        },
        {
            "name": "email",
            "label": "Email Address",
            "type": "email",
            "placeholder": "you@example.com",
            "context": None
        },
        {
            "name": "phone",
            "label": "Phone Number",
            "type": "tel",
            "placeholder": "+1-234-567-8900",
            "context": None
        },
        {
            "name": "summary",
            "label": "Professional Summary",
            "type": "textarea",
            "placeholder": "Tell us about yourself",
            "context": "Brief overview of your professional background",
            "maxLength": 500
        }
    ]


@pytest.fixture
def sample_page_context() -> Dict[str, str]:
    """Sample page context for job application"""
    return {
        "company": "Acme Corporation",
        "job_title": "Senior Software Engineer",
        "job_description": "We are looking for an experienced software engineer..."
    }


@pytest.fixture
def mock_openai_api_key() -> str:
    """Mock OpenAI API key for testing"""
    return "sk-test-mock-api-key-1234567890"
