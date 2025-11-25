# Quick Test Guide

## 🚀 Ready to Test!

Local server is running on: **http://localhost:8000**

## Test 1: PDF Extraction (No API Key Needed)

**URL:** http://localhost:8000/test/test-pdf-extraction.html

**Steps:**
1. Click "Load PDF.js" button
   - Should show: ✓ "PDF.js library loaded successfully!"

2. Click "Extract Test CV" button
   - Should extract text from Yulin-SHI-CV.pdf
   - Should show character count (2000+)
   - Should display extracted text

3. Try your own PDF:
   - Click "Choose File" and select any PDF
   - Click "Extract Text"
   - Verify text is extracted

**What this tests:**
- PDF.js loading in browser context
- Text extraction from PDF
- Browser-side functionality

## Test 2: Full CV Parsing (API Key Required)

**URL:** http://localhost:8000/test/test-cv-parsing.html

**Steps:**
1. Select API provider (OpenAI or Anthropic)
2. Enter your API key
3. Click "Use Test File (Yulin-SHI-CV.pdf)" button
4. Click "Parse CV" button
5. Wait 10-30 seconds for AI parsing

**Expected Results:**
- Left panel: Raw extracted text
- Right panel: Structured CV data
  - Personal Information
  - Work Experience
  - Education
  - Skills
- Bottom: Full JSON output

**What this tests:**
- PDF extraction
- LLM API connection
- CV parsing into structured format
- Complete workflow

## Test 3: Chrome Extension (After Tests 1 & 2 Pass)

**Steps:**
1. Go to chrome://extensions/
2. Find "CV Auto-Fill Assistant"
3. Click reload button 🔄
4. Click extension icon to open popup
5. Upload a CV and enter API key
6. Verify no "window is not defined" error

**Check Service Worker Console:**
- chrome://extensions/ → "service worker" link
- Look for: "Loading PDF.js in service worker context..."
- Look for: "PDF.js loaded successfully in service worker"
- Look for: "PDF loaded: X pages"

## Expected Behavior

### ✓ Success Indicators
- No "window is not defined" errors
- PDF.js loads in both browser and service worker contexts
- Text extraction completes successfully
- API connection succeeds
- Structured CV data is properly formatted

### ✗ Failure Indicators
- "window is not defined" → Extension not reloaded or manifest issue
- "Failed to load PDF.js" → Check lib/ folder files
- "API key validation failed" → Check API key and provider
- Empty or short text → PDF might be image-based (needs OCR)

## Quick Commands

```bash
# Check server is running
lsof -i:8000

# Stop server
kill $(lsof -ti:8000)

# Start server again
python3 -m http.server 8000

# Check file sizes
ls -lh lib/*.js

# View service worker logs
# Go to: chrome://extensions/ → "service worker" link
```

## Troubleshooting

**CORS errors?**
- Make sure you're using http://localhost:8000 URLs
- Don't open files directly (file://)

**Server not responding?**
- Check if port 8000 is in use: `lsof -i:8000`
- Try different port: `python3 -m http.server 8001`

**Extension still errors?**
- Clear extension data: chrome://extensions/ → Remove → Re-add
- Check manifest.json was saved correctly
- Verify lib/ folder is in the extension directory

## Next Steps

1. ✓ Local tests pass → Test extension in Chrome
2. ✓ Extension upload works → Test form filling on job sites
3. ✓ All working → Start using the extension!

## Need Help?

Check these files:
- **test/README.md** - Detailed test documentation
- **CLAUDE.md** - Architecture and development guide
- **REFACTORING_GUIDE.md** - Backend migration guide
