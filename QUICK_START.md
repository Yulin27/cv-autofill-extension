# Quick Start Guide

Get your CV Auto-Fill Assistant up and running in 5 minutes!

## Step 1: Generate Icons (2 minutes)

**IMPORTANT**: You must create icons before loading the extension in Chrome.

1. Open `icons/create-icons.html` in your browser
2. Right-click the first canvas → "Save image as..." → Save as `icon16.png`
3. Right-click the second canvas → "Save image as..." → Save as `icon48.png`
4. Right-click the third canvas → "Save image as..." → Save as `icon128.png`
5. Make sure all three PNG files are in the `icons/` folder

## Step 2: Load Extension in Chrome (1 minute)

1. Open Chrome
2. Go to `chrome://extensions/`
3. Enable "Developer mode" (top-right toggle)
4. Click "Load unpacked"
5. Select the `cv-autofill-extension` folder
6. Extension icon appears in toolbar ✓

## Step 3: Configure (2 minutes)

1. **Get OpenAI API Key**:
   - Go to https://platform.openai.com/api-keys
   - Click "Create new secret key"
   - Copy the key (starts with `sk-`)

2. **Set Up Extension**:
   - Click extension icon in Chrome toolbar
   - Paste your API key
   - Click "Save API Key"
   - See "API key saved successfully" ✓

3. **Upload CV**:
   - Click "Click to upload your CV (PDF only)"
   - Select your PDF CV (max 10MB)
   - Wait 10-30 seconds for processing
   - See CV summary appear ✓

## Step 4: Use It! (10 seconds)

1. Go to any job application page
2. Click extension icon
3. Click "Fill Current Form"
4. Watch it fill automatically ✓
5. Review and submit!

## Troubleshooting

### Icons Missing Error
- Make sure you generated all three icon files (icon16.png, icon48.png, icon128.png)
- Check they are in the `icons/` folder
- Reload extension in Chrome

### API Key Error
- Verify key starts with `sk-`
- Check you have credits in OpenAI account
- Try generating a new key

### CV Upload Failed
- Ensure PDF is under 10MB
- Check PDF is text-based (not scanned image)
- Wait longer - processing can take 30 seconds

### No Fields Detected
- Make sure form is visible on page
- Try scrolling to form
- Refresh page and try again

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Test on different job sites
- Review generated content before submitting
- Monitor your OpenAI API usage

## Quick Tips

✓ **Review before submitting** - Always check generated content
✓ **Update CV regularly** - Re-upload when your CV changes
✓ **Start simple** - Test on basic forms first
✓ **Check console** - Open DevTools (F12) to see what's happening
✓ **Monitor costs** - Each application costs ~$0.02-0.04

---

**That's it! You're ready to auto-fill job applications. Good luck! 🚀**