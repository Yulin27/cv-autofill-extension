#!/bin/bash

# Quick start script for CV Auto-Fill Backend

echo "🚀 Starting CV Auto-Fill Backend..."
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your configuration before continuing!"
    echo "   Required: DATABASE_URL, REDIS_URL, SECRET_KEY"
    echo ""
    exit 1
fi

# Check if docker-compose is available
if command -v docker-compose &> /dev/null; then
    echo "🐳 Starting with Docker Compose..."
    docker-compose up -d

    echo ""
    echo "✅ Backend started successfully!"
    echo ""
    echo "📍 API URL: http://localhost:8000"
    echo "📍 API Docs: http://localhost:8000/docs"
    echo "📍 PostgreSQL: localhost:5432"
    echo "📍 Redis: localhost:6379"
    echo ""
    echo "📊 View logs: docker-compose logs -f api"
    echo "🛑 Stop services: docker-compose down"

else
    echo "⚠️  Docker Compose not found. Starting with Python..."

    # Check if virtual environment exists
    if [ ! -d "venv" ]; then
        echo "📦 Creating virtual environment..."
        python3 -m venv venv
    fi

    # Activate virtual environment
    source venv/bin/activate

    # Install dependencies
    echo "📦 Installing dependencies..."
    pip install -r requirements.txt

    # Start server
    echo "🚀 Starting FastAPI server..."
    python -m app.main
fi
