# Dockerfile for CV Auto-Fill API

FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first
COPY requirements.txt .

# Install main dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy test requirements
COPY tests/requirements-test.txt /tmp/requirements-test.txt

# Install test dependencies
RUN pip install --no-cache-dir -r /tmp/requirements-test.txt

# Copy application code
COPY ./app ./app

# Copy entire tests directory
COPY ./tests ./tests

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
