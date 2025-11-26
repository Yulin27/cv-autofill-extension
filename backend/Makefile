# Makefile for CV Auto-Fill Backend API

.PHONY: help install test test-verbose test-coverage test-reports clean dev

help:
	@echo "CV Auto-Fill Backend - Available Commands"
	@echo "=========================================="
	@echo ""
	@echo "  make install          Install dependencies"
	@echo "  make test             Run all tests"
	@echo "  make test-verbose     Run tests with verbose output"
	@echo "  make test-coverage    Run tests with coverage report"
	@echo "  make test-reports     Open test visualization page"
	@echo "  make clean            Clean test artifacts"
	@echo "  make dev              Start development server"
	@echo ""

install:
	@echo "Installing dependencies..."
	pip install -r requirements.txt
	pip install -r tests/requirements-test.txt
	@echo "✓ Dependencies installed"

test:
	@echo "Running test suite..."
	python tests/run_tests.py

test-verbose:
	@echo "Running test suite (verbose)..."
	python tests/run_tests.py --verbose

test-coverage:
	@echo "Running test suite with coverage..."
	python tests/run_tests.py --coverage

test-reports:
	@echo "Opening test visualization..."
	open tests/reports/test_visualization.html || xdg-open tests/reports/test_visualization.html

clean:
	@echo "Cleaning test artifacts..."
	rm -rf tests/logs/*
	rm -rf tests/reports/*
	rm -rf .pytest_cache
	rm -rf htmlcov
	rm -rf .coverage
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	@echo "✓ Cleaned"

dev:
	@echo "Starting development server..."
	uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
