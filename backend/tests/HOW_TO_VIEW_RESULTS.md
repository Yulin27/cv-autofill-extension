# How to View Test Results

## 🎯 Quick Answer

After running tests, view the beautiful visualization dashboard:

```bash
# Step 1: Copy reports from Docker container
make test-get-reports

# Step 2: Start HTTP server
make test-reports

# Step 3: Open in browser
# Visit: http://localhost:8888/test_visualization.html
```

## 📊 Two Ways to View Results

### Method 1: HTTP Server (Recommended) ⭐

This method works perfectly and shows all features:

```bash
# From project root
make test-get-reports  # Copy reports from container
make test-reports      # Start server on port 8888
```

Then open in your browser:
- **Interactive Dashboard**: http://localhost:8888/test_visualization.html
- **Pytest HTML Report**: http://localhost:8888/test_report.html
- **Raw JSON Data**: http://localhost:8888/test_report.json

**Advantages:**
- ✅ Full JavaScript functionality
- ✅ Auto-refresh works
- ✅ Charts display correctly
- ✅ No CORS issues

### Method 2: Direct File Opening

Opening the HTML file directly (double-click or `open` command):

```bash
open backend/tests/reports/test_visualization.html
```

**What happens:**
- Browser opens the file with `file://` protocol
- You'll see a file selector: "📂 Load Test Results"
- Click "Choose File" and select `test_report.json` from the same directory
- Dashboard loads with all your test results!

**Why this happens:**
Browsers block JavaScript from loading local files for security. The file selector is a workaround.

## 🔄 Complete Workflow

### Standard Workflow (In Docker)

```bash
# 1. Run tests in Docker
docker exec cv-autofill-api python tests/run_tests.py

# 2. Copy reports to host machine
docker cp cv-autofill-api:/app/tests/reports/. backend/tests/reports/
docker cp cv-autofill-api:/app/tests/logs/. backend/tests/logs/

# 3. View with HTTP server
cd backend/tests && ./view_reports.sh
# Or: make test-reports

# 4. Open browser
# http://localhost:8888/test_visualization.html
```

### Using Make Commands (Easiest)

```bash
make test              # Run tests
make test-get-reports  # Copy reports
make test-reports      # View in browser
```

### One-Liner

```bash
docker exec cv-autofill-api python tests/run_tests.py && \
  make test-get-reports && \
  make test-reports
```

## 📂 Understanding the Visualization

### The visualization page shows you:

**Not for uploading PDFs!** The visualization is a **read-only dashboard** that shows test results.

#### What you'll see:

1. **Statistics Cards** (top row)
   - 📊 Total Tests: How many tests ran
   - ✅ Passed: Successfully completed tests
   - ❌ Failed: Tests that failed
   - ⊘ Skipped: Tests that were skipped

2. **Pie Chart** (middle section)
   - Visual breakdown of pass/fail/skip ratio
   - Interactive - hover for details

3. **Test Groups** (bottom section)
   - 🏠 Main Endpoints (/, /health, /docs)
   - 📄 CV Management (/api/v1/cv/*)
   - 🤖 AI Agents (/api/v1/agents/*)

4. **Test Details** (per test)
   - ✓/✗ Status badge
   - Test name and description
   - Execution time
   - Error details (if failed)

5. **Features**
   - 🔄 Refresh button (bottom right)
   - 🕐 Last updated timestamp
   - 📱 Responsive design
   - 🎨 Beautiful purple gradient

## 🐛 Troubleshooting

### "⚠️ Could not load test results"

**When opening HTML directly:**
1. You should see a file selector button
2. Click "Choose File"
3. Navigate to `backend/tests/reports/`
4. Select `test_report.json`
5. Dashboard loads!

**If using HTTP server:**
1. Make sure you ran `make test-get-reports` first
2. Check that files exist: `ls backend/tests/reports/`
3. Start server: `make test-reports`
4. Visit http://localhost:8888/test_visualization.html

### "No test_report.json found"

```bash
# Run tests to generate reports
docker exec cv-autofill-api python tests/run_tests.py

# Copy from container
make test-get-reports

# Verify files
ls -la backend/tests/reports/
# Should show: test_report.html, test_report.json, test_visualization.html
```

### "Port 8888 already in use"

```bash
# Option 1: Stop whatever is using port 8888
lsof -ti:8888 | xargs kill

# Option 2: Use different port
cd backend/tests/reports
python3 -m http.server 9999
# Then visit: http://localhost:9999/test_visualization.html
```

### "Container not running"

```bash
make up          # Start services
make test        # Run tests
make test-get-reports  # Copy reports
make test-reports      # View results
```

## 📸 What You Should See

When everything works, the visualization shows:

```
┌─────────────────────────────────────────────────┐
│  🧪 CV Auto-Fill API Test Results               │
│  Comprehensive test suite for all API endpoints │
└─────────────────────────────────────────────────┘

┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│ 📊      │ │ ✅      │ │ ❌      │ │ ⊘       │
│   19    │ │   9     │ │   10    │ │   0     │
│ TOTAL   │ │ PASSED  │ │ FAILED  │ │ SKIPPED │
└─────────┘ └─────────┘ └─────────┘ └─────────┘

        ┌─────────────────────┐
        │                     │
        │    🥧 PIE CHART    │
        │                     │
        └─────────────────────┘

🏠 Main Endpoints [4]
  ✅ test_root_endpoint
  ✅ test_health_check
  ...

📄 CV Management [8]
  ❌ test_upload_cv_success
  ...

🤖 AI Agents [7]
  ✅ test_analyze_field_redirects_to_batch
  ...
```

## 🎓 Understanding the Dashboard

### This is NOT for:
- ❌ Uploading CVs to test
- ❌ Running new tests
- ❌ Modifying test data

### This IS for:
- ✅ Viewing test results after running tests
- ✅ Checking which tests passed/failed
- ✅ Reading error messages
- ✅ Monitoring test execution time
- ✅ Tracking test coverage

## 🚀 Quick Reference

```bash
# Run tests + view results (complete workflow)
docker exec cv-autofill-api python tests/run_tests.py && \
  make test-get-reports && \
  make test-reports

# Then visit: http://localhost:8888/test_visualization.html
```

## 📚 Related Files

- **Full docs**: `tests/README.md`
- **Quick start**: `tests/QUICKSTART.md`
- **Docker guide**: `tests/DOCKER_TESTING.md`
- **Results summary**: `tests/TEST_RESULTS_SUMMARY.md`

---

**Need help?** Check the full documentation in `tests/README.md`
