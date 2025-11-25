# CV Auto-Fill Extension - Architecture Diagram

## New Backend-Powered Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Chrome Extension (Client)                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────────────┐   │
│  │   Popup UI   │     │   Content    │     │   Background Worker  │   │
│  │              │     │   Script     │     │   (Message Router)   │   │
│  │ - Auth       │     │              │     │                      │   │
│  │ - CV Upload  │     │ - Form       │     │ - Message handling   │   │
│  │ - Settings   │     │   Detection  │     │ - Simple routing     │   │
│  │              │     │ - Field      │     │                      │   │
│  └──────┬───────┘     │   Filling    │     └──────────────────────┘   │
│         │             └──────┬───────┘                                  │
│         │                    │                                          │
│         └────────┬───────────┘                                          │
│                  │                                                       │
│         ┌────────▼───────────┐                                          │
│         │    API Client      │                                          │
│         │                    │                                          │
│         │ - Auth APIs        │                                          │
│         │ - CV APIs          │                                          │
│         │ - Agent APIs       │                                          │
│         └────────┬───────────┘                                          │
│                  │                                                       │
│         ┌────────▼───────────┐                                          │
│         │  chrome.storage    │                                          │
│         │                    │                                          │
│         │ - JWT Token        │                                          │
│         │ - User Data        │                                          │
│         │ - CV Cache         │                                          │
│         └────────────────────┘                                          │
│                                                                           │
└───────────────────────────┬───────────────────────────────────────────┘
                            │
                            │ HTTPS/REST API
                            │
┌───────────────────────────▼───────────────────────────────────────────┐
│                     FastAPI Backend (Server)                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                      API Layer (FastAPI)                         │   │
│  ├─────────────────────────────────────────────────────────────────┤   │
│  │                                                                   │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────────────┐  │   │
│  │  │  Auth Routes │  │   CV Routes  │  │    Agent Routes     │  │   │
│  │  │              │  │              │  │                     │  │   │
│  │  │ /register    │  │ /upload      │  │ /analyze-field     │  │   │
│  │  │ /login       │  │ /data        │  │ /generate-content  │  │   │
│  │  │ /me          │  │ /delete      │  │ /batch             │  │   │
│  │  └──────┬───────┘  └──────┬───────┘  └─────────┬───────────┘  │   │
│  │         │                  │                    │              │   │
│  └─────────┼──────────────────┼────────────────────┼──────────────┘   │
│            │                  │                    │                    │
│  ┌─────────▼──────────────────▼────────────────────▼──────────────┐   │
│  │                     Services Layer                              │   │
│  ├─────────────────────────────────────────────────────────────────┤   │
│  │                                                                   │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐ │   │
│  │  │ LLM Service  │  │ PDF Service  │  │   Field Analyzer    │ │   │
│  │  │              │  │              │  │   (Agent 1)         │ │   │
│  │  │ - OpenAI     │  │ - pdfplumber │  │                     │ │   │
│  │  │ - Anthropic  │  │ - Text       │  │ - Strategy          │ │   │
│  │  │ - Groq       │  │   Extraction │  │   Detection         │ │   │
│  │  └──────────────┘  └──────────────┘  └──────────────────────┘ │   │
│  │                                                                   │   │
│  │  ┌─────────────────────────────┐                                │   │
│  │  │   Content Generator         │                                │   │
│  │  │   (Agent 2)                 │                                │   │
│  │  │                             │                                │   │
│  │  │ - CV Extraction             │                                │   │
│  │  │ - Content Generation        │                                │   │
│  │  │ - Consistency Tracking      │                                │   │
│  │  └─────────────────────────────┘                                │   │
│  │                                                                   │   │
│  └───────────────────────┬───────────────────────────────────────────   │
│                          │                                               │
│  ┌───────────────────────▼───────────────────────────────────────┐     │
│  │                     Core Layer                                  │     │
│  ├─────────────────────────────────────────────────────────────────┤   │
│  │                                                                   │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐ │   │
│  │  │  Security    │  │   Config     │  │    Database          │ │   │
│  │  │              │  │              │  │    Connection        │ │   │
│  │  │ - JWT        │  │ - Settings   │  │                     │ │   │
│  │  │ - Hashing    │  │ - Env Vars   │  │ - SQLAlchemy ORM   │ │   │
│  │  │ - Auth       │  │ - Validation │  │ - Connection Pool  │ │   │
│  │  └──────────────┘  └──────────────┘  └──────────┬───────────┘ │   │
│  │                                                   │              │   │
│  │  ┌──────────────────────────────────────────────▼───────────┐ │   │
│  │  │                 Redis Client                              │ │   │
│  │  │                                                            │ │   │
│  │  │ - CV Data Cache                                           │ │   │
│  │  │ - Analysis Cache                                          │ │   │
│  │  │ - Session Management                                      │ │   │
│  │  └────────────────────────────────────────────────────────────┘ │   │
│  │                                                                   │   │
│  └───────────────────────────────────────────────────────────────────   │
│                          │                     │                         │
└──────────────────────────┼─────────────────────┼─────────────────────┘
                           │                     │
              ┌────────────▼─────────┐  ┌────────▼────────┐
              │                      │  │                 │
              │   PostgreSQL DB      │  │   Redis Cache   │
              │                      │  │                 │
              │ ┌─────────────────┐ │  │ ┌─────────────┐ │
              │ │  users          │ │  │ │  cv_data    │ │
              │ │  - id           │ │  │ │  - TTL: 1h  │ │
              │ │  - email        │ │  │ │             │ │
              │ │  - password     │ │  │ │  analyses   │ │
              │ │  - ...          │ │  │ │  - TTL: 1h  │ │
              │ └─────────────────┘ │  │ └─────────────┘ │
              │                      │  │                 │
              │ ┌─────────────────┐ │  │                 │
              │ │  cv_data        │ │  │                 │
              │ │  - id           │ │  │                 │
              │ │  - user_id      │ │  │                 │
              │ │  - raw_text     │ │  │                 │
              │ │  - structured   │ │  │                 │
              │ │  - ...          │ │  │                 │
              │ └─────────────────┘ │  │                 │
              │                      │  │                 │
              └──────────────────────┘  └─────────────────┘
```

## Data Flow Examples

### 1. User Registration & CV Upload Flow

```
┌──────────┐                                              ┌──────────┐
│  User    │                                              │ Backend  │
└────┬─────┘                                              └────┬─────┘
     │                                                          │
     │ 1. Enter email, password                                │
     ├─────────────────────────────────────────────────────────►
     │        POST /api/v1/auth/register                       │
     │                                                          │
     │ 2. User created, JWT returned                           │
     ◄─────────────────────────────────────────────────────────┤
     │        { access_token: "eyJ..." }                       │
     │                                                          │
     │ 3. Store token in chrome.storage                        │
     │                                                          │
     │ 4. Upload PDF CV with API key                           │
     ├─────────────────────────────────────────────────────────►
     │        POST /api/v1/cv/upload                           │
     │        { file_data: base64, api_key, provider }         │
     │                                                          │
     │                                   ┌───────────────────┐ │
     │                                   │ 5. Extract text   │ │
     │                                   │    from PDF       │ │
     │                                   └───────────────────┘ │
     │                                   ┌───────────────────┐ │
     │                                   │ 6. Parse with LLM │ │
     │                                   │    (OpenAI/etc)   │ │
     │                                   └───────────────────┘ │
     │                                   ┌───────────────────┐ │
     │                                   │ 7. Save to DB     │ │
     │                                   │    & Redis        │ │
     │                                   └───────────────────┘ │
     │                                                          │
     │ 8. CV data returned                                     │
     ◄─────────────────────────────────────────────────────────┤
     │        { success: true, cv_data: {...} }                │
     │                                                          │
     │ 9. Cache locally                                         │
     │                                                          │
```

### 2. Form Filling Flow

```
┌──────────┐              ┌──────────────┐              ┌──────────┐
│  User    │              │  Extension   │              │ Backend  │
└────┬─────┘              └───────┬──────┘              └────┬─────┘
     │                            │                          │
     │ 1. Navigate to job form    │                          │
     │───────────────────────────►│                          │
     │                            │                          │
     │                            │ 2. Detect form fields    │
     │                            │                          │
     │ 3. Click "Fill Form"       │                          │
     │───────────────────────────►│                          │
     │                            │                          │
     │                            │ 4. Get cached CV data    │
     │                            │    (or fetch from API)   │
     │                            │                          │
     │                            │ 5. Batch analyze fields  │
     │                            ├─────────────────────────►│
     │                            │   POST /agents/analyze-  │
     │                            │   and-generate           │
     │                            │                          │
     │                            │      ┌─────────────────┐ │
     │                            │      │ 6. Check Redis  │ │
     │                            │      │    cache        │ │
     │                            │      └─────────────────┘ │
     │                            │      ┌─────────────────┐ │
     │                            │      │ 7. Analyze each │ │
     │                            │      │    field with   │ │
     │                            │      │    Agent 1      │ │
     │                            │      └─────────────────┘ │
     │                            │      ┌─────────────────┐ │
     │                            │      │ 8. Generate     │ │
     │                            │      │    content with │ │
     │                            │      │    Agent 2      │ │
     │                            │      └─────────────────┘ │
     │                            │                          │
     │                            │ 9. Results returned      │
     │                            │◄─────────────────────────┤
     │                            │   { results: [...] }     │
     │                            │                          │
     │                            │ 10. Fill each field      │
     │                            │     with content         │
     │                            │                          │
     │ 11. Form filled!           │                          │
     │◄───────────────────────────┤                          │
     │                            │                          │
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Cloud Platform                            │
│                   (Railway / Render / Fly.io)                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                  Load Balancer (HTTPS)                     │  │
│  └─────────────────────────┬─────────────────────────────────┘  │
│                            │                                     │
│  ┌─────────────────────────▼─────────────────────────────────┐  │
│  │              FastAPI Application Instances                 │  │
│  │                                                             │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │  │
│  │  │  Instance 1  │  │  Instance 2  │  │  Instance N  │   │  │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   │  │
│  └─────────┼──────────────────┼──────────────────┼───────────┘  │
│            │                  │                  │               │
│  ┌─────────▼──────────────────▼──────────────────▼───────────┐  │
│  │              Managed PostgreSQL Database                   │  │
│  │                                                             │  │
│  │  - Automatic backups                                       │  │
│  │  - High availability                                       │  │
│  │  - Connection pooling                                      │  │
│  └─────────────────────────────────────────────────────────────  │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                  Managed Redis Cache                        │  │
│  │                                                             │  │
│  │  - In-memory caching                                       │  │
│  │  - LRU eviction policy                                     │  │
│  │  - Session management                                      │  │
│  └─────────────────────────────────────────────────────────────  │
│                                                                   │
└───────────────────────────────────────────────────────────────┘
                            ▲
                            │
                            │ HTTPS/REST API
                            │
                    ┌───────┴────────┐
                    │                │
            ┌───────▼──────┐  ┌──────▼────────┐
            │   Chrome     │  │    Chrome     │
            │   Extension  │  │   Extension   │
            │   (User 1)   │  │   (User N)    │
            └──────────────┘  └───────────────┘
```

## Security Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                        Security Layers                          │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Layer 1: Transport Security                                    │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ - HTTPS/TLS encryption                                      ││
│  │ - Certificate validation                                    ││
│  │ - Secure WebSocket (if needed)                             ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
│  Layer 2: Authentication & Authorization                        │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ - JWT tokens (HS256)                                       ││
│  │ - Token expiration (30 min)                                ││
│  │ - Password hashing (bcrypt)                                ││
│  │ - User session management                                  ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
│  Layer 3: API Security                                          │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ - CORS protection                                          ││
│  │ - Rate limiting (optional)                                 ││
│  │ - Input validation (Pydantic)                              ││
│  │ - SQL injection prevention (SQLAlchemy ORM)                ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
│  Layer 4: Data Security                                         │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ - Database encryption at rest                              ││
│  │ - API keys never logged                                    ││
│  │ - User data isolation (user_id foreign keys)               ││
│  │ - Sensitive data sanitization                              ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
│  Layer 5: Extension Security                                    │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ - chrome.storage encryption (by Chrome)                    ││
│  │ - Content Security Policy                                  ││
│  │ - Minimal permissions                                      ││
│  │ - Sandboxed content scripts                                ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
└────────────────────────────────────────────────────────────────┘
```

## Performance Optimizations

```
┌────────────────────────────────────────────────────────────────┐
│                   Performance Strategy                          │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Caching Strategy                                            │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ Redis Cache:                                                ││
│  │ - CV data: 1 hour TTL                                      ││
│  │ - Field analyses: 1 hour TTL                               ││
│  │ - LRU eviction policy                                      ││
│  │                                                            ││
│  │ Extension Local Cache:                                     ││
│  │ - CV data: Until logout                                   ││
│  │ - User data: Until logout                                 ││
│  │ - Recent analyses: 5 minutes                              ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
│  2. Database Optimization                                       │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ - Connection pooling (5-10 connections)                    ││
│  │ - Indexed columns (user_id, email, created_at)             ││
│  │ - Efficient queries (SQLAlchemy ORM)                       ││
│  │ - JSON column for flexible CV data                         ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
│  3. API Optimization                                            │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ - Async/await (Python asyncio)                             ││
│  │ - Batch endpoints (1 call vs N calls)                      ││
│  │ - Gzip compression                                         ││
│  │ - Minimal payload sizes                                    ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
│  4. LLM Call Optimization                                       │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ - Cache identical analyses                                 ││
│  │ - Batch processing (analyze multiple fields at once)       ││
│  │ - Appropriate temperatures (low for analysis, high for gen)││
│  │ - Token limits based on field size                         ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
└────────────────────────────────────────────────────────────────┘
```

## Monitoring & Observability

```
┌────────────────────────────────────────────────────────────────┐
│                      Monitoring Stack                           │
├────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Application Metrics                                            │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ - Request rate                                             ││
│  │ - Response times                                           ││
│  │ - Error rates                                              ││
│  │ - API endpoint usage                                       ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
│  Infrastructure Metrics                                         │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ - CPU usage                                                ││
│  │ - Memory usage                                             ││
│  │ - Database connections                                     ││
│  │ - Redis hit/miss rate                                      ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
│  Business Metrics                                               │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ - User registrations                                       ││
│  │ - CV uploads                                               ││
│  │ - Forms filled                                             ││
│  │ - LLM API costs                                            ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
│  Logging                                                        │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ - Structured logs (JSON)                                   ││
│  │ - Error tracking (Sentry optional)                         ││
│  │ - Request/Response logging                                 ││
│  │ - Audit logs (user actions)                                ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                  │
└────────────────────────────────────────────────────────────────┘
```

## Technology Stack Summary

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Database**: PostgreSQL 15
- **Cache**: Redis 7
- **ORM**: SQLAlchemy 2.0
- **Validation**: Pydantic 2.0
- **Authentication**: JWT (python-jose)
- **Password**: bcrypt
- **PDF**: pdfplumber
- **LLM**: OpenAI, Anthropic, Groq APIs

### Extension
- **Manifest**: V3
- **UI**: HTML/CSS/JavaScript
- **API Client**: Fetch API
- **Storage**: chrome.storage.local
- **Form Detection**: DOM queries
- **Event Handling**: Native JavaScript

### Infrastructure
- **Containers**: Docker
- **Orchestration**: docker-compose
- **Deployment**: Railway / Render / Fly.io
- **CI/CD**: Git-based auto-deploy

### Development
- **API Docs**: OpenAPI/Swagger (FastAPI automatic)
- **Testing**: pytest, httpx
- **Code Quality**: Type hints, async/await
- **Environment**: python-dotenv

This architecture provides a scalable, secure, and performant foundation for the CV Auto-Fill extension!
