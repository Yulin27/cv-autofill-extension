# Running Tests in Docker

This guide explains how to run tests inside the Docker container.

## 🔧 Setup (First Time Only)

The Docker container needs to be rebuilt to include test dependencies.

### Step 1: Rebuild the Container

```bash
# From the project root directory
make rebuild
```

This will rebuild the Docker image with:
- All application dependencies
- Test dependencies (pytest, httpx, etc.)
- The test suite

### Step 2: Start Services

```bash
make up
```

This starts:
- ✅ Redis (for caching)
- ✅ API container (with tests installed)

## 🧪 Running Tests

### Basic Test Run

```bash
make test
```

This runs all tests inside the Docker container and shows results in the console.

### Verbose Output

```bash
make test-verbose
```

Shows detailed test execution with all logging.

### With Coverage Report

```bash
make test-coverage
```

Generates code coverage metrics.

### View Test Reports

After running tests, view the interactive visualization:

```bash
make test-reports
```

This opens the HTML visualization page in your browser.

### Copy Reports from Container

Test reports are generated inside the container. To access them on your host machine:

```bash
make test-get-reports
```

This copies:
- HTML reports → `backend/tests/reports/`
- JSON data → `backend/tests/reports/`
- Log files → `backend/tests/logs/`

## 🏃 Alternative: Local Testing (No Docker)

If you prefer to run tests locally without Docker:

### 1. Install Dependencies Locally

```bash
cd backend
pip install -r requirements.txt
pip install -r tests/requirements-test.txt
```

### 2. Start Redis (Required)

```bash
# Using Docker
docker run -d -p 6379:6379 redis:7-alpine

# Or from docker-compose
cd backend && docker-compose up -d redis
```

### 3. Run Tests Locally

```bash
# From project root
make test-local

# Or from backend directory
cd backend
python tests/run_tests.py
```

## 📊 Available Test Commands

| Command | Description |
|---------|-------------|
| `make test` | Run tests in Docker container |
| `make test-verbose` | Run tests with detailed output |
| `make test-coverage` | Run tests with coverage metrics |
| `make test-local` | Run tests locally (no Docker) |
| `make test-reports` | Open visualization page |
| `make test-get-reports` | Copy reports from container |

## 🔍 Debugging Tests in Docker

### Access Container Shell

```bash
make shell
```

Inside the container, you can:

```bash
# Run specific test file
pytest tests/test_cv_api.py -v

# Run specific test
pytest tests/test_cv_api.py::TestCVEndpoints::test_upload_cv_success -v

# Check installed packages
pip list | grep pytest

# View test files
ls -la tests/

# Read logs
cat tests/logs/*.log
```

### View Container Logs

```bash
# All logs
make logs

# API logs only
make logs-api
```

### Check Service Status

```bash
make status
```

## 🐛 Troubleshooting

### "pytest: executable file not found"

**Solution**: Rebuild the Docker container
```bash
make rebuild
make up
```

### Tests fail with "No CV data found"

This is normal - the tests use mocked data and don't require real CV uploads.

### Redis connection warnings

The app handles Redis disconnections gracefully. Tests will still pass.

### "No test reports found"

1. Make sure tests have run: `make test`
2. Copy reports from container: `make test-get-reports`
3. Then view reports: `make test-reports`

### Container not running

```bash
# Check status
make ps

# Start services
make up

# Or restart
make restart
```

## 📈 Understanding Test Output

### Console Output

```
================================================================================
 CV AUTO-FILL API TEST SUITE
================================================================================

Checking dependencies...
  ✓ pytest
  ✓ pytest-asyncio
  ✓ httpx
All dependencies installed!

Running test suite...

tests/test_main.py::TestMainEndpoints::test_root_endpoint PASSED
tests/test_cv_api.py::TestCVEndpoints::test_upload_cv_success PASSED
...

================================================================================
 TEST SUMMARY
================================================================================
Total Tests:  19
✓ Passed:     19
✗ Failed:     0
⊘ Skipped:    0
Duration:     5.23s
```

### Report Files

Inside the container at `/app/tests/`:
- `reports/test_report.html` - Pytest HTML report
- `reports/test_report.json` - JSON data
- `reports/test_visualization.html` - Interactive dashboard
- `logs/test_run_*.log` - Detailed logs

On host machine (after `make test-get-reports`):
- `backend/tests/reports/` - All report files
- `backend/tests/logs/` - All log files

## 🚀 CI/CD Integration

To run tests in CI/CD pipelines:

```yaml
# Example for GitHub Actions
- name: Run tests
  run: |
    docker-compose -f backend/docker-compose.yml up -d
    docker exec cv-autofill-api python tests/run_tests.py
    docker cp cv-autofill-api:/app/tests/reports/. ./reports/
```

## 📚 Additional Resources

- Full test documentation: [README.md](README.md)
- Quick start guide: [QUICKSTART.md](QUICKSTART.md)
- Docker commands: Root `Makefile`

---

**Now you can run tests in Docker! 🐳✅**
