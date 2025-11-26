"""
Tests for CV Management API endpoints
"""
import pytest
from httpx import AsyncClient
import logging
from unittest.mock import AsyncMock, patch, MagicMock

logger = logging.getLogger(__name__)


@pytest.mark.asyncio
class TestCVEndpoints:
    """Test suite for CV management endpoints"""

    async def test_upload_cv_success(
        self,
        client: AsyncClient,
        sample_pdf_base64: str,
        sample_cv_data: dict,
        mock_openai_api_key: str,
        redis_cleanup
    ):
        """
        Test POST /api/v1/cv/upload - Successful CV upload and parsing
        """
        logger.info("=" * 80)
        logger.info("TEST: Upload CV - Success")
        logger.info("=" * 80)

        # Mock the LLM service to avoid real API calls
        with patch('app.services.llm_service.LLMService.parse_cv_text') as mock_parse:
            mock_parse.return_value = sample_cv_data

            request_data = {
                "filename": "test_cv.pdf",
                "file_data": sample_pdf_base64,
                "llm_provider": "openai",
                "api_key": mock_openai_api_key
            }

            logger.info(f"Request Data: filename={request_data['filename']}, provider={request_data['llm_provider']}")

            response = await client.post("/api/v1/cv/upload", json=request_data)

            logger.info(f"Status Code: {response.status_code}")
            logger.info(f"Response: {response.json()}")

            assert response.status_code == 200
            data = response.json()

            assert data["success"] is True
            assert "cv_data" in data
            assert "cv_id" in data
            assert "processing_time_ms" in data
            assert data["cv_data"]["personalInfo"]["fullName"] == "John Doe"

            logger.info(f"✓ CV uploaded successfully")
            logger.info(f"  - CV ID: {data['cv_id']}")
            logger.info(f"  - Processing Time: {data['processing_time_ms']}ms")
            logger.info(f"  - Full Name: {data['cv_data']['personalInfo']['fullName']}")
            logger.info("")

    async def test_upload_cv_missing_api_key(
        self,
        client: AsyncClient,
        sample_pdf_base64: str,
        redis_cleanup
    ):
        """
        Test POST /api/v1/cv/upload - Missing API key
        Should return 400 error
        """
        logger.info("=" * 80)
        logger.info("TEST: Upload CV - Missing API Key")
        logger.info("=" * 80)

        request_data = {
            "filename": "test_cv.pdf",
            "file_data": sample_pdf_base64,
            "llm_provider": "openai",
            "api_key": None
        }

        logger.info("Request: Missing API key")

        response = await client.post("/api/v1/cv/upload", json=request_data)

        logger.info(f"Status Code: {response.status_code}")
        logger.info(f"Response: {response.json()}")

        assert response.status_code == 400
        data = response.json()

        assert "detail" in data
        assert "API key required" in data["detail"]

        logger.info("✓ Correctly rejected request without API key")
        logger.info("")

    async def test_upload_cv_invalid_pdf(
        self,
        client: AsyncClient,
        mock_openai_api_key: str,
        redis_cleanup
    ):
        """
        Test POST /api/v1/cv/upload - Invalid PDF data
        Should return 400 error
        """
        logger.info("=" * 80)
        logger.info("TEST: Upload CV - Invalid PDF")
        logger.info("=" * 80)

        request_data = {
            "filename": "invalid.pdf",
            "file_data": "not-valid-base64-pdf-data",
            "llm_provider": "openai",
            "api_key": mock_openai_api_key
        }

        logger.info("Request: Invalid PDF data")

        response = await client.post("/api/v1/cv/upload", json=request_data)

        logger.info(f"Status Code: {response.status_code}")
        logger.info(f"Response: {response.json()}")

        assert response.status_code in [400, 500]
        data = response.json()

        assert "detail" in data

        logger.info("✓ Correctly rejected invalid PDF")
        logger.info("")

    async def test_get_cv_data_not_found(self, client: AsyncClient, redis_cleanup):
        """
        Test GET /api/v1/cv/data - No CV data exists
        Should return 404 error
        """
        logger.info("=" * 80)
        logger.info("TEST: Get CV Data - Not Found")
        logger.info("=" * 80)

        response = await client.get("/api/v1/cv/data")

        logger.info(f"Status Code: {response.status_code}")
        logger.info(f"Response: {response.json()}")

        assert response.status_code == 404
        data = response.json()

        assert "detail" in data
        assert "No CV data found" in data["detail"]

        logger.info("✓ Correctly returned 404 when no CV exists")
        logger.info("")

    async def test_get_cv_data_success(
        self,
        client: AsyncClient,
        sample_pdf_base64: str,
        sample_cv_data: dict,
        mock_openai_api_key: str,
        redis_cleanup
    ):
        """
        Test GET /api/v1/cv/data - Successfully retrieve CV data
        """
        logger.info("=" * 80)
        logger.info("TEST: Get CV Data - Success")
        logger.info("=" * 80)

        # First upload a CV
        with patch('app.services.llm_service.LLMService.parse_cv_text') as mock_parse:
            mock_parse.return_value = sample_cv_data

            upload_request = {
                "filename": "test_cv.pdf",
                "file_data": sample_pdf_base64,
                "llm_provider": "openai",
                "api_key": mock_openai_api_key
            }

            logger.info("Step 1: Uploading CV...")
            upload_response = await client.post("/api/v1/cv/upload", json=upload_request)
            assert upload_response.status_code == 200

        # Now get the CV data
        logger.info("Step 2: Retrieving CV data...")
        response = await client.get("/api/v1/cv/data")

        logger.info(f"Status Code: {response.status_code}")
        logger.info(f"Response: {response.json()}")

        assert response.status_code == 200
        data = response.json()

        assert data["success"] is True
        assert "cv_data" in data
        assert "structured_data" in data
        assert data["cv_data"]["personalInfo"]["fullName"] == "John Doe"

        logger.info("✓ Successfully retrieved CV data")
        logger.info(f"  - Full Name: {data['cv_data']['personalInfo']['fullName']}")
        logger.info(f"  - Email: {data['cv_data']['personalInfo']['email']}")
        logger.info("")

    async def test_delete_cv_data_not_found(self, client: AsyncClient, redis_cleanup):
        """
        Test DELETE /api/v1/cv/data - No CV data exists
        Should return 404 error
        """
        logger.info("=" * 80)
        logger.info("TEST: Delete CV Data - Not Found")
        logger.info("=" * 80)

        response = await client.delete("/api/v1/cv/data")

        logger.info(f"Status Code: {response.status_code}")
        logger.info(f"Response: {response.json()}")

        assert response.status_code == 404
        data = response.json()

        assert "detail" in data
        assert "No CV data found" in data["detail"]

        logger.info("✓ Correctly returned 404 when no CV to delete")
        logger.info("")

    async def test_delete_cv_data_success(
        self,
        client: AsyncClient,
        sample_pdf_base64: str,
        sample_cv_data: dict,
        mock_openai_api_key: str,
        redis_cleanup
    ):
        """
        Test DELETE /api/v1/cv/data - Successfully delete CV data
        """
        logger.info("=" * 80)
        logger.info("TEST: Delete CV Data - Success")
        logger.info("=" * 80)

        # First upload a CV
        with patch('app.services.llm_service.LLMService.parse_cv_text') as mock_parse:
            mock_parse.return_value = sample_cv_data

            upload_request = {
                "filename": "test_cv.pdf",
                "file_data": sample_pdf_base64,
                "llm_provider": "openai",
                "api_key": mock_openai_api_key
            }

            logger.info("Step 1: Uploading CV...")
            upload_response = await client.post("/api/v1/cv/upload", json=upload_request)
            assert upload_response.status_code == 200

        # Now delete the CV
        logger.info("Step 2: Deleting CV data...")
        response = await client.delete("/api/v1/cv/data")

        logger.info(f"Status Code: {response.status_code}")
        logger.info(f"Response: {response.json()}")

        assert response.status_code == 200
        data = response.json()

        assert data["success"] is True
        assert "message" in data
        assert "deleted successfully" in data["message"]

        logger.info("✓ Successfully deleted CV data")

        # Verify it's actually deleted
        logger.info("Step 3: Verifying CV is deleted...")
        get_response = await client.get("/api/v1/cv/data")
        assert get_response.status_code == 404

        logger.info("✓ Verified CV data no longer exists")
        logger.info("")

    async def test_cv_workflow_complete(
        self,
        client: AsyncClient,
        sample_pdf_base64: str,
        sample_cv_data: dict,
        mock_openai_api_key: str,
        redis_cleanup
    ):
        """
        Test complete CV workflow: Upload -> Get -> Delete
        """
        logger.info("=" * 80)
        logger.info("TEST: Complete CV Workflow")
        logger.info("=" * 80)

        with patch('app.services.llm_service.LLMService.parse_cv_text') as mock_parse:
            mock_parse.return_value = sample_cv_data

            # Step 1: Upload CV
            logger.info("Step 1: Upload CV")
            upload_request = {
                "filename": "test_cv.pdf",
                "file_data": sample_pdf_base64,
                "llm_provider": "openai",
                "api_key": mock_openai_api_key
            }
            upload_response = await client.post("/api/v1/cv/upload", json=upload_request)
            assert upload_response.status_code == 200
            logger.info("  ✓ CV uploaded successfully")

            # Step 2: Retrieve CV
            logger.info("Step 2: Retrieve CV data")
            get_response = await client.get("/api/v1/cv/data")
            assert get_response.status_code == 200
            assert get_response.json()["cv_data"]["personalInfo"]["fullName"] == "John Doe"
            logger.info("  ✓ CV data retrieved successfully")

            # Step 3: Delete CV
            logger.info("Step 3: Delete CV data")
            delete_response = await client.delete("/api/v1/cv/data")
            assert delete_response.status_code == 200
            logger.info("  ✓ CV data deleted successfully")

            # Step 4: Verify deletion
            logger.info("Step 4: Verify deletion")
            verify_response = await client.get("/api/v1/cv/data")
            assert verify_response.status_code == 404
            logger.info("  ✓ Deletion verified")

        logger.info("✓ Complete CV workflow executed successfully")
        logger.info("")
