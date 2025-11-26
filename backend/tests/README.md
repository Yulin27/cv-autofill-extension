# CV Auto-Fill Backend API - Test Suite

Comprehensive test suite for all backend API endpoints with detailed logging and interactive visualization.

## 🎉 Current Status: 100% Passing! 🎉

**Latest Test Results:**
- ✅ **19/19 tests passing (100%)**
- ⚡ Test duration: ~1.5 seconds
- 📊 All endpoints fully covered
- 🐛 Zero failures or errors

See [LATEST_RESULTS.md](LATEST_RESULTS.md) for detailed breakdown.

## 📋 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Test Reports](#test-reports)
- [Writing New Tests](#writing-new-tests)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- **Comprehensive Coverage**: Tests for all API endpoints
  - Main application endpoints (root, health check)
  - CV management (upload, retrieve, delete)
  - AI agents (field analysis, content generation, batch processing)

- **Clear Logging**: Detailed console and file logging for every test
  - Timestamped log files in `tests/logs/`
  - Color-coded console output
  - Request/response logging

- **Visual Reports**: Interactive HTML visualization
  - Real-time test statistics
  - Pie chart visualization
  - Test grouping by category
  - Auto-refresh capability

- **Async Testing**: Full support for async/await patterns
- **Mocking**: Isolated tests with mocked external dependencies
- **Fixtures**: Reusable test data and setup

## 🚀 Installation

### 1. Install Test Dependencies

```bash
# From the backend directory
cd backend

# Install test requirements
pip install -r tests/requirements-test.txt
```

### 2. Verify Installation

```bash
# Check that pytest is installed
pytest --version

# Check that all dependencies are available
python tests/run_tests.py --help
```

## 🧪 Running Tests

### Quick Start

```bash
# From the backend directory
python tests/run_tests.py
```

### Advanced Options

```bash
# Verbose output
python tests/run_tests.py --verbose

# With code coverage
python tests/run_tests.py --coverage

# Run specific test file
pytest tests/test_cv_api.py -v

# Run specific test class
pytest tests/test_cv_api.py::TestCVEndpoints -v

# Run specific test
pytest tests/test_cv_api.py::TestCVEndpoints::test_upload_cv_success -v

# Run with custom markers
pytest -m "not slow" -v  # Skip slow tests
```

### Using pytest directly

```bash
# Run all tests
pytest tests/ -v

# Run with HTML report
pytest tests/ -v --html=tests/reports/report.html --self-contained-html

# Run with JSON report (for visualization)
pytest tests/ -v --json-report --json-report-file=tests/reports/test_report.json

# Run with coverage
pytest tests/ -v --cov=app --cov-report=html
```

## 📁 Test Structure

```
backend/tests/
├── __init__.py                     # Test package initialization
├── conftest.py                     # Pytest fixtures and configuration
├── pytest.ini                      # Pytest settings
├── requirements-test.txt           # Test dependencies
├── run_tests.py                    # Main test runner script
├── README.md                       # This file
│
├── test_main.py                    # Tests for main endpoints
│   ├── test_root_endpoint          # GET /
│   ├── test_health_check           # GET /health
│   ├── test_docs_available         # GET /docs
│   └── test_openapi_json           # GET /openapi.json
│
├── test_cv_api.py                  # Tests for CV management
│   ├── test_upload_cv_success      # POST /api/v1/cv/upload
│   ├── test_upload_cv_missing_api_key
│   ├── test_upload_cv_invalid_pdf
│   ├── test_get_cv_data_not_found  # GET /api/v1/cv/data
│   ├── test_get_cv_data_success
│   ├── test_delete_cv_data_not_found  # DELETE /api/v1/cv/data
│   ├── test_delete_cv_data_success
│   └── test_cv_workflow_complete
│
├── test_agents_api.py              # Tests for AI agents
│   ├── test_analyze_field_redirects_to_batch
│   ├── test_generate_content_redirects_to_batch
│   ├── test_analyze_and_generate_no_cv_data
│   ├── test_analyze_and_generate_success
│   ├── test_analyze_and_generate_with_different_providers
│   ├── test_analyze_and_generate_empty_fields
│   └── test_analyze_and_generate_with_max_length
│
├── logs/                           # Test execution logs
│   └── test_run_YYYYMMDD_HHMMSS.log
│
└── reports/                        # Test reports
    ├── test_report.html           # Pytest HTML report
    ├── test_report.json           # JSON data for visualization
    └── test_visualization.html    # Interactive visualization page
```

## 📊 Test Reports

After running tests, you'll find several reports:

### 1. Console Output
Real-time colored output with:
- Test execution progress
- Request/response logging
- Pass/fail indicators
- Summary statistics

### 2. Log Files
Detailed logs in `tests/logs/`:
```bash
# View latest log
cat tests/logs/test_run_*.log | tail -100
```

### 3. HTML Reports

#### Pytest HTML Report
Standard pytest report with detailed test information:
```bash
open tests/reports/test_report.html
```

#### Interactive Visualization
Beautiful, interactive dashboard:
```bash
open tests/reports/test_visualization.html
```

Features:
- 📊 Real-time statistics
- 🥧 Pie chart visualization
- 🔍 Grouped test results
- 🔄 Auto-refresh every 30 seconds
- 📱 Responsive design

### 4. Coverage Reports (if enabled)
```bash
# Run tests with coverage
python tests/run_tests.py --coverage

# View coverage report
open htmlcov/index.html
```

## 📝 Writing New Tests

### 1. Create Test File

```python
"""
Tests for new feature
"""
import pytest
from httpx import AsyncClient
import logging

logger = logging.getLogger(__name__)


@pytest.mark.asyncio
class TestNewFeature:
    """Test suite for new feature"""

    async def test_new_endpoint(self, client: AsyncClient):
        """
        Test GET /api/v1/new-endpoint
        """
        logger.info("=" * 80)
        logger.info("TEST: New Endpoint")
        logger.info("=" * 80)

        response = await client.get("/api/v1/new-endpoint")

        logger.info(f"Status Code: {response.status_code}")
        logger.info(f"Response: {response.json()}")

        assert response.status_code == 200
        data = response.json()

        assert "expected_field" in data

        logger.info("✓ New endpoint works correctly")
        logger.info("")
```

### 2. Use Fixtures

Available fixtures in `conftest.py`:
- `client`: Async HTTP client
- `redis_cleanup`: Clean up Redis after test
- `sample_cv_data`: Sample CV data dictionary
- `sample_pdf_base64`: Base64-encoded PDF
- `sample_form_fields`: List of form field objects
- `sample_page_context`: Job application context
- `mock_openai_api_key`: Mock API key

### 3. Add Logging

Follow the logging pattern:
```python
logger.info("=" * 80)
logger.info("TEST: Test Description")
logger.info("=" * 80)

# Test code...

logger.info("✓ Test passed with expected result")
logger.info("")
```

### 4. Mock External Services

```python
from unittest.mock import patch

async def test_with_mock(self, client: AsyncClient):
    with patch('app.services.llm_service.LLMService.parse_cv_text') as mock_parse:
        mock_parse.return_value = {"data": "mocked"}

        # Test code that uses the mocked service
        response = await client.post("/api/v1/cv/upload", json=request_data)

        assert response.status_code == 200
```

## 🔧 Troubleshooting

### Tests Won't Run

**Problem**: ImportError or ModuleNotFoundError
```bash
# Solution: Install dependencies
pip install -r tests/requirements-test.txt
pip install -r requirements.txt
```

**Problem**: "No module named 'app'"
```bash
# Solution: Run from backend directory
cd backend
python tests/run_tests.py
```

### Redis Connection Issues

**Problem**: Redis connection failed
```bash
# Solution: Make sure Redis is running
docker-compose up -d redis

# Or start Redis locally
redis-server
```

**Tests will still run**: The application handles Redis disconnections gracefully.

### Fixture Errors

**Problem**: "fixture 'xyz' not found"
```bash
# Solution: Check conftest.py for available fixtures
# Make sure your test file is in the tests/ directory
```

### Async Issues

**Problem**: "RuntimeError: Event loop is closed"
```bash
# Solution: Make sure you're using @pytest.mark.asyncio
@pytest.mark.asyncio
async def test_my_async_function():
    # async test code
```

### Report Not Generated

**Problem**: test_visualization.html shows "Could not load test results"
```bash
# Solution: Make sure JSON report plugin is installed
pip install pytest-json-report

# Run tests to generate report
python tests/run_tests.py

# Check that JSON file exists
ls tests/reports/test_report.json
```

## 🎯 Test Coverage Goals

Current coverage targets:
- **Main Endpoints**: 100%
- **CV Management**: 95%+
- **AI Agents**: 90%+
- **Overall**: 90%+

Check coverage:
```bash
python tests/run_tests.py --coverage
open htmlcov/index.html
```

## 🤝 Contributing

When adding new API endpoints:

1. Write tests first (TDD approach)
2. Include both success and failure cases
3. Add clear logging statements
4. Mock external dependencies
5. Update this README if adding new test categories

## 📚 Additional Resources

- [Pytest Documentation](https://docs.pytest.org/)
- [HTTPX Async Client](https://www.python-httpx.org/)
- [FastAPI Testing](https://fastapi.tiangolo.com/tutorial/testing/)
- [pytest-asyncio](https://pytest-asyncio.readthedocs.io/)

## 📞 Support

If you encounter issues:

1. Check the log files in `tests/logs/`
2. Review the error messages in test output
3. Verify all dependencies are installed
4. Ensure Redis is running
5. Check that the backend server is not running on the same port

---

**Happy Testing! 🧪✨**
