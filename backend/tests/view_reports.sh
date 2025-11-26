#!/bin/bash
# Simple script to view test reports with a local HTTP server

echo "=========================================="
echo "  CV Auto-Fill API - Test Report Viewer"
echo "=========================================="
echo ""

# Check if reports exist
if [ ! -f "reports/test_report.json" ]; then
    echo "❌ No test reports found!"
    echo ""
    echo "Please run tests first:"
    echo "  docker exec cv-autofill-api python tests/run_tests.py"
    echo ""
    echo "Then copy reports:"
    echo "  docker cp cv-autofill-api:/app/tests/reports/. backend/tests/reports/"
    echo ""
    exit 1
fi

echo "✅ Test reports found!"
echo ""
echo "Starting HTTP server on port 8888..."
echo ""
echo "📊 Test Visualization:  http://localhost:8888/test_visualization.html"
echo "📄 Pytest HTML Report:  http://localhost:8888/test_report.html"
echo "📋 JSON Data:           http://localhost:8888/test_report.json"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""
echo "=========================================="
echo ""

cd reports && python3 -m http.server 8888
