# CV Auto-Fill Assistant

A Chrome extension that automatically fills job application forms using your CV data and AI-powered agents. Built with Manifest V3, no frameworks, direct OpenAI API integration.

## Features

- **PDF CV Upload**: Upload your CV in PDF format
- **Intelligent Parsing**: Extracts structured data from your CV using GPT-4
- **Smart Form Detection**: Automatically detects fillable fields on job application pages
- **Two-Agent System**:
  - **Agent 1 (Field Analyzer)**: Analyzes each form field and determines the best filling strategy
  - **Agent 2 (Content Generator)**: Generates tailored content based on your CV and job context
- **Context-Aware**: Extracts job title, company name, and job description from pages
- **Framework-Compatible**: Works with React, Vue, Angular, and vanilla JavaScript forms
- **Privacy-First**: All data stored locally in Chrome storage

## Architecture

```
Extension Components:
├── Popup UI (Configuration & Control)
├── Content Script (Form Detection & Filling)
├── Background Service Worker (CV Processing)
└── Core Modules (AI Agents & LLM Client)

AI Agent Workflow:
1. User uploads CV → PDF Parser extracts text
2. CV Parser (LLM) → Structured JSON data
3. Form Detector → Identifies all fillable fields
4. Field Analyzer Agent → Determines fill strategy
5. Content Generator Agent → Creates appropriate content
6. Form Filler → Populates fields with proper events
```

## Installation

### Prerequisites

- Google Chrome (version 88 or higher)
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Setup Instructions

1. **Download/Clone the Extension**
   ```bash
   git clone <repository-url>
   cd cv-autofill-extension
   ```

2. **Generate Icons** (Required for first-time setup)
   - Open `icons/create-icons.html` in your browser
   - Right-click each canvas and save as PNG:
     - Save first as `icon16.png`
     - Save second as `icon48.png`
     - Save third as `icon128.png`
   - Save all three files in the `icons/` folder

3. **Load Extension in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)
   - Click "Load unpacked"
   - Select the `cv-autofill-extension` folder
   - The extension icon should appear in your toolbar

4. **Configure API Key**
   - Click the extension icon in Chrome toolbar
   - Enter your OpenAI API key in the input field
   - Click "Save API Key"
   - You should see "API key saved successfully"

5. **Upload Your CV**
   - Click "Click to upload your CV (PDF only)"
   - Select your CV PDF file (max 10MB)
   - Wait for processing (may take 10-30 seconds)
   - You'll see a CV summary when complete

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

### Changing API Key

1. Open extension popup
2. Enter new API key
3. Click "Save API Key"

### Updating CV Data

1. Open extension popup
2. Upload new CV PDF
3. Previous CV data will be replaced

### Clearing All Data

1. Open extension popup
2. Click "Clear All Data"
3. Confirm the action
4. All stored data (API key, CV data) will be deleted

## Technical Details

### Project Structure

```
cv-autofill-extension/
├── manifest.json                 # Extension manifest (V3)
├── popup/
│   ├── popup.html               # Extension popup UI
│   ├── popup.css                # Popup styling
│   └── popup.js                 # Popup logic
├── content/
│   ├── content.js               # Main orchestrator
│   └── form-detector.js         # Form field detection
├── background/
│   └── service-worker.js        # Background processing
├── core/
│   ├── cv-parser.js             # CV parsing with LLM
│   ├── field-analyzer-agent.js  # Agent 1: Field Analysis
│   ├── content-generator-agent.js # Agent 2: Content Generation
│   ├── llm-client.js            # OpenAI API wrapper
│   └── storage-manager.js       # Chrome storage helper
├── utils/
│   ├── pdf-parser.js            # PDF text extraction
│   └── helpers.js               # Utility functions
├── config/
│   └── config.js                # Configuration settings
└── icons/
    ├── icon16.png               # 16x16 icon
    ├── icon48.png               # 48x48 icon
    └── icon128.png              # 128x128 icon
```

### Key Technologies

- **Manifest V3**: Latest Chrome extension standard
- **OpenAI GPT-4**: For CV parsing and content generation
- **PDF.js**: Mozilla's PDF text extraction library
- **ES6 Modules**: Modern JavaScript module system
- **Chrome Storage API**: Local data persistence

### API Usage

The extension uses OpenAI's API with the following settings:

- **Model**: `gpt-4-turbo-preview`
- **Temperature**:
  - 0.2 for CV parsing (structured output)
  - 0.3 for field analysis (consistent decisions)
  - 0.7 for content generation (creative but accurate)
- **Max Tokens**: 2000 per request
- **Retry Logic**: 3 attempts with exponential backoff

### Data Storage

All data is stored locally using Chrome's Storage API:

- **API Key**: Encrypted by Chrome
- **CV Data**: Structured JSON object
- **Raw CV Text**: Plain text backup
- **Storage Quota**: 10MB (typical Chrome limit)

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

## Troubleshooting

### Common Issues

#### Extension Not Loading
- **Solution**: Check Chrome version (need 88+), reload extension in `chrome://extensions/`

#### API Key Invalid
- **Solution**: Verify key starts with `sk-`, check it's active in OpenAI dashboard

#### CV Upload Fails
- **Solution**:
  - Ensure PDF is under 10MB
  - Check PDF is readable (not scanned image)
  - Try re-saving PDF from another tool

#### No Fields Detected
- **Solution**:
  - Ensure form is visible on page
  - Check browser console for errors
  - Some sites may use custom form frameworks

#### Form Not Filling Correctly
- **Solution**:
  - Review field detection in console logs
  - Some fields may require manual input
  - Check if site uses unusual form implementation

#### Content Generation Errors
- **Solution**:
  - Check API key has sufficient credits
  - Verify internet connection
  - Check OpenAI service status

### Debug Mode

To enable detailed logging:

1. Open Chrome DevTools (F12)
2. Go to Console tab
3. Look for logs from:
   - `CV Auto-Fill content script loaded`
   - Field detection messages
   - API call results

### Getting Help

If you encounter issues:

1. Check browser console for error messages
2. Verify API key is valid and has credits
3. Test with a simple form first
4. Check OpenAI API status page

## Security & Privacy

### Data Handling

- **Local Storage**: All data stored locally, never sent to external servers (except OpenAI API)
- **API Key**: Encrypted by Chrome, never logged or exposed
- **CV Data**: Remains on your device, transmitted only to OpenAI for parsing
- **No Tracking**: Extension does not track usage or send analytics

### API Security

- API key transmitted over HTTPS only
- Requests include proper authentication headers
- Timeout protection (30 seconds)
- Rate limit handling with retry logic

### Best Practices

1. **Never share your API key**
2. **Review generated content** before submitting applications
3. **Keep CV data updated** for accurate information
4. **Clear data** when using shared computers
5. **Monitor API usage** in your OpenAI dashboard

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

### Version 1.0.0 (Initial Release)

- PDF CV upload and parsing
- Two-agent AI system
- Smart form detection
- Automatic form filling
- Context-aware content generation
- Chrome storage integration
- Framework compatibility (React, Vue, Angular)

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