.PHONY: help up down build restart logs clean clean-all shell db-shell redis-shell test ps status migrate

# Default target
help:
	@echo "CV Auto-Fill Backend - Docker Commands"
	@echo "======================================"
	@echo ""
	@echo "Basic Commands:"
	@echo "  make up          - Start all services (detached mode)"
	@echo "  make down        - Stop all services"
	@echo "  make restart     - Restart all services"
	@echo "  make build       - Build Docker images"
	@echo "  make rebuild     - Rebuild images from scratch (no cache)"
	@echo ""
	@echo "Monitoring:"
	@echo "  make logs        - View all logs (follow mode)"
	@echo "  make logs-api    - View API logs only"
	@echo "  make logs-db     - View PostgreSQL logs"
	@echo "  make logs-redis  - View Redis logs"
	@echo "  make ps          - List running containers"
	@echo "  make status      - Check service health status"
	@echo ""
	@echo "Shell Access:"
	@echo "  make shell       - Access API container shell"
	@echo "  make db-shell    - Access PostgreSQL shell"
	@echo "  make redis-shell - Access Redis CLI"
	@echo ""
	@echo "Database:"
	@echo "  make migrate     - Run database migrations"
	@echo "  make db-reset    - Reset database (WARNING: deletes data)"
	@echo ""
	@echo "Cleanup:"
	@echo "  make clean       - Stop and remove containers"
	@echo "  make clean-all   - Remove containers, volumes, and images"
	@echo ""
	@echo "Testing:"
	@echo "  make test               - Run tests in Docker container"
	@echo "  make test-verbose       - Run tests with verbose output"
	@echo "  make test-coverage      - Run tests with coverage report"
	@echo "  make test-local         - Run tests locally (no Docker)"
	@echo "  make test-get-reports   - Copy reports from container to host"
	@echo "  make test-reports       - Start HTTP server to view reports"
	@echo "  make test-reports-open  - Open visualization directly (may not work)"
	@echo ""

# Start services
up:
	@echo "Starting CV Auto-Fill backend services..."
	cd backend && docker-compose up -d
	@echo "✓ Services started successfully"
	@echo "API available at: http://localhost:8000"
	@echo "Docs available at: http://localhost:8000/docs"

# Start with logs
up-logs:
	@echo "Starting services with logs..."
	cd backend && docker-compose up

# Stop services
down:
	@echo "Stopping services..."
	cd backend && docker-compose down
	@echo "✓ Services stopped"

# Build images
build:
	@echo "Building Docker images..."
	cd backend && docker-compose build
	@echo "✓ Build complete"

# Rebuild from scratch
rebuild:
	@echo "Rebuilding images (no cache)..."
	cd backend && docker-compose build --no-cache
	@echo "✓ Rebuild complete"

# Restart services
restart:
	@echo "Restarting services..."
	cd backend && docker-compose restart
	@echo "✓ Services restarted"

# View all logs
logs:
	cd backend && docker-compose logs -f

# View API logs only
logs-api:
	cd backend && docker-compose logs -f api

# View PostgreSQL logs
logs-db:
	cd backend && docker-compose logs -f postgres

# View Redis logs
logs-redis:
	cd backend && docker-compose logs -f redis

# List running containers
ps:
	cd backend && docker-compose ps

# Check service health
status:
	@echo "Service Status:"
	@echo "==============="
	@cd backend && docker-compose ps
	@echo ""
	@echo "Health Checks:"
	@echo "==============="
	@docker inspect cv-autofill-api --format='API: {{.State.Status}}' 2>/dev/null || echo "API: not running"
	@docker inspect cv-autofill-postgres --format='PostgreSQL: {{.State.Health.Status}}' 2>/dev/null || echo "PostgreSQL: not running"
	@docker inspect cv-autofill-redis --format='Redis: {{.State.Health.Status}}' 2>/dev/null || echo "Redis: not running"

# Access API container shell
shell:
	@echo "Accessing API container shell..."
	docker exec -it cv-autofill-api /bin/bash

# Access PostgreSQL shell
db-shell:
	@echo "Accessing PostgreSQL shell..."
	docker exec -it cv-autofill-postgres psql -U cv_autofill_user -d cv_autofill

# Access Redis CLI
redis-shell:
	@echo "Accessing Redis CLI..."
	docker exec -it cv-autofill-redis redis-cli

# Run database migrations
migrate:
	@echo "Running database migrations..."
	docker exec cv-autofill-api alembic upgrade head
	@echo "✓ Migrations complete"

# Reset database (WARNING: deletes all data)
db-reset:
	@echo "⚠️  WARNING: This will delete all data!"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		cd backend && docker-compose down -v postgres; \
		cd backend && docker-compose up -d postgres; \
		echo "Waiting for PostgreSQL to be ready..."; \
		sleep 5; \
		make migrate; \
		echo "✓ Database reset complete"; \
	else \
		echo "Cancelled"; \
	fi

# Run tests
test:
	@echo "Running tests in Docker container..."
	docker exec cv-autofill-api python tests/run_tests.py

# Run tests with verbose output
test-verbose:
	@echo "Running tests (verbose) in Docker container..."
	docker exec cv-autofill-api python tests/run_tests.py --verbose

# Run tests with coverage
test-coverage:
	@echo "Running tests with coverage in Docker container..."
	docker exec cv-autofill-api python tests/run_tests.py --coverage

# Run tests locally (without Docker)
test-local:
	@echo "Running tests locally..."
	cd backend && python tests/run_tests.py

# Copy test reports from container to host
test-get-reports:
	@echo "Copying test reports from container..."
	@docker cp cv-autofill-api:/app/tests/reports/. backend/tests/reports/ 2>/dev/null || echo "  (Container may not be running)"
	@docker cp cv-autofill-api:/app/tests/logs/. backend/tests/logs/ 2>/dev/null || echo "  (Container may not be running)"
	@echo "✓ Reports copied to backend/tests/reports/"
	@echo "✓ Logs copied to backend/tests/logs/"

# View test reports with HTTP server
test-reports:
	@echo "Starting test report server..."
	@echo ""
	@echo "📊 Test Visualization: http://localhost:8888/test_visualization.html"
	@echo "📄 HTML Report:        http://localhost:8888/test_report.html"
	@echo ""
	@echo "Press Ctrl+C to stop the server"
	@echo ""
	@cd backend/tests/reports && python3 -m http.server 8888

# View test reports by opening file directly
test-reports-open:
	@echo "Opening test visualization..."
	@if [ -f backend/tests/reports/test_visualization.html ]; then \
		open backend/tests/reports/test_visualization.html || xdg-open backend/tests/reports/test_visualization.html; \
	else \
		echo "❌ No test reports found. Run 'make test' first."; \
	fi

# Clean up containers
clean:
	@echo "Removing containers..."
	cd backend && docker-compose down
	@echo "✓ Cleanup complete"

# Clean up everything (containers, volumes, images)
clean-all:
	@echo "⚠️  WARNING: This will remove all containers, volumes, and images!"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		cd backend && docker-compose down -v --rmi all; \
		echo "✓ Complete cleanup done"; \
	else \
		echo "Cancelled"; \
	fi

# Quick start (build and run)
start: build up
	@echo ""
	@echo "✓ Backend is ready!"
	@echo "Access the API at: http://localhost:8000"
	@echo "View API docs at: http://localhost:8000/docs"

# Development mode (rebuild and start with logs)
dev: rebuild up-logs