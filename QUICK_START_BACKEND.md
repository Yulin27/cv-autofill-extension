# Quick Start - Backend Setup

## Get Backend Running in 5 Minutes

### Option 1: Docker (Recommended)

```bash
# 1. Navigate to backend
cd backend

# 2. Copy environment template
cp .env.example .env

# 3. Start everything
docker-compose up -d

# 4. Verify it's running
curl http://localhost:8000/health

# ✅ Done!
# - API: http://localhost:8000
# - Docs: http://localhost:8000/docs
```

### Option 2: Python

```bash
# 1. Install services
brew install postgresql redis  # macOS

# 2. Start services
brew services start postgresql redis

# 3. Create database
createdb cv_autofill

# 4. Install Python packages
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 5. Configure
cp .env.example .env
# Edit .env with your database URL

# 6. Run
python -m app.main

# ✅ Done! API at http://localhost:8000
```

## Test It

```bash
# Register
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","full_name":"Test User"}'

# Login
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Or use interactive docs
open http://localhost:8000/docs
```

## Next Steps

1. See [REFACTORING_GUIDE.md](REFACTORING_GUIDE.md) to update the extension
2. Deploy to Railway/Render (instructions in backend/README.md)
3. Update extension config with production URL

## Quick Commands

```bash
# View logs
docker-compose logs -f api

# Stop
docker-compose down

# Rebuild
docker-compose up -d --build
```

**Need help?** Check backend/README.md for full documentation.
