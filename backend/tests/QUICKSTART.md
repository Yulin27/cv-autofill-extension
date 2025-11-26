# Quick Start Guide - Backend API Tests

Get up and running with the test suite in 3 minutes!

## 🚀 Step 1: Install Dependencies

```bash
cd backend
pip install -r tests/requirements-test.txt
```

This installs:
- pytest (testing framework)
- pytest-asyncio (async test support)
- pytest-html (HTML reports)
- pytest-json-report (JSON output for visualization)
- httpx (async HTTP client)
- pytest-cov (coverage reporting)

## 🧪 Step 2: Run Tests

### Option A: Use the Test Runner (Recommended)

```bash
python tests/run_tests.py
```

This will:
- ✅ Check all dependencies
- ✅ Run all test suites
- ✅ Generate detailed logs
- ✅ Create HTML reports
- ✅ Show summary statistics

### Option B: Use pytest directly

```bash
pytest tests/ -v
```

### Option C: Use Make (if available)

```bash
make test
```

## 📊 Step 3: View Results

### Console Output
You'll see real-time test results in your terminal with:
- ✅ Passed tests (green)
- ❌ Failed tests (red)
- ⊘ Skipped tests (yellow)
- 📊 Summary statistics

### Interactive Visualization
Open the beautiful HTML dashboard:

```bash
# macOS
open tests/reports/test_visualization.html

# Linux
xdg-open tests/reports/test_visualization.html

# Or use make
make test-reports
```

The visualization shows:
- 📊 Total test count
- ✅ Pass/fail/skip statistics
- 🥧 Pie chart visualization
- 📝 Detailed test results by category
- 🔄 Auto-refresh capability

### Log Files
Detailed logs are saved in:
```bash
tests/logs/test_run_YYYYMMDD_HHMMSS.log
```

## 🎯 What Gets Tested?

### Main Endpoints (4 tests)
- `GET /` - Root endpoint
- `GET /health` - Health check
- `GET /docs` - API documentation
- `GET /openapi.json` - OpenAPI schema

### CV Management (8 tests)
- `POST /api/v1/cv/upload` - Upload and parse CV
- `GET /api/v1/cv/data` - Retrieve CV data
- `DELETE /api/v1/cv/data` - Delete CV data
- Error handling (missing API key, invalid PDF, not found)
- Complete workflow test

### AI Agents (7 tests)
- `POST /api/v1/agents/analyze-field` - Field analysis
- `POST /api/v1/agents/generate-content` - Content generation
- `POST /api/v1/agents/analyze-and-generate` - Batch processing
- Different LLM providers (OpenAI, Anthropic, Groq)
- Edge cases (empty fields, max length constraints)

**Total: 19 comprehensive tests**

## 🔍 Example Test Output

```
==========================================
TEST: Upload CV - Success
==========================================
Request Data: filename=test_cv.pdf, provider=openai
Status Code: 200
Response: {'success': True, 'cv_data': {...}, 'cv_id': 1, ...}
✓ CV uploaded successfully
  - CV ID: 1
  - Processing Time: 234ms
  - Full Name: John Doe

==========================================
TEST SUMMARY
==========================================
Total Tests:  19
✓ Passed:     19
✗ Failed:     0
⊘ Skipped:    0
Duration:     5.23s

✓ ALL TESTS PASSED
```

## 🐛 Troubleshooting

### "ModuleNotFoundError: No module named 'pytest'"
```bash
pip install -r tests/requirements-test.txt
```

### "No module named 'app'"
```bash
# Make sure you're in the backend directory
cd backend
python tests/run_tests.py
```

### Redis Connection Warning
Don't worry! Tests will still pass. The warning just means Redis isn't running:
```bash
# Optional: Start Redis
docker-compose up -d redis
```

### "fixture 'xyz' not found"
Make sure `conftest.py` exists in the tests directory. It should already be there!

## 🎓 Next Steps

### Run Specific Tests
```bash
# Test only CV endpoints
pytest tests/test_cv_api.py -v

# Test only one function
pytest tests/test_cv_api.py::TestCVEndpoints::test_upload_cv_success -v
```

### Generate Coverage Report
```bash
python tests/run_tests.py --coverage
open htmlcov/index.html
```

### Watch Tests (Re-run on file changes)
```bash
pip install pytest-watch
ptw tests/
```

## 📚 Learn More

- Full documentation: `tests/README.md`
- Write new tests: See `tests/README.md` → "Writing New Tests"
- Test structure: See `tests/README.md` → "Test Structure"

## ✅ Success Checklist

After running tests, you should have:
- [ ] All tests passed (or see clear failure reasons)
- [ ] Log file created in `tests/logs/`
- [ ] HTML report at `tests/reports/test_report.html`
- [ ] JSON report at `tests/reports/test_report.json`
- [ ] Visualization at `tests/reports/test_visualization.html`

---

**That's it! You're ready to test the API. 🎉**

For more details, see the full [README.md](README.md)
