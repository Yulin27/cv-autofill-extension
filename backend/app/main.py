"""
Main FastAPI application
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.config import settings
from app.core.database import engine, Base
from app.core.redis_client import redis_client
from app.api import auth, cv, agents


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    # Startup
    print("🚀 Starting CV Auto-Fill API...")

    # Create database tables
    print("📊 Creating database tables...")
    Base.metadata.create_all(bind=engine)

    # Connect to Redis
    print("🔗 Connecting to Redis...")
    try:
        await redis_client.connect()
        print("✓ Redis connected")
    except Exception as e:
        print(f"⚠️  Redis connection failed: {e}")
        print("   Caching will be disabled")

    print("✓ Application started successfully")

    yield

    # Shutdown
    print("👋 Shutting down...")
    await redis_client.disconnect()
    print("✓ Shutdown complete")


# Create FastAPI app
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Backend API for CV Auto-Fill Chrome Extension",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS if isinstance(settings.ALLOWED_ORIGINS, list) else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix=settings.API_V1_PREFIX)
app.include_router(cv.router, prefix=settings.API_V1_PREFIX)
app.include_router(agents.router, prefix=settings.API_V1_PREFIX)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "name": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "status": "online",
        "docs_url": "/docs"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    redis_status = "connected" if redis_client.redis else "disconnected"

    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
        "redis": redis_status
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG
    )
