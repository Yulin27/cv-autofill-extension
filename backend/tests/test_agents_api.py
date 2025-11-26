"""
Tests for AI Agents API endpoints
"""
import pytest
from httpx import AsyncClient
import logging
from unittest.mock import AsyncMock, patch

logger = logging.getLogger(__name__)


@pytest.mark.asyncio
class TestAgentsEndpoints:
    """Test suite for AI agents endpoints"""

    async def test_analyze_field_redirects_to_batch(
        self,
        client: AsyncClient,
        redis_cleanup
    ):
        """
        Test POST /api/v1/agents/analyze-field
        Should redirect to batch endpoint with 400 error
        """
        logger.info("=" * 80)
        logger.info("TEST: Analyze Field - Redirects to Batch")
        logger.info("=" * 80)

        request_data = {
            "field_label": "Full Name",
            "field_type": "text",
            "cv_data": {
                "personalInfo": {"fullName": "John Doe"},
                "skills": {"technical": [], "languages": [], "soft": []}
            }
        }

        logger.info("Request: Single field analysis")

        response = await client.post("/api/v1/agents/analyze-field", json=request_data)

        logger.info(f"Status Code: {response.status_code}")
        logger.info(f"Response: {response.json()}")

        assert response.status_code == 400
        data = response.json()

        assert "detail" in data
        assert "batch processing" in data["detail"].lower()

        logger.info("✓ Correctly redirected to batch endpoint")
        logger.info("")

    async def test_generate_content_redirects_to_batch(
        self,
        client: AsyncClient,
        redis_cleanup
    ):
        """
        Test POST /api/v1/agents/generate-content
        Should redirect to batch endpoint with 400 error
        """
        logger.info("=" * 80)
        logger.info("TEST: Generate Content - Redirects to Batch")
        logger.info("=" * 80)

        request_data = {
            "field_label": "Full Name",
            "field_type": "text",
            "analysis": {
                "strategy": "direct_match",
                "reasoning": "Extract from CV",
                "cv_field_path": "personalInfo.fullName"
            },
            "cv_data": {
                "personalInfo": {"fullName": "John Doe"},
                "skills": {"technical": [], "languages": [], "soft": []}
            }
        }

        logger.info("Request: Single content generation")

        response = await client.post("/api/v1/agents/generate-content", json=request_data)

        logger.info(f"Status Code: {response.status_code}")
        logger.info(f"Response: {response.json()}")

        assert response.status_code == 400
        data = response.json()

        assert "detail" in data
        assert "batch processing" in data["detail"].lower()

        logger.info("✓ Correctly redirected to batch endpoint")
        logger.info("")

    async def test_analyze_and_generate_no_cv_data(
        self,
        client: AsyncClient,
        sample_form_fields: list,
        mock_openai_api_key: str,
        redis_cleanup
    ):
        """
        Test POST /api/v1/agents/analyze-and-generate - No CV data
        Should return 404 error
        """
        logger.info("=" * 80)
        logger.info("TEST: Batch Processing - No CV Data")
        logger.info("=" * 80)

        # All parameters in JSON body (updated endpoint with Body() annotations)
        logger.info("Request: Batch processing without uploaded CV")

        response = await client.post(
            "/api/v1/agents/analyze-and-generate",
            json={
                "fields": sample_form_fields,
                "api_key": mock_openai_api_key,
                "provider": "openai",
                "page_context": None
            }
        )

        logger.info(f"Status Code: {response.status_code}")
        logger.info(f"Response: {response.json()}")

        assert response.status_code == 404
        data = response.json()

        assert "detail" in data
        assert "No CV data found" in data["detail"]

        logger.info("✓ Correctly returned 404 when no CV uploaded")
        logger.info("")

    async def test_analyze_and_generate_success(
        self,
        client: AsyncClient,
        sample_pdf_base64: str,
        sample_cv_data: dict,
        sample_form_fields: list,
        sample_page_context: dict,
        mock_openai_api_key: str,
        redis_cleanup
    ):
        """
        Test POST /api/v1/agents/analyze-and-generate - Successful batch processing
        """
        logger.info("=" * 80)
        logger.info("TEST: Batch Processing - Success")
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

        # Mock the agent services
        mock_analysis = {
            "strategy": "direct_match",
            "reasoning": "Direct match from CV",
            "cv_field_path": "personalInfo.fullName"
        }

        mock_content = "John Doe"

        with patch('app.services.field_analyzer_service.FieldAnalyzerService.analyze_field') as mock_analyzer, \
             patch('app.services.content_generator_service.ContentGeneratorService.generate_content') as mock_generator:

            mock_analyzer.return_value = mock_analysis
            mock_generator.return_value = mock_content

            # Now test batch processing
            logger.info("Step 2: Processing fields in batch...")

            logger.info(f"Request: {len(sample_form_fields[:2])} fields")
            logger.info(f"Page Context: {sample_page_context}")

            response = await client.post(
                "/api/v1/agents/analyze-and-generate",
                json={
                    "fields": sample_form_fields[:2],
                    "api_key": mock_openai_api_key,
                    "provider": "openai",
                    "page_context": sample_page_context
                }
            )

            logger.info(f"Status Code: {response.status_code}")
            logger.info(f"Response: {response.json()}")

            assert response.status_code == 200
            data = response.json()

            assert data["success"] is True
            assert "results" in data
            assert len(data["results"]) == 2

            for i, result in enumerate(data["results"]):
                logger.info(f"  Field {i+1}:")
                logger.info(f"    - Label: {result['field_label']}")
                logger.info(f"    - Analysis: {result['analysis']['strategy']}")
                logger.info(f"    - Content: {result['content']}")

                assert "field_name" in result
                assert "field_label" in result
                assert "analysis" in result
                assert "content" in result
                assert result["analysis"]["strategy"] == "direct_match"

            logger.info("✓ Batch processing completed successfully")
            logger.info("")

    async def test_analyze_and_generate_with_different_providers(
        self,
        client: AsyncClient,
        sample_pdf_base64: str,
        sample_cv_data: dict,
        sample_form_fields: list,
        mock_openai_api_key: str,
        redis_cleanup
    ):
        """
        Test POST /api/v1/agents/analyze-and-generate with different LLM providers
        """
        logger.info("=" * 80)
        logger.info("TEST: Batch Processing - Different Providers")
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

        # Test different providers
        providers = ["openai", "anthropic", "groq"]

        for provider in providers:
            logger.info(f"Step 2: Testing with provider: {provider}")

            mock_analysis = {
                "strategy": "direct_match",
                "reasoning": f"Analysis with {provider}",
                "cv_field_path": "personalInfo.fullName"
            }

            with patch('app.services.field_analyzer_service.FieldAnalyzerService.analyze_field') as mock_analyzer, \
                 patch('app.services.content_generator_service.ContentGeneratorService.generate_content') as mock_generator:

                mock_analyzer.return_value = mock_analysis
                mock_generator.return_value = "John Doe"

                response = await client.post(
                    "/api/v1/agents/analyze-and-generate",
                    json={
                        "fields": [sample_form_fields[0]],
                        "api_key": mock_openai_api_key,
                        "provider": provider,
                        "page_context": None
                    }
                )

                logger.info(f"  Status Code: {response.status_code}")

                if response.status_code == 200:
                    logger.info(f"  ✓ {provider} provider works correctly")
                else:
                    logger.info(f"  Response: {response.json()}")

        logger.info("✓ Tested multiple providers")
        logger.info("")

    async def test_analyze_and_generate_empty_fields(
        self,
        client: AsyncClient,
        sample_pdf_base64: str,
        sample_cv_data: dict,
        mock_openai_api_key: str,
        redis_cleanup
    ):
        """
        Test POST /api/v1/agents/analyze-and-generate with empty fields list
        """
        logger.info("=" * 80)
        logger.info("TEST: Batch Processing - Empty Fields")
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

        # Test with empty fields
        logger.info("Step 2: Testing with empty fields list...")

        response = await client.post(
            "/api/v1/agents/analyze-and-generate",
            json={
                "fields": [],
                "api_key": mock_openai_api_key,
                "provider": "openai",
                "page_context": None
            }
        )

        logger.info(f"Status Code: {response.status_code}")
        logger.info(f"Response: {response.json()}")

        assert response.status_code == 200
        data = response.json()

        assert data["success"] is True
        assert len(data["results"]) == 0

        logger.info("✓ Handled empty fields list correctly")
        logger.info("")

    async def test_analyze_and_generate_with_max_length(
        self,
        client: AsyncClient,
        sample_pdf_base64: str,
        sample_cv_data: dict,
        mock_openai_api_key: str,
        redis_cleanup
    ):
        """
        Test POST /api/v1/agents/analyze-and-generate with maxLength constraint
        """
        logger.info("=" * 80)
        logger.info("TEST: Batch Processing - Max Length Constraint")
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

        # Mock the services
        with patch('app.services.field_analyzer_service.FieldAnalyzerService.analyze_field') as mock_analyzer, \
             patch('app.services.content_generator_service.ContentGeneratorService.generate_content') as mock_generator:

            mock_analyzer.return_value = {
                "strategy": "generate",
                "reasoning": "Generate summary with length constraint",
                "generation_guidance": "Brief summary"
            }

            # Generate content that respects max length
            short_content = "Brief professional summary that fits within 50 chars"
            mock_generator.return_value = short_content[:50]

            logger.info("Step 2: Processing field with maxLength=50...")

            fields_with_max_length = [{
                "name": "summary",
                "label": "Summary",
                "type": "textarea",
                "maxLength": 50
            }]

            response = await client.post(
                "/api/v1/agents/analyze-and-generate",
                json={
                    "fields": fields_with_max_length,
                    "api_key": mock_openai_api_key,
                    "provider": "openai",
                    "page_context": None
                }
            )

            logger.info(f"Status Code: {response.status_code}")

            assert response.status_code == 200
            data = response.json()

            result = data["results"][0]
            content_length = len(result["content"])

            logger.info(f"Generated Content: {result['content']}")
            logger.info(f"Content Length: {content_length}")
            logger.info(f"Max Length: 50")

            assert content_length <= 50

            logger.info("✓ Content respects max length constraint")
            logger.info("")
