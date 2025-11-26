"""
Tests for main application endpoints
"""
import pytest
from httpx import AsyncClient
import logging

logger = logging.getLogger(__name__)


@pytest.mark.asyncio
class TestMainEndpoints:
    """Test suite for main application endpoints"""

    async def test_root_endpoint(self, client: AsyncClient):
        """
        Test GET / - Root endpoint
        Should return project information and status
        """
        logger.info("=" * 80)
        logger.info("TEST: Root Endpoint")
        logger.info("=" * 80)

        response = await client.get("/")

        logger.info(f"Status Code: {response.status_code}")
        logger.info(f"Response: {response.json()}")

        assert response.status_code == 200
        data = response.json()

        assert "name" in data
        assert "version" in data
        assert "status" in data
        assert data["status"] == "online"
        assert "docs_url" in data

        logger.info("✓ Root endpoint returned correct information")
        logger.info("")

    async def test_health_check(self, client: AsyncClient):
        """
        Test GET /health - Health check endpoint
        Should return health status and Redis connection status
        """
        logger.info("=" * 80)
        logger.info("TEST: Health Check Endpoint")
        logger.info("=" * 80)

        response = await client.get("/health")

        logger.info(f"Status Code: {response.status_code}")
        logger.info(f"Response: {response.json()}")

        assert response.status_code == 200
        data = response.json()

        assert "status" in data
        assert data["status"] == "healthy"
        assert "environment" in data
        assert "redis" in data
        assert data["redis"] in ["connected", "disconnected"]

        logger.info("✓ Health check returned correct status")
        logger.info("")

    async def test_docs_available(self, client: AsyncClient):
        """
        Test that OpenAPI documentation is available
        """
        logger.info("=" * 80)
        logger.info("TEST: API Documentation Availability")
        logger.info("=" * 80)

        response = await client.get("/docs")

        logger.info(f"Status Code: {response.status_code}")

        assert response.status_code == 200

        logger.info("✓ API documentation is accessible")
        logger.info("")

    async def test_openapi_json(self, client: AsyncClient):
        """
        Test that OpenAPI JSON schema is available
        """
        logger.info("=" * 80)
        logger.info("TEST: OpenAPI JSON Schema")
        logger.info("=" * 80)

        response = await client.get("/openapi.json")

        logger.info(f"Status Code: {response.status_code}")

        assert response.status_code == 200
        data = response.json()

        assert "openapi" in data
        assert "info" in data
        assert "paths" in data

        logger.info(f"API Title: {data['info']['title']}")
        logger.info(f"API Version: {data['info']['version']}")
        logger.info(f"Number of endpoints: {len(data['paths'])}")

        logger.info("✓ OpenAPI schema is valid")
        logger.info("")
