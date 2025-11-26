# CV Auto-Fill Backend Tester

A simple web interface to test your Docker-deployed backend API.

## Features

- Health check endpoint testing
- CV upload and parsing with visual feedback
- API key and provider configuration
- Get and delete CV data
- Beautiful, responsive UI
- Real-time JSON response display

## How to Use

### 1. Start Your Backend

Make sure your backend is running in Docker on `http://localhost:8000` (or update the backend URL in the interface).

```bash
cd backend
docker-compose up -d
```

### 2. Open the Test Frontend

Simply open `index.html` in your web browser:

```bash
open index.html
```

Or drag and drop the file into your browser.

### 3. Test the API

#### Health Check
1. The page automatically checks backend health on load
2. You can manually click "Check Health" to verify connectivity
3. Green indicator = backend online, Red = offline

#### Upload CV
1. Select your LLM provider (OpenAI, Groq, or Anthropic)
2. Enter your API key for the selected provider
3. Click "Click to select PDF file" and choose a PDF CV
4. Click "Upload & Parse CV"
5. View the parsed JSON response in the results area

#### Get CV Data
- Click "Get CV Data" to retrieve previously uploaded CV data

#### Delete CV Data
- Click "Delete CV Data" to remove stored CV data from Redis

## Backend Endpoints Tested

- `GET /health` - Health check
- `POST /api/v1/cv/upload` - Upload and parse CV
- `GET /api/v1/cv/data` - Get stored CV data
- `DELETE /api/v1/cv/data` - Delete CV data

## Configuration

### Backend URL
Change the backend URL if your Docker container runs on a different port or host.

### LLM Providers
- **OpenAI**: Requires OpenAI API key
- **Groq**: Requires Groq API key (default, recommended for vision/OCR)
- **Anthropic**: Requires Anthropic API key

### API Keys
API keys are sent with each request and are not stored in the browser. You'll need to enter them each time you reload the page.

## Troubleshooting

### Backend is offline
- Verify Docker container is running: `docker ps`
- Check backend logs: `docker logs <container-name>`
- Ensure port 8000 is not blocked

### CORS errors
- The backend should have CORS enabled for all origins by default
- If you see CORS errors, check `backend/app/core/config.py` ALLOWED_ORIGINS setting

### Upload fails
- Ensure the file is a valid PDF
- Check that you've entered a valid API key
- Verify the selected LLM provider matches your API key

### No response displayed
- Check browser console (F12) for JavaScript errors
- Verify the backend URL is correct
- Test the health endpoint first

## Technical Details

- Pure HTML/CSS/JavaScript (no frameworks)
- File converted to base64 before upload
- Supports drag-and-drop file selection
- Real-time status updates
- JSON syntax highlighting for responses
