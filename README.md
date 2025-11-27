# CV Auto-Fill Assistant

A Chrome extension that automatically fills job application forms using your CV data and AI-powered agents. Built with Manifest V3 and a FastAPI backend for enhanced performance and centralized processing.

## Features

- **PDF CV Upload**: Upload your CV in PDF format
- **Intelligent Parsing**: Extracts structured data from your CV using LLM APIs
- **Smart Form Detection**: Automatically detects fillable fields on job application pages
- **Two-Agent System**:
  - **Agent 1 (Field Analyzer)**: Analyzes each form field and determines the best filling strategy
  - **Agent 2 (Content Generator)**: Generates tailored content based on your CV and job context
- **Context-Aware**: Extracts job title, company name, and job description from pages
- **Framework-Compatible**: Works with React, Vue, Angular, and vanilla JavaScript forms
- **Backend API**: FastAPI server with Redis caching for optimal performance
- **Multi-Provider Support**: OpenAI, Anthropic (Claude), and Groq models

## Architecture

```
System Overview:
┌─────────────────────────────────────────────────────────┐
│                    Chrome Extension                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Popup UI   │  │   Content    │  │  Background  │  │
│  │ (Configure)  │  │   Script     │  │Service Worker│  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼ HTTP API Calls
┌─────────────────────────────────────────────────────────┐
│                  Backend API (FastAPI)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   CV Parser  │  │Field Analyzer│  │   Content    │  │
│  │   Service    │  │   Service    │  │  Generator   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │            Redis Cache (CV Data & Results)       │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼ API Calls
                  ┌─────────────────┐
                  │  LLM Providers  │
                  │  (OpenAI/       │
                  │  Anthropic/Groq)│
                  └─────────────────┘

AI Agent Workflow:
1. User uploads CV → Backend extracts text (PDF.js)
2. CV Parser (LLM) → Structured JSON data → Cached in Redis
3. Form Detector (Extension) → Identifies fillable fields
4. Field Analyzer Agent (Backend) → Determines fill strategy
5. Content Generator Agent (Backend) → Creates appropriate content
6. Form Filler (Extension) → Populates fields with proper events
```

## Installation

### Prerequisites

- **Google Chrome** (version 88 or higher)
- **Docker Desktop** (for backend) OR **Python 3.11+** with **Redis** (alternative)
- **LLM API Key** from one of:
  - [OpenAI](https://platform.openai.com/api-keys) (GPT-4)
  - [Anthropic](https://console.anthropic.com/) (Claude)
  - [Groq](https://console.groq.com/) (Llama)

### Quick Start (Recommended)

The fastest way to get started using Docker and the provided Makefile.

#### Step 1: Set Up Backend

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd cv-autofill-extension
   ```

2. **Configure environment:**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env if needed (defaults work for local development)
   cd ..
   ```

3. **Start backend services:**
   ```bash
   make up
   ```

   This will:
   - Start Redis container (port 6379)
   - Start FastAPI backend (port 8000)
   - API available at: http://localhost:8000
   - API docs at: http://localhost:8000/docs

4. **Verify backend is running:**
   ```bash
   make status
   ```

   Or visit http://localhost:8000 in your browser.

#### Step 2: Set Up Chrome Extension

1. **Generate extension icons** (first-time only):
   - Open `icons/create-icons.html` in your browser
   - Right-click each canvas and save as PNG:
     - Save first as `icon16.png`
     - Save second as `icon48.png`
     - Save third as `icon128.png`
   - Save all files in the `icons/` folder

2. **Load extension in Chrome:**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right)
   - Click "Load unpacked"
   - Select the `cv-autofill-extension` folder
   - Extension icon appears in toolbar

3. **Configure the extension:**
   - Click the extension icon
   - Select your preferred LLM provider (OpenAI/Anthropic/Groq)
   - Enter your API key
   - Click "Save API Key"
   - You should see "API key saved successfully"

4. **Upload your CV:**
   - Click "Click to upload your CV (PDF only)"
   - Select your CV PDF file (max 10MB)
   - Wait for processing (10-30 seconds)
   - CV summary will appear when complete

#### Step 3: Start Using

1. Navigate to any job application form
2. Click the extension icon
3. Click "Fill Current Form"
4. Review and submit your application

### Alternative Setup (Without Docker)

If you prefer not to use Docker, you can run the backend directly.

#### Backend Setup (No Docker)

1. **Install system dependencies:**
   ```bash
   # macOS
   brew install python@3.11 redis
   brew services start redis

   # Ubuntu/Debian
   sudo apt-get install python3.11 redis-server
   sudo systemctl start redis
   ```

2. **Set up Python environment:**
   ```bash
   cd backend
   python3.11 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env if Redis is not on localhost:6379
   ```

4. **Start the backend:**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

5. **Verify it's running:**
   Visit http://localhost:8000 - you should see the API info.

Then follow **Step 2** and **Step 3** from the Quick Start guide above.

### Production Deployment (Optional)

For deploying the backend to production, see detailed deployment guides:

#### Deploy to Railway

```bash
cd backend
railway login
railway init
railway add --plugin redis
railway up
```

See [backend/README.md](backend/README.md) for detailed Railway setup.

#### Deploy to Render

1. Connect your GitHub repository to Render
2. Render will auto-detect `render.yaml`
3. Set environment variables in dashboard
4. Deploy automatically from main branch

See [backend/README.md](backend/README.md) for detailed Render setup.

#### Deploy to Fly.io

```bash
cd backend
fly auth login
fly launch
fly postgres create
fly redis create
fly deploy
```

See [backend/README.md](backend/README.md) for detailed Fly.io setup.

After deploying, update the backend URL in the extension:
1. Edit `config/config.js`
2. Change `BACKEND_URL: "http://localhost:8000"` to your production URL
3. Reload the extension in Chrome

## Usage

### Basic Workflow

1. **Navigate to a Job Application Page**
   - Open any job application form in Chrome
   - Make sure the form is visible on the page

2. **Click "Fill Current Form"**
   - Click the extension icon
   - Press the "Fill Current Form" button
   - The extension will:
     - Detect all form fields
     - Analyze each field
     - Generate appropriate content
     - Fill the form automatically

3. **Review and Submit**
   - Review all filled fields
   - Make any necessary adjustments
   - Submit your application

### Tips for Best Results

- **CV Quality**: Use a well-structured PDF CV with clear sections
- **Field Labels**: Forms with clear labels work better
- **Job Context**: The extension works best when job title/company are visible on the page
- **Manual Review**: Always review generated content before submitting

## Configuration

### Backend Configuration

The backend URL is configured in `config/config.js`:

```javascript
export const CONFIG = {
  USE_BACKEND: true,  // Set to false for direct API calls
  BACKEND_URL: "http://localhost:8000",  // Change for production
  BACKEND_API_BASE: "/api/v1",
  // ...
};
```

**For Production:**
1. Deploy backend (see Production Deployment above)
2. Edit `config/config.js` and update `BACKEND_URL`
3. Reload extension in Chrome

### LLM Provider Selection

The extension supports three LLM providers:

1. **OpenAI (GPT-4)**
   - Model: `gpt-4-turbo-preview`
   - Best for: General use, highest accuracy
   - Cost: ~$0.02-0.05 per application

2. **Anthropic (Claude)**
   - Model: `claude-3-5-sonnet-20241022`
   - Best for: Natural language, creative content
   - Cost: Similar to GPT-4

3. **Groq (Llama)**
   - Model: `llama-3.3-70b-versatile`
   - Best for: Fast responses, lower cost
   - Cost: Significantly cheaper

To change provider:
1. Open extension popup
2. Select provider from dropdown
3. Enter corresponding API key
4. Click "Save API Key"

### Changing API Key

1. Open extension popup
2. Select LLM provider
3. Enter new API key
4. Click "Save API Key"

### Updating CV Data

1. Open extension popup
2. Upload new CV PDF
3. Previous CV data will be replaced
4. Backend cache will be updated

### Clearing All Data

1. Open extension popup
2. Click "Clear All Data"
3. Confirm the action
4. All stored data (API key, CV data) will be deleted
5. Backend cache will be cleared

### Backend Management (Docker)

Using the provided Makefile:

```bash
# Start backend
make up

# Stop backend
make down

# View logs
make logs

# Check status
make status

# Restart services
make restart

# Clear all data and reset
make clean
```

For more backend commands, run `make help`.

## Technical Details

### Project Structure

```
cv-autofill-extension/
├── manifest.json                 # Extension manifest (V3)
├── Makefile                      # Docker/backend commands
├── CLAUDE.md                     # Development guide
├── popup/                        # Extension UI (React/TypeScript)
│   ├── src/                      # React components
│   ├── dist/                     # Built files
│   └── package.json
├── content/
│   ├── content.js               # Main orchestrator
│   └── form-detector.js         # Form field detection
├── background/
│   └── service-worker.js        # Background processing
├── core/
│   ├── api-client.js            # Backend API client
│   ├── field-analyzer-agent.js  # Agent 1 (fallback)
│   ├── content-generator-agent.js # Agent 2 (fallback)
│   ├── llm-client.js            # Direct LLM API wrapper
│   └── storage-manager.js       # Chrome storage helper
├── config/
│   └── config.js                # Configuration (USE_BACKEND flag)
├── backend/                      # FastAPI Backend
│   ├── app/
│   │   ├── main.py              # FastAPI application
│   │   ├── api/                 # API route handlers
│   │   │   ├── cv.py            # CV management
│   │   │   └── agents.py        # AI agent endpoints
│   │   ├── services/            # Business logic
│   │   │   ├── llm_service.py   # LLM API calls
│   │   │   ├── pdf_service.py   # PDF processing
│   │   │   ├── field_analyzer_service.py
│   │   │   └── content_generator_service.py
│   │   └── core/
│   │       ├── config.py        # Backend config
│   │       └── redis_client.py  # Redis connection
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── docker-compose.yml       # Redis + FastAPI
│   ├── railway.json             # Railway deployment
│   └── render.yaml              # Render deployment
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

### Key Technologies

**Frontend (Extension):**
- **Manifest V3**: Latest Chrome extension standard
- **React + TypeScript**: Modern popup UI
- **ES6 Modules**: JavaScript module system
- **Chrome Storage API**: Local data persistence

**Backend (API):**
- **FastAPI**: Modern Python web framework
- **Redis**: Caching layer for CV data and results
- **PyMuPDF/PyPDF2**: PDF text extraction
- **Docker**: Containerization for easy deployment

**AI/LLM:**
- **OpenAI GPT-4**: `gpt-4-turbo-preview`
- **Anthropic Claude**: `claude-3-5-sonnet-20241022`
- **Groq Llama**: `llama-3.3-70b-versatile`

### API Usage

The system uses LLM APIs with the following settings:

- **Temperature**:
  - 0.2 for CV parsing (structured output)
  - 0.3 for field analysis (consistent decisions)
  - 0.7 for content generation (creative but accurate)
- **Max Tokens**: 2000 per request
- **Retry Logic**: 3 attempts with exponential backoff
- **Timeout**: 30 seconds per API call

### Data Storage

**Extension Side:**
- **Chrome Storage**: API keys, user preferences
- **Local State**: Current session data
- **No PII**: CV data stored in backend Redis

**Backend Side:**
- **Redis Cache**:
  - CV data with 24-hour TTL
  - Session-based storage (no permanent DB)
  - Automatic expiration
  - No authentication required (personal use mode)

### Backend API Endpoints

```
GET  /                          # API info
GET  /health                    # Health check
POST /api/v1/cv/upload          # Upload CV PDF
GET  /api/v1/cv/data           # Get CV data
POST /api/v1/agents/analyze-field     # Analyze single field
POST /api/v1/agents/generate-content  # Generate content
POST /api/v1/agents/analyze-and-generate  # Batch process
```

## Prompts Used by AI Agents

### CV Parser Prompt

The CV Parser uses a detailed prompt to extract structured data:

```
Extract structured information from this CV text and return it as a JSON object.

CV Text:
[USER_CV_TEXT]

Return a JSON object with this exact structure:
{
  "personalInfo": { ... },
  "summary": "...",
  "workExperience": [ ... ],
  "education": [ ... ],
  "skills": { ... },
  "certifications": [ ... ]
}
```

### Field Analyzer Agent Prompt (Agent 1)

Agent 1 analyzes each field to determine the filling strategy:

```
You are a form field analyzer for job applications. Analyze this form field.

FIELD INFORMATION:
- Label: "[FIELD_LABEL]"
- Type: "[FIELD_TYPE]"
- Required: [YES/NO]

JOB CONTEXT:
- Company: [COMPANY_NAME]
- Position: [JOB_TITLE]

Determine how to fill this field. Return JSON:
{
  "fieldType": "personal_info|experience|motivation|...",
  "strategy": "direct_match|generate|skip",
  "cvDataPath": "path.to.data or null",
  "reasoning": "brief explanation",
  "needsJobContext": true/false,
  "priority": "critical|important|optional"
}
```

### Content Generator Agent Prompt (Agent 2)

Agent 2 generates tailored content for each field:

```
You are a job application assistant. Generate appropriate content for this field.

FIELD TO FILL:
- Question/Label: "[FIELD_LABEL]"
- Character Limit: [LIMIT]

JOB INFORMATION:
- Company: [COMPANY]
- Position: [POSITION]

CANDIDATE PROFILE:
[FORMATTED_CV_DATA]

REQUIREMENTS:
1. Generate content that accurately represents the candidate
2. Tailor to the specific job and company
3. Stay within character limit
4. Sound natural and genuine

Return ONLY the text to fill in the field.
```



## Limitations

- **PDF Only**: Only PDF CVs are supported (not Word, images, etc.)
- **English Optimized**: Works best with English CVs and forms
- **Complex Forms**: Some multi-step or JavaScript-heavy forms may have issues
- **API Costs**: Each form fill costs ~$0.01-0.05 depending on complexity
- **Rate Limits**: Subject to OpenAI API rate limits
- **Manual Review Required**: Always review generated content

## Cost Estimation

Typical API costs per operation:

- **CV Parsing**: ~$0.02-0.05 (one-time per CV)
- **Field Analysis**: ~$0.005-0.01 per form
- **Content Generation**: ~$0.01-0.03 per form
- **Total per Application**: ~$0.015-0.04

Example: 50 applications ≈ $0.75-2.00 total cost

## Development

### Code Style

- ES6+ features (async/await, arrow functions, modules)
- Clear, descriptive naming
- Comprehensive error handling
- JSDoc-style comments
- Modular architecture

### Extending the Extension

To add new features:

1. **Add new agent**: Create in `core/` folder
2. **Modify detection**: Update `form-detector.js`
3. **Change UI**: Edit `popup/popup.html` and `popup.css`
4. **Update config**: Modify `config/config.js`

### Testing

Test the extension on various sites:

- LinkedIn Easy Apply
- Indeed applications
- Greenhouse ATS
- Workday forms
- Custom company portals

## Contributing

Suggestions for improvements:

- Support for more CV formats (DOCX, images with OCR)
- Multi-language support
- Form templates for common ATS systems
- Offline mode with cached analyses
- Advanced field mapping editor
- Batch application support

## License

This project is provided as-is for educational and personal use.

## Changelog

### Version 2.0.0 (Current - Backend Architecture)

**New Features:**
- **FastAPI Backend**: Centralized processing with FastAPI server
- **Redis Caching**: CV data cached for 24 hours with automatic expiration
- **Multi-Provider Support**: OpenAI, Anthropic (Claude), and Groq LLM providers
- **Docker Support**: Easy deployment with Docker and docker-compose
- **Makefile Commands**: Simplified backend management (`make up`, `make down`, etc.)
- **Production Deployment**: Ready-to-deploy configurations for Railway, Render, and Fly.io
- **React UI**: Modern TypeScript/React-based popup interface
- **Session-Based Storage**: No authentication required, session-based CV storage
- **Health Monitoring**: Backend health check and status endpoints

**Architecture Changes:**
- Processing moved from extension to backend for better performance
- Redis replaces Chrome Storage for CV data (still stores API keys locally)
- API client layer in extension for backend communication
- Fallback to direct LLM calls if backend unavailable

**Improvements:**
- Faster form filling with cached analyses
- Better error handling and retry logic
- Comprehensive logging and debugging tools
- Production-ready deployment configurations
- Improved security with CORS and input validation

**Documentation:**
- Complete setup guide for Docker and non-Docker setups
- Production deployment guides for 3 platforms
- Troubleshooting section with backend-specific solutions
- Updated architecture diagrams
- Backend API documentation

### Version 1.0.0 (Initial Release)

- PDF CV upload and parsing
- Two-agent AI system (Field Analyzer + Content Generator)
- Smart form detection
- Automatic form filling
- Context-aware content generation
- Chrome storage integration
- Framework compatibility (React, Vue, Angular)
- Direct OpenAI API integration

## Support

For issues or questions:

1. Check this README
2. Review console logs for errors
3. Verify API key and credits
4. Test with simple forms first

## Acknowledgments

- **OpenAI**: GPT-4 API for intelligent parsing and generation
- **Mozilla**: PDF.js library for PDF text extraction
- **Chrome Extensions Team**: Comprehensive documentation and APIs

---

**Made with ❤️ for job seekers**

Happy job hunting! 🚀