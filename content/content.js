/**
 * Content Script - Main Orchestrator
 * Coordinates form detection, field analysis, content generation, and form filling
 */

// Note: Imports don't work directly in content scripts due to Chrome's restrictions
// We'll use dynamic imports or inject scripts as needed

class AutoFiller {
  constructor() {
    this.isInitialized = false;
    this.formDetector = null;
    this.fieldAnalyzer = null;
    this.contentGenerator = null;
    this.llmClient = null;
  }

  /**
   * Initialize the AutoFiller with required data
   * @returns {Promise<boolean>} - True if successfully initialized
   */
  async initialize() {
    if (this.isInitialized) {
      return true;
    }

    try {
      // Load required modules
      const [
        { FormDetector },
        { FieldAnalyzerAgent },
        { ContentGeneratorAgent },
        { LLMClient },
        { StorageManager },
        { CONFIG }
      ] = await Promise.all([
        import(chrome.runtime.getURL('content/form-detector.js')),
        import(chrome.runtime.getURL('core/field-analyzer-agent.js')),
        import(chrome.runtime.getURL('core/content-generator-agent.js')),
        import(chrome.runtime.getURL('core/llm-client.js')),
        import(chrome.runtime.getURL('core/storage-manager.js')),
        import(chrome.runtime.getURL('config/config.js'))
      ]);

      // Get provider and API key from storage
      const provider = await StorageManager.getLLMProvider();
      let apiKey;
      if (provider === 'anthropic') {
        apiKey = await StorageManager.getAnthropicAPIKey();
      } else if (provider === 'groq') {
        apiKey = await StorageManager.getGroqAPIKey();
      } else {
        apiKey = await StorageManager.getAPIKey();
      }

      if (!apiKey) {
        const providerName = provider === 'anthropic' ? 'Anthropic' : provider === 'groq' ? 'Groq' : 'OpenAI';
        throw new Error(`API key not configured. Please set your ${providerName} API key in the extension popup.`);
      }

      // Initialize LLM client with provider
      this.llmClient = new LLMClient(apiKey, provider);

      // Initialize agents
      this.formDetector = new FormDetector();
      this.fieldAnalyzer = new FieldAnalyzerAgent(this.llmClient);
      this.contentGenerator = new ContentGeneratorAgent(this.llmClient);

      this.isInitialized = true;
      console.log('AutoFiller initialized successfully');
      return true;

    } catch (error) {
      console.error('Failed to initialize AutoFiller:', error);
      throw error;
    }
  }

  /**
   * Main form filling function
   * @returns {Promise<Object>} - Result object with success status and details
   */
  async fillForm() {
    try {
      // Initialize if needed
      await this.initialize();

      console.log('Starting form fill process...');

      // Step 1: Load CV data from storage
      const { StorageManager } = await import(chrome.runtime.getURL('core/storage-manager.js'));
      const cvData = await StorageManager.getCVData();

      if (!cvData) {
        throw new Error('No CV data found. Please upload your CV in the extension popup.');
      }

      // Step 2: Detect form fields
      console.log('Detecting form fields...');
      const fields = this.formDetector.detectFields();

      if (fields.length === 0) {
        throw new Error('No fillable form fields found on this page.');
      }

      console.log(`Found ${fields.length} form fields`);

      // Step 3: Get page context
      const jobContext = this.formDetector.getPageContext();
      console.log('Page context:', jobContext);

      // Step 4: Analyze fields with Agent 1
      console.log('Analyzing fields...');
      const analyses = await this.fieldAnalyzer.analyzeBatch(fields, cvData, jobContext);
      console.log('Field analysis complete');

      // Step 5: Generate content with Agent 2
      console.log('Generating content...');
      const fillData = await this._generateContentForFields(fields, analyses, cvData, jobContext);
      console.log('Content generation complete');

      // Step 6: Fill the form
      console.log('Filling form fields...');
      const fillResults = await this._fillFormFields(fillData);
      console.log('Form filling complete');

      // Return results
      return {
        success: true,
        fieldsDetected: fields.length,
        fieldsAnalyzed: analyses.length,
        fieldsFilled: fillResults.filled,
        fieldsSkipped: fillResults.skipped,
        fieldsFailed: fillResults.failed,
        message: `Successfully filled ${fillResults.filled} out of ${fields.length} fields`
      };

    } catch (error) {
      console.error('Form fill error:', error);
      return {
        success: false,
        error: error.message,
        message: `Form filling failed: ${error.message}`
      };
    }
  }

  /**
   * Generate content for all fields
   * @param {Array} fields - Detected fields
   * @param {Array} analyses - Field analyses
   * @param {Object} cvData - CV data
   * @param {Object} jobContext - Job context
   * @returns {Promise<Array>} - Array of fill data objects
   * @private
   */
  async _generateContentForFields(fields, analyses, cvData, jobContext) {
    const fillData = [];

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const analysis = analyses[i];

      try {
        const content = await this.contentGenerator.generateContent(
          field,
          analysis,
          cvData,
          jobContext
        );

        fillData.push({
          field: field,
          analysis: analysis,
          content: content,
          shouldFill: content !== null
        });

      } catch (error) {
        console.error(`Error generating content for field ${field.name}:`, error);
        fillData.push({
          field: field,
          analysis: analysis,
          content: null,
          shouldFill: false,
          error: error.message
        });
      }
    }

    return fillData;
  }

  /**
   * Fill form fields with generated content
   * @param {Array} fillData - Array of fill data objects
   * @returns {Promise<Object>} - Fill results
   * @private
   */
  async _fillFormFields(fillData) {
    const { CONFIG } = await import(chrome.runtime.getURL('config/config.js'));
    const { delay } = await import(chrome.runtime.getURL('utils/helpers.js'));

    let filled = 0;
    let skipped = 0;
    let failed = 0;

    for (const data of fillData) {
      if (!data.shouldFill || !data.content) {
        skipped++;
        continue;
      }

      try {
        const success = this._setFieldValue(data.field.element, data.content);

        if (success) {
          filled++;
          // Highlight the field briefly
          this._highlightField(data.field.element);
        } else {
          failed++;
        }

        // Add delay between fills to simulate human behavior
        await delay(CONFIG.FILL_DELAY_MS);

      } catch (error) {
        console.error(`Error filling field ${data.field.name}:`, error);
        failed++;
      }
    }

    return { filled, skipped, failed };
  }

  /**
   * Set value for a form field
   * @param {HTMLElement} element - Form element
   * @param {string} value - Value to set
   * @returns {boolean} - True if successful
   * @private
   */
  _setFieldValue(element, value) {
    try {
      const tagName = element.tagName.toLowerCase();
      const type = element.type;

      // Handle different field types
      if (tagName === 'select') {
        return this._setSelectValue(element, value);
      } else if (type === 'checkbox') {
        return this._setCheckboxValue(element, value);
      } else if (type === 'radio') {
        return this._setRadioValue(element, value);
      } else {
        // Text inputs, textareas, etc.
        return this._setTextValue(element, value);
      }

    } catch (error) {
      console.error('Error setting field value:', error);
      return false;
    }
  }

  /**
   * Set value for text input/textarea
   * @param {HTMLElement} element - Element
   * @param {string} value - Value
   * @returns {boolean} - Success
   * @private
   */
  _setTextValue(element, value) {
    // Set the value
    element.value = value;

    // Trigger events to ensure frameworks detect the change
    this._triggerEvents(element, ['input', 'change', 'blur']);

    return true;
  }

  /**
   * Set value for select dropdown
   * @param {HTMLSelectElement} element - Select element
   * @param {string} value - Value
   * @returns {boolean} - Success
   * @private
   */
  _setSelectValue(element, value) {
    // Try to find matching option
    const options = Array.from(element.options);

    // Try exact match first
    let option = options.find(opt => opt.value === value || opt.text === value);

    // Try case-insensitive match
    if (!option) {
      const valueLower = value.toLowerCase();
      option = options.find(opt =>
        opt.value.toLowerCase() === valueLower ||
        opt.text.toLowerCase() === valueLower
      );
    }

    // Try partial match
    if (!option) {
      const valueLower = value.toLowerCase();
      option = options.find(opt =>
        opt.value.toLowerCase().includes(valueLower) ||
        opt.text.toLowerCase().includes(valueLower)
      );
    }

    if (option) {
      element.value = option.value;
      this._triggerEvents(element, ['change', 'blur']);
      return true;
    }

    console.warn(`Could not find matching option for: ${value}`);
    return false;
  }

  /**
   * Set value for checkbox
   * @param {HTMLInputElement} element - Checkbox element
   * @param {string} value - Value
   * @returns {boolean} - Success
   * @private
   */
  _setCheckboxValue(element, value) {
    // Determine if should be checked
    const shouldCheck = this._parseBoolean(value);
    element.checked = shouldCheck;

    this._triggerEvents(element, ['change', 'click']);
    return true;
  }

  /**
   * Set value for radio button
   * @param {HTMLInputElement} element - Radio element
   * @param {string} value - Value
   * @returns {boolean} - Success
   * @private
   */
  _setRadioValue(element, value) {
    // Find radio button with matching value
    const name = element.name;
    const radios = document.querySelectorAll(`input[type="radio"][name="${name}"]`);

    for (const radio of radios) {
      if (radio.value === value || radio.value.toLowerCase() === value.toLowerCase()) {
        radio.checked = true;
        this._triggerEvents(radio, ['change', 'click']);
        return true;
      }
    }

    return false;
  }

  /**
   * Parse boolean from string
   * @param {string} value - Value to parse
   * @returns {boolean} - Parsed boolean
   * @private
   */
  _parseBoolean(value) {
    if (typeof value === 'boolean') return value;
    const str = String(value).toLowerCase();
    return ['true', 'yes', '1', 'on', 'checked'].includes(str);
  }

  /**
   * Trigger events on element
   * @param {HTMLElement} element - Element
   * @param {Array<string>} eventNames - Event names to trigger
   * @private
   */
  _triggerEvents(element, eventNames) {
    for (const eventName of eventNames) {
      // Create and dispatch native event
      const event = new Event(eventName, {
        bubbles: true,
        cancelable: true
      });
      element.dispatchEvent(event);

      // Also trigger input event for React/Vue compatibility
      if (eventName === 'input') {
        const inputEvent = new InputEvent('input', {
          bubbles: true,
          cancelable: true,
          inputType: 'insertText'
        });
        element.dispatchEvent(inputEvent);
      }
    }

    // Set React/Vue internal properties if present
    this._setFrameworkProperties(element);
  }

  /**
   * Set framework-specific properties
   * @param {HTMLElement} element - Element
   * @private
   */
  _setFrameworkProperties(element) {
    // For React
    const reactKey = Object.keys(element).find(key => key.startsWith('__react'));
    if (reactKey) {
      const reactProps = element[reactKey];
      if (reactProps && reactProps.onChange) {
        reactProps.onChange({ target: element });
      }
    }

    // For Vue
    if (element._vnode && element._vnode.data && element._vnode.data.on) {
      const vueHandlers = element._vnode.data.on;
      if (vueHandlers.input) {
        vueHandlers.input({ target: element });
      }
    }
  }

  /**
   * Highlight field briefly to show it was filled
   * @param {HTMLElement} element - Element to highlight
   * @private
   */
  async _highlightField(element) {
    const { CONFIG } = await import(chrome.runtime.getURL('config/config.js'));

    const originalBorder = element.style.border;
    const originalBackground = element.style.backgroundColor;

    element.style.border = '2px solid #10b981';
    element.style.backgroundColor = '#d1fae5';

    setTimeout(() => {
      element.style.border = originalBorder;
      element.style.backgroundColor = originalBackground;
    }, CONFIG.HIGHLIGHT_DURATION_MS);
  }
}

// Create global instance
const autoFiller = new AutoFiller();

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fillForm') {
    // Handle async response
    autoFiller.fillForm()
      .then(result => {
        sendResponse({
          success: result.success,
          fieldsCount: result.fieldsFilled || 0,
          error: result.error || null,
          details: result
        });
      })
      .catch(error => {
        sendResponse({
          success: false,
          error: error.message,
          fieldsCount: 0
        });
      });

    // Return true to indicate async response
    return true;
  }
});

console.log('CV Auto-Fill content script loaded');
