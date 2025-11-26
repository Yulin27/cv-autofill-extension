# CV Auto-Fill - No Authentication Setup

This document explains the simplified backend setup without authentication or database, designed for personal use only.

## What Was Removed

### Authentication & User Management
- ❌ User registration and login endpoints (`/auth/register`, `/auth/login`)
- ❌ JWT token generation and verification
- ❌ User authentication middleware
- ❌ User models and database tables
- ❌ Password hashing and security utilities

### Database
- ❌ PostgreSQL database
- ❌ SQLAlchemy ORM models
- ❌ Database migrations
- ❌ User and CV data persistence in database

### What Remains

✅ **Redis** - Used for CV data storage and caching (with 24-hour TTL)
✅ **PDF Parsing** - Extract text from PDF CVs
✅ **CV Parsing** - LLM-powered CV structure parsing
✅ **Field Analysis Agent** - Intelligent form field analysis
✅ **Content Generation Agent** - Generate form field content from CV data
✅ **All core form-filling functionality**

## Architecture Changes

### Before (With Auth)
```
User → Login → JWT Token → API Requests (with Authorization header) → PostgreSQL Database
```

### After (No Auth)
```
User → API Requests (no authentication) → Redis Storage
```

## Quick Start

### 1. Prerequisites
- Docker and Docker Compose
- Redis (automatically started via docker-compose)

### 2. Setup Environment

```bash
cd backend
cp .env.example .env
# Edit .env if needed (defaults work for local development)
```

### 3. Start Backend

```bash
# From project root
make up

# Or directly with docker-compose
cd backend && docker-compose up -d
```

The backend will be available at:
- API: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Redis: localhost:6379

### 4. Verify Backend is Running

```bash
curl http://localhost:8000/health
```

Expected response:
```json
{
  "status": "healthy",
  "environment": "development",
  "redis": "connected"
}
```

## API Endpoints (No Authentication Required)

### CV Management

#### Upload CV
```bash
POST /api/v1/cv/upload
Content-Type: application/json

{
  "filename": "resume.pdf",
  "file_data": "base64_encoded_pdf_data",
  "api_key": "sk-...",
  "llm_provider": "openai"
}
```

#### Get CV Data
```bash
GET /api/v1/cv/data
```

#### Delete CV Data
```bash
DELETE /api/v1/cv/data
```

### AI Agents

#### Batch Analyze and Generate
```bash
POST /api/v1/agents/analyze-and-generate
Content-Type: application/json

{
  "fields": [
    {
      "label": "Full Name",
      "type": "text",
      "placeholder": null,
      "context": null
    }
  ],
  "api_key": "sk-...",
  "provider": "openai",
  "page_context": {
    "company": "Company Name",
    "job_title": "Job Title"
  }
}
```

## Using the Extension with Backend

The Chrome extension can now use the backend API for CV parsing and agent operations:

```javascript
import { APIClient } from './core/api-client.js';

// Create client (no authentication needed)
const client = new APIClient();

// Upload CV
const result = await client.uploadCV(pdfFile, apiKey, provider);

// Get CV data
const cvData = await client.getCVData();

// Batch process fields
const results = await client.analyzeAndGenerateBatch(fields, apiKey, provider, pageContext);
```

## Data Storage

- **Redis** is used for all data storage
- CV data is stored with a 24-hour TTL (Time To Live)
- Data persists as long as Redis is running
- Stopping Redis will clear all data

## Security Considerations

⚠️ **Important Notes for Personal Use:**

1. **No Authentication**: Anyone with access to `http://localhost:8000` can access the API
2. **Local Network Only**: Only expose on localhost, NOT on public internet
3. **API Keys**: LLM API keys are passed per-request, not stored server-side
4. **Single User**: Only one CV can be stored at a time (latest upload replaces previous)

## Troubleshooting

### Redis Connection Error
```bash
# Check if Redis is running
docker ps | grep redis

# Restart Redis
cd backend && docker-compose restart redis
```

### API Not Responding
```bash
# Check logs
cd backend && docker-compose logs -f api

# Restart API
cd backend && docker-compose restart api
```

### Clear All Data
```bash
# Stop and remove all containers and volumes
cd backend && docker-compose down -v

# Start fresh
cd backend && docker-compose up -d
```

## Development

### Stop Backend
```bash
make down
# or
cd backend && docker-compose down
```

### View Logs
```bash
make logs
# or
cd backend && docker-compose logs -f
```

### Rebuild After Code Changes
```bash
make rebuild
# or
cd backend && docker-compose build --no-cache && docker-compose up -d
```

## Migration Path

If you previously used the authenticated version:

1. ✅ Old CV data in database is NOT migrated (starts fresh)
2. ✅ No need to create user accounts
3. ✅ Extension still works but connects to simplified backend
4. ✅ All form-filling features remain functional

## Files Modified

Backend:
- `backend/app/main.py` - Removed auth router, database setup
- `backend/app/api/cv.py` - Removed user authentication dependency
- `backend/app/api/agents.py` - Removed user authentication dependency
- `backend/app/core/config.py` - Removed JWT and database settings
- `backend/docker-compose.yml` - Removed PostgreSQL service
- `backend/.env.example` - Simplified configuration

Frontend:
- `core/api-client.js` - Removed authentication methods

## Frequently Asked Questions

**Q: Can I still use multiple LLM providers?**
A: Yes! Pass the provider and API key in each request.

**Q: Will my CV data persist after restarting Docker?**
A: Yes, Redis data is stored in a Docker volume and persists between restarts (unless you use `docker-compose down -v`).

**Q: Can I use this on a remote server?**
A: Not recommended for security reasons. This setup has no authentication and should only be used locally.

**Q: How do I backup my CV data?**
A: Use `redis-cli` to export data, or simply keep your original PDF file.

---

**For more information, see:**
- Main README: [../README.md](../README.md)
- API Documentation: http://localhost:8000/docs (when backend is running)
- Docker Commands: Run `make help` in project root