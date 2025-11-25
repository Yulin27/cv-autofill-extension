# CV Auto-Fill Extension - Backend Refactoring Guide

## Overview

This guide explains the refactoring from a fully client-side Chrome extension to a backend-powered architecture using Python/FastAPI, PostgreSQL, and Redis.

## Architecture Changes

### Before (Client-Side Only)
```
Chrome Extension
├── Popup (UI)
├── Content Script (Form Detection & Filling)
├── Background Worker (PDF Parsing, LLM Calls)
└── Chrome Storage (CV Data, API Keys)
```

**Issues:**
- All processing happens in browser
- Large PDFs cause memory issues
- API keys stored in browser storage (less secure)
- No user management
- No data backup

### After (Backend-Powered)
```
Chrome Extension                    FastAPI Backend
├── Popup (UI)                     ├── Authentication (JWT)
├── Content Script                 ├── CV Management
├── API Client ←──────────────────→├── PDF Processing
└── Token Storage                  ├── AI Agents (Field Analysis & Content Gen)
                                    ├── PostgreSQL (User & CV Data)
                                    └── Redis (Caching)
```

**Benefits:**
- Server-side PDF processing (no browser memory limits)
- Secure user authentication
- Data persistence and backup
- API key management options
- Better performance with caching
- Scalable architecture

## New Backend Structure

```
backend/
├── app/
│   ├── api/              # API route handlers
│   │   ├── auth.py       # Registration, login, JWT
│   │   ├── cv.py         # Upload, parse, retrieve CV
│   │   └── agents.py     # Field analysis & content generation
│   ├── core/             # Core functionality
│   │   ├── config.py     # Settings (env variables)
│   │   ├── database.py   # PostgreSQL connection
│   │   ├── redis_client.py  # Redis caching
│   │   └── security.py   # JWT & password hashing
│   ├── models/           # Database models
│   │   ├── user.py       # User model
│   │   └── cv_data.py    # CV data model
│   ├── schemas/          # Pydantic validation schemas
│   │   ├── user.py       # User schemas
│   │   └── cv.py         # CV schemas
│   ├── services/         # Business logic
│   │   ├── llm_service.py    # OpenAI/Anthropic/Groq API calls
│   │   ├── pdf_service.py    # PDF text extraction
│   │   ├── field_analyzer_service.py    # Agent 1
│   │   └── content_generator_service.py # Agent 2
│   └── main.py           # FastAPI application entry point
├── requirements.txt      # Python dependencies
├── Dockerfile           # Container configuration
├── docker-compose.yml   # Local development setup
└── README.md            # Backend documentation
```

## Extension Changes Required

### 1. Add API Client

**New file:** `core/api-client.js`

This class handles all backend communication:
- Authentication (register, login)
- CV management (upload, retrieve, delete)
- AI agents (field analysis, content generation)

### 2. Update Popup (`popup/popup.js`)

**Changes needed:**

```javascript
// OLD: Direct CV parsing
const response = await chrome.runtime.sendMessage({
  action: 'parseCVFromPDF',
  pdfData: Array.from(new Uint8Array(arrayBuffer)),
  apiKey: apiKey,
  provider: provider
});

// NEW: Upload to backend
import { getAuthenticatedClient } from '../core/api-client.js';
const apiClient = await getAuthenticatedClient();
const response = await apiClient.uploadCV(file, apiKey, provider);
```

**Add authentication UI:**
- Login/Register forms
- JWT token storage in chrome.storage
- Auto-login on popup open

### 3. Update Storage Manager (`core/storage-manager.js`)

**Add new methods:**

```javascript
// JWT Token management
static async saveAuthToken(token) {
  await chrome.storage.local.set({ 'authToken': token });
}

static async getAuthToken() {
  const result = await chrome.storage.local.get('authToken');
  return result.authToken || null;
}

static async clearAuthToken() {
  await chrome.storage.local.remove('authToken');
}

// User data
static async saveUserData(userData) {
  await chrome.storage.local.set({ 'userData': userData });
}

static async getUserData() {
  const result = await chrome.storage.local.get('userData');
  return result.userData || null;
}
```

### 4. Update Background Worker (`background/service-worker.js`)

**Option A: Remove heavy processing** (Recommended)
- Remove PDF parsing logic
- Remove CV parsing logic
- Keep only message routing
- Forward CV upload requests to API

```javascript
// OLD: Parse CV in background worker
async function handleParseCVFromPDF(request, sendResponse) {
  const cvText = await extractTextFromPDF(pdfData);
  const cvData = await cvParser.parse(cvText);
  // ...
}

// NEW: Route to backend
async function handleParseCVFromPDF(request, sendResponse) {
  try {
    const apiClient = await getAuthenticatedClient();
    const response = await apiClient.uploadCV(
      request.file,
      request.apiKey,
      request.provider
    );
    sendResponse(response);
  } catch (error) {
    sendResponse({ success: false, error: error.message });
  }
}
```

**Option B: Keep as fallback**
- Keep existing logic for offline mode
- Try backend first, fallback to local processing
- Good for unreliable network conditions

### 5. Update Content Script (`content/content.js`)

**Changes for form filling:**

```javascript
// OLD: Local AI agents
const [{ FieldAnalyzerAgent }, { ContentGeneratorAgent }] = await Promise.all([
  import(chrome.runtime.getURL('core/field-analyzer-agent.js')),
  import(chrome.runtime.getURL('core/content-generator-agent.js'))
]);

// NEW: Backend API calls
import { getAuthenticatedClient } from chrome.runtime.getURL('core/api-client.js');

const apiClient = await getAuthenticatedClient();
const cvData = await apiClient.getCVData();

// Option 1: Batch API call (more efficient)
const batchResults = await apiClient.analyzeAndGenerateBatch(
  fields,
  apiKey,
  provider,
  pageContext
);

// Option 2: Individual calls (more flexible)
for (const field of fields) {
  const analysis = await apiClient.analyzeField(field, cvData, pageContext);
  const content = await apiClient.generateContent(field, analysis, cvData, pageContext);
  // Fill field...
}
```

### 6. Update Manifest (`manifest.json`)

**Add new permissions:**

```json
{
  "permissions": [
    "storage",
    "activeTab",
    "scripting"
  ],
  "host_permissions": [
    "http://localhost:8000/*",        // Development
    "https://your-api-domain.com/*"  // Production
  ]
}
```

**Remove if going full backend:**
```json
{
  "host_permissions": [
    "https://api.openai.com/*",      // Not needed if backend handles LLM
    "https://api.anthropic.com/*",
    "https://cdnjs.cloudflare.com/*" // Not needed if removing PDF.js
  ]
}
```

### 7. Update Config (`config/config.js`)

**Add backend configuration:**

```javascript
export const CONFIG = {
  // Backend API
  API_BASE_URL: 'http://localhost:8000/api/v1', // Change in production
  API_TIMEOUT_MS: 30000,

  // Keep existing configs for UI
  FILL_DELAY_MS: 150,
  HIGHLIGHT_DURATION_MS: 1000,
  MAX_PDF_SIZE_MB: 10,

  // Storage keys
  STORAGE_KEY_AUTH_TOKEN: 'authToken',
  STORAGE_KEY_USER_DATA: 'userData',
  STORAGE_KEY_CV_DATA: 'cvData',      // Can cache from backend
  STORAGE_KEY_LLM_PROVIDER: 'llmProvider',

  // API keys can still be stored for client-side fallback
  STORAGE_KEY_API_KEY: 'openaiApiKey',
  STORAGE_KEY_ANTHROPIC_API_KEY: 'anthropicApiKey',
  STORAGE_KEY_GROQ_API_KEY: 'groqApiKey'
};
```

## Implementation Steps

### Phase 1: Backend Setup (Completed ✓)
1. ✅ Set up Python/FastAPI project structure
2. ✅ Configure PostgreSQL and Redis
3. ✅ Implement authentication (JWT)
4. ✅ Create database models and schemas
5. ✅ Port LLM service
6. ✅ Port PDF parsing service
7. ✅ Port AI agent services
8. ✅ Create API endpoints
9. ✅ Add deployment configs

### Phase 2: Extension Updates (Next Steps)
1. ✅ Create API client (`api-client.js`)
2. ⏳ Update popup with auth UI
3. ⏳ Update storage manager for tokens
4. ⏳ Refactor background worker
5. ⏳ Update content script to use API
6. ⏳ Update manifest permissions
7. ⏳ Test authentication flow
8. ⏳ Test CV upload and parsing
9. ⏳ Test form filling with backend
10. ⏳ Handle offline scenarios

### Phase 3: Deployment
1. Deploy backend to Railway/Render/Fly.io
2. Update extension config with production API URL
3. Test in production environment
4. Submit updated extension to Chrome Web Store

## API Usage Examples

### Authentication Flow

```javascript
import { APIClient } from './core/api-client.js';

// 1. Register
const apiClient = new APIClient();
const user = await apiClient.register({
  email: 'user@example.com',
  password: 'securepassword',
  fullName: 'John Doe',
  llmProvider: 'openai'
});

// 2. Login
const { access_token } = await apiClient.login('user@example.com', 'securepassword');

// 3. Store token
await chrome.storage.local.set({ authToken: access_token });

// 4. Use authenticated client
apiClient.setAuthToken(access_token);
const currentUser = await apiClient.getCurrentUser();
```

### CV Upload Flow

```javascript
import { getAuthenticatedClient } from './core/api-client.js';

// In popup.js
async function handleCVUpload(file, apiKey, provider) {
  const apiClient = await getAuthenticatedClient();

  try {
    const response = await apiClient.uploadCV(file, apiKey, provider);

    if (response.success) {
      console.log('CV uploaded:', response.cv_data);
      console.log('Processing time:', response.processing_time_ms, 'ms');

      // Cache CV data locally for offline access
      await chrome.storage.local.set({
        cvData: response.cv_data,
        cvId: response.cv_id
      });

      return response.cv_data;
    }
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
}
```

### Form Filling Flow

```javascript
import { getAuthenticatedClient } from './core/api-client.js';

// In content.js
async function fillForm(fields, apiKey, provider, pageContext) {
  const apiClient = await getAuthenticatedClient();

  try {
    // Batch process all fields at once
    const response = await apiClient.analyzeAndGenerateBatch(
      fields,
      apiKey,
      provider,
      pageContext
    );

    if (response.success) {
      // Fill each field with generated content
      for (const result of response.results) {
        if (result.content) {
          const field = fields.find(f => f.name === result.field_name);
          fillFieldWithContent(field.element, result.content);
        }
      }
    }
  } catch (error) {
    console.error('Form filling failed:', error);
    // Optionally fallback to local processing
  }
}
```

## Migration Checklist

### For Existing Users
- [ ] Add migration prompt in popup
- [ ] Provide option to export existing CV data
- [ ] One-time import of local CV data to backend
- [ ] Clear local storage after successful migration

### Data Migration Script

```javascript
// In popup.js - run once on update
async function migrateToBackend() {
  // Check if migration needed
  const migrated = await chrome.storage.local.get('migrated');
  if (migrated.migrated) return;

  // Get local CV data
  const { cvData, cvRawText } = await chrome.storage.local.get(['cvData', 'cvRawText']);

  if (!cvData) {
    await chrome.storage.local.set({ migrated: true });
    return;
  }

  // User needs to login/register first
  const token = await chrome.storage.local.get('authToken');
  if (!token.authToken) {
    // Show login prompt
    showMigrationPrompt();
    return;
  }

  // Upload CV data to backend
  // (Implementation depends on whether you want to re-parse or just upload structured data)

  // Mark as migrated
  await chrome.storage.local.set({ migrated: true });
}
```

## Security Considerations

### JWT Token Storage
- Store JWT tokens in `chrome.storage.local` (encrypted by Chrome)
- Set reasonable token expiration (30 minutes recommended)
- Implement token refresh mechanism
- Clear tokens on logout

### API Key Management
Two approaches:

**Approach 1: Client-Side (Current)**
- Users provide API keys in extension
- Keys stored in chrome.storage
- Extension makes LLM calls directly
- Backend only stores CV data

**Approach 2: Server-Side (More Secure)**
- Store encrypted API keys in PostgreSQL
- Backend makes all LLM calls
- Extension never sees API keys
- Better for enterprise/team usage

### CORS Configuration
```python
# In backend/app/main.py
ALLOWED_ORIGINS = [
    "chrome-extension://your-extension-id",  # Production
    "http://localhost:*",                     # Development
]
```

## Performance Optimization

### Caching Strategy
1. **Redis Cache** (Backend):
   - CV data: 1 hour TTL
   - Field analyses: 1 hour TTL
   - User sessions: Token expiration time

2. **Local Cache** (Extension):
   - CV data: Until logout or refresh
   - API responses: 5 minutes for field analyses

### Batch Operations
- Always use `analyzeAndGenerateBatch()` for forms
- Reduces API calls from N*2 to 1 (N fields)
- Faster form filling
- Lower latency

## Testing

### Backend Tests
```bash
cd backend
pytest tests/
```

### Extension Tests
1. **Authentication**: Login, register, token refresh
2. **CV Upload**: Various PDF formats, sizes
3. **Form Filling**: Different websites, form types
4. **Offline Mode**: Graceful degradation
5. **Error Handling**: Network errors, API errors

## Rollback Plan

If issues arise, you can:
1. Keep the old extension version as v1
2. Deploy backend-powered version as v2
3. Allow users to choose version
4. Old code is still in place (not deleted)

## Support & Troubleshooting

### Common Issues

**1. CORS Errors**
- Check `ALLOWED_ORIGINS` in backend config
- Ensure extension ID is whitelisted
- Use proper protocol (http vs https)

**2. Authentication Fails**
- Check token expiration
- Verify SECRET_KEY matches
- Ensure database connection

**3. CV Upload Fails**
- Check file size limits
- Verify PDF is valid
- Check backend logs for errors

**4. Form Filling Slow**
- Use batch operations
- Enable Redis caching
- Check API response times

## Next Steps

1. **Test Backend Locally**:
   ```bash
   cd backend
   docker-compose up
   ```

2. **Update Extension**:
   - Implement authentication UI in popup
   - Replace local CV parsing with API calls
   - Update form filling to use backend

3. **Deploy Backend**:
   - Choose Railway/Render/Fly.io
   - Set environment variables
   - Deploy and test

4. **Update Extension Config**:
   - Point to production API
   - Update manifest with correct domain
   - Test end-to-end

5. **Release**:
   - Update version in manifest
   - Create release notes
   - Submit to Chrome Web Store

## Questions?

Refer to:
- `backend/README.md` - Backend documentation
- `CLAUDE.md` - Original extension architecture
- API docs at `http://localhost:8000/docs` when backend is running
