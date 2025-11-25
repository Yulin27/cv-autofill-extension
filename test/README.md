# Test Suite

This folder contains test files and test data for the CV Auto-Fill Extension.

## Test Files

### 1. test-pdf-extraction.html
Tests the PDF extraction functionality without requiring an API key.

**What it tests:**
- PDF.js library loading
- Text extraction from PDF files
- Performance metrics (extraction time, character count)

**How to run:**
```bash
# Open the test file in your browser
open test-pdf-extraction.html
# OR
# Right-click and choose "Open with" → your browser
```

**Tests available:**
1. **Load PDF.js Library** - Verifies the library loads correctly
2. **Extract Test CV** - Uses the included test CV (Yulin-SHI-CV.pdf)
3. **Upload Custom PDF** - Test with your own PDF file

### 2. test-cv-parsing.html
Tests the complete CV parsing workflow including LLM integration.

**What it tests:**
- PDF text extraction
- LLM API connection
- CV parsing into structured data
- Data visualization

**How to run:**
```bash
# Open the test file in your browser
open test-cv-parsing.html
```

**Requirements:**
- Valid API key (OpenAI or Anthropic)
- Internet connection for API calls

**Steps:**
1. Select API provider (OpenAI or Anthropic)
2. Enter your API key
3. Either:
   - Click "Use Test File" to load Yulin-SHI-CV.pdf
   - Or manually select a PDF file
4. Click "Parse CV" to run the full workflow

**Expected output:**
- Raw extracted text (left panel)
- Structured CV data with formatted sections (right panel)
- Full JSON output at the bottom

## Test Data

### test_data/Yulin-SHI-CV.pdf
Sample CV file used for testing. This is a real-world PDF with:
- Multiple pages
- Various text formatting
- Complete CV structure (personal info, experience, education, skills)

## Running Tests

### Quick Start
```bash
# Navigate to test folder
cd test

# Open PDF extraction test (no API key needed)
open test-pdf-extraction.html

# Open full CV parsing test (requires API key)
open test-cv-parsing.html
```

### What to verify:

#### PDF Extraction Test
✓ PDF.js loads without errors
✓ Text extraction completes successfully
✓ Character count is reasonable (> 1000 characters)
✓ Extracted text is readable and formatted

#### CV Parsing Test
✓ API connection succeeds
✓ Parsing completes in 10-30 seconds
✓ Personal info section is populated
✓ Work experience entries are structured correctly
✓ Education and skills are extracted
✓ JSON output is valid and complete

## Troubleshooting

### "Failed to load PDF.js library"
- Ensure the `lib/` folder contains `pdf.min.js` and `pdf.worker.min.js`
- Check browser console for CORS errors
- Try running a local server: `python -m http.server 8000`

### "API key validation failed"
- Verify your API key is correct
- Check you selected the right provider (OpenAI vs Anthropic)
- Ensure you have API credits available

### "Extracted text is too short"
- The PDF might be image-based (requires OCR)
- Try a different PDF with selectable text
- Check the PDF isn't corrupted

### CORS Errors
If you see CORS errors when opening the HTML files directly:

```bash
# Start a local server
cd /path/to/cv-autofill-extension
python -m http.server 8000

# Then open in browser
# http://localhost:8000/test/test-pdf-extraction.html
# http://localhost:8000/test/test-cv-parsing.html
```

## Adding New Tests

To add a new test:

1. Create a new HTML file in the `test/` folder
2. Import the modules you want to test:
   ```javascript
   import { ModuleName } from '../path/to/module.js';
   ```
3. Add test UI and logic
4. Update this README with test description

## Test Data

Place test PDF files in `test_data/` folder:
- Use real CVs (with permission) for realistic testing
- Include various formats (1 page, multi-page, different layouts)
- Name files descriptively: `Name-CV.pdf`
