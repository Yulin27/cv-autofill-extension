"""
Redis client for caching
"""
import json
import redis.asyncio as redis
from typing import Any, Optional
from app.core.config import settings


class RedisClient:
    """Redis client for caching operations"""

    def __init__(self):
        self.redis: Optional[redis.Redis] = None
        self.ttl = settings.REDIS_CACHE_TTL

    async def connect(self):
        """Initialize Redis connection"""
        self.redis = await redis.from_url(
            settings.REDIS_URL,
            encoding="utf-8",
            decode_responses=True
        )

    async def disconnect(self):
        """Close Redis connection"""
        if self.redis:
            await self.redis.close()

    async def get(self, key: str) -> Optional[Any]:
        """Get value from cache"""
        if not self.redis:
            return None

        try:
            value = await self.redis.get(key)
            if value:
                return json.loads(value)
            return None
        except Exception as e:
            print(f"Redis get error: {e}")
            return None

    async def set(self, key: str, value: Any, ttl: Optional[int] = None) -> bool:
        """Set value in cache with optional TTL"""
        if not self.redis:
            return False

        try:
            serialized = json.dumps(value)
            expire_time = ttl or self.ttl
            await self.redis.setex(key, expire_time, serialized)
            return True
        except Exception as e:
            print(f"Redis set error: {e}")
            return False

    async def delete(self, key: str) -> int:
        """Delete key from cache. Returns number of keys deleted (0 if key didn't exist)"""
        if not self.redis:
            return 0

        try:
            result = await self.redis.delete(key)
            return result  # Returns 0 if key didn't exist, 1 if it was deleted
        except Exception as e:
            print(f"Redis delete error: {e}")
            return 0

    async def exists(self, key: str) -> bool:
        """Check if key exists"""
        if not self.redis:
            return False

        try:
            return await self.redis.exists(key) > 0
        except Exception as e:
            print(f"Redis exists error: {e}")
            return False

    async def clear_pattern(self, pattern: str) -> int:
        """Clear all keys matching pattern"""
        if not self.redis:
            return 0

        try:
            keys = []
            async for key in self.redis.scan_iter(match=pattern):
                keys.append(key)

            if keys:
                return await self.redis.delete(*keys)
            return 0
        except Exception as e:
            print(f"Redis clear_pattern error: {e}")
            return 0


# Global Redis client instance
redis_client = RedisClient()
