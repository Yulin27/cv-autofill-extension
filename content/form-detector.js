/**
 * Form Detector
 * Detects and analyzes form fields on job application pages
 */

export class FormDetector {
  constructor() {
    this.detectedFields = [];
    this.pageContext = {};
  }

  /**
   * Detect all fillable form fields on the page
   * @returns {Array<Object>} - Array of field objects
   */
  detectFields() {
    this.detectedFields = [];

    // Find all forms on the page
    const forms = document.querySelectorAll('form');

    if (forms.length === 0) {
      // No forms found, look for standalone input fields
      this._detectStandaloneFields();
    } else {
      // Process each form
      forms.forEach(form => this._processForm(form));
    }

    console.log(`Detected ${this.detectedFields.length} form fields`);
    return this.detectedFields;
  }

  /**
   * Process a form element
   * @param {HTMLFormElement} form - Form element
   * @private
   */
  _processForm(form) {
    // Find all input, textarea, and select elements
    const inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach(element => {
      const fieldInfo = this._extractFieldInfo(element);

      // Skip if field should be ignored
      if (this._shouldIgnoreField(fieldInfo, element)) {
        return;
      }

      this.detectedFields.push(fieldInfo);
    });
  }

  /**
   * Detect standalone fields (not in forms)
   * @private
   */
  _detectStandaloneFields() {
    const inputs = document.querySelectorAll('input, textarea, select');

    inputs.forEach(element => {
      const fieldInfo = this._extractFieldInfo(element);

      if (this._shouldIgnoreField(fieldInfo, element)) {
        return;
      }

      this.detectedFields.push(fieldInfo);
    });
  }

  /**
   * Extract information from a field element
   * @param {HTMLElement} element - Input element
   * @returns {Object} - Field information
   * @private
   */
  _extractFieldInfo(element) {
    return {
      element: element,
      type: element.type || 'text',
      name: element.name || '',
      id: element.id || '',
      placeholder: element.placeholder || '',
      label: this._findLabel(element),
      required: element.required || element.hasAttribute('required'),
      maxLength: element.maxLength > 0 ? element.maxLength : null,
      value: element.value || '',
      context: this._getFieldContext(element),
      ariaLabel: element.getAttribute('aria-label') || '',
      autocomplete: element.getAttribute('autocomplete') || ''
    };
  }

  /**
   * Find label text for an element
   * @param {HTMLElement} element - Input element
   * @returns {string} - Label text
   * @private
   */
  _findLabel(element) {
    // Method 1: Associated label via 'for' attribute
    if (element.id) {
      const label = document.querySelector(`label[for="${element.id}"]`);
      if (label) {
        return label.textContent.trim();
      }
    }

    // Method 2: Parent label
    const parentLabel = element.closest('label');
    if (parentLabel) {
      // Get text excluding nested inputs
      return this._getTextWithoutChildren(parentLabel, element);
    }

    // Method 3: Previous sibling label
    let sibling = element.previousElementSibling;
    while (sibling) {
      if (sibling.tagName === 'LABEL') {
        return sibling.textContent.trim();
      }
      sibling = sibling.previousElementSibling;
    }

    // Method 4: Aria-label
    if (element.getAttribute('aria-label')) {
      return element.getAttribute('aria-label');
    }

    // Method 5: Look for nearby text
    const parent = element.parentElement;
    if (parent) {
      // Check for text nodes before the input
      const textBefore = this._getPreviousText(element);
      if (textBefore) {
        return textBefore;
      }
    }

    return '';
  }

  /**
   * Get text content excluding specific child
   * @param {HTMLElement} parent - Parent element
   * @param {HTMLElement} exclude - Child to exclude
   * @returns {string} - Text content
   * @private
   */
  _getTextWithoutChildren(parent, exclude) {
    const clone = parent.cloneNode(true);
    const excludeClone = clone.querySelector(exclude.tagName + '[name="' + exclude.name + '"]');
    if (excludeClone) {
      excludeClone.remove();
    }
    return clone.textContent.trim();
  }

  /**
   * Get text before an element
   * @param {HTMLElement} element - Element
   * @returns {string} - Previous text
   * @private
   */
  _getPreviousText(element) {
    let text = '';
    let node = element.previousSibling;

    while (node && text.length < 100) {
      if (node.nodeType === Node.TEXT_NODE) {
        text = node.textContent.trim() + ' ' + text;
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'INPUT') {
        text = node.textContent.trim() + ' ' + text;
        break;
      }
      node = node.previousSibling;
    }

    return text.trim();
  }

  /**
   * Get context around a field (nearby text)
   * @param {HTMLElement} element - Input element
   * @returns {string} - Context text
   * @private
   */
  _getFieldContext(element) {
    const parent = element.parentElement;
    if (!parent) return '';

    // Get surrounding text from parent
    let context = '';

    // Check for help text, descriptions, etc.
    const helpTexts = parent.querySelectorAll('.help-text, .description, .hint, small, .note');
    helpTexts.forEach(el => {
      context += ' ' + el.textContent.trim();
    });

    return context.trim().substring(0, 200); // Limit context length
  }

  /**
   * Check if field should be ignored
   * @param {Object} fieldInfo - Field information
   * @param {HTMLElement} element - HTML element
   * @returns {boolean} - True if should ignore
   * @private
   */
  _shouldIgnoreField(fieldInfo, element) {
    // Ignore hidden fields
    if (fieldInfo.type === 'hidden') {
      return true;
    }

    // Ignore if not visible
    if (!this._isVisible(element)) {
      return true;
    }

    // Ignore buttons and submit inputs
    if (['submit', 'button', 'reset', 'image'].includes(fieldInfo.type)) {
      return true;
    }

    // Ignore password fields (security)
    if (fieldInfo.type === 'password') {
      return true;
    }

    // Ignore file uploads (we don't handle files other than CV)
    if (fieldInfo.type === 'file') {
      return true;
    }

    // Ignore if already filled (optional - can be configured)
    // Uncomment to skip pre-filled fields:
    // if (fieldInfo.value && fieldInfo.value.length > 0) {
    //   return true;
    // }

    return false;
  }

  /**
   * Check if element is visible
   * @param {HTMLElement} element - Element to check
   * @returns {boolean} - True if visible
   * @private
   */
  _isVisible(element) {
    const style = window.getComputedStyle(element);
    return (
      style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      style.opacity !== '0' &&
      element.offsetParent !== null
    );
  }

  /**
   * Extract job description from page
   * @returns {string|null} - Job description text or null
   */
  findJobDescription() {
    // Common selectors for job descriptions
    const selectors = [
      '[class*="job-description"]',
      '[class*="description"]',
      '[id*="job-description"]',
      '[id*="description"]',
      '.description',
      '#description',
      '[role="article"]',
      'article',
      '.job-details',
      '.posting-description'
    ];

    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) {
        const text = element.textContent.trim();
        if (text.length > 100) {
          // Return first 2000 characters
          return text.substring(0, 2000);
        }
      }
    }

    return null;
  }

  /**
   * Extract page context (company, job title, etc.)
   * @returns {Object} - Page context
   */
  getPageContext() {
    this.pageContext = {
      company: this._extractCompanyName(),
      position: this._extractJobTitle(),
      description: this.findJobDescription(),
      url: window.location.href,
      pageTitle: document.title
    };

    return this.pageContext;
  }

  /**
   * Extract company name from page
   * @returns {string|null} - Company name
   * @private
   */
  _extractCompanyName() {
    // Try meta tags
    const ogSiteName = document.querySelector('meta[property="og:site_name"]');
    if (ogSiteName) {
      return ogSiteName.getAttribute('content');
    }

    // Try common selectors
    const selectors = [
      '[class*="company-name"]',
      '[class*="employer"]',
      '.company',
      '#company',
      '[data-company]'
    ];

    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) {
        const text = element.textContent.trim();
        if (text.length > 0 && text.length < 100) {
          return text;
        }
      }
    }

    // Try to extract from URL
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    if (parts.length >= 2) {
      // Return domain name (e.g., "google" from "careers.google.com")
      return parts[parts.length - 2].charAt(0).toUpperCase() + parts[parts.length - 2].slice(1);
    }

    return null;
  }

  /**
   * Extract job title from page
   * @returns {string|null} - Job title
   * @private
   */
  _extractJobTitle() {
    // Try meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      return ogTitle.getAttribute('content');
    }

    // Try common selectors
    const selectors = [
      '[class*="job-title"]',
      '[class*="position"]',
      'h1[class*="title"]',
      '.job-title',
      '#job-title',
      'h1',
      '[data-job-title]'
    ];

    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) {
        const text = element.textContent.trim();
        if (text.length > 0 && text.length < 200) {
          return text;
        }
      }
    }

    // Try page title
    const title = document.title;
    if (title) {
      // Remove common suffixes
      return title.replace(/\s*[-|]\s*.+$/, '').trim();
    }

    return null;
  }

  /**
   * Get statistics about detected fields
   * @returns {Object} - Field statistics
   */
  getStatistics() {
    return {
      totalFields: this.detectedFields.length,
      requiredFields: this.detectedFields.filter(f => f.required).length,
      fieldTypes: this._countFieldTypes(),
      hasLabel: this.detectedFields.filter(f => f.label).length,
      hasPlaceholder: this.detectedFields.filter(f => f.placeholder).length
    };
  }

  /**
   * Count field types
   * @returns {Object} - Type counts
   * @private
   */
  _countFieldTypes() {
    const counts = {};
    this.detectedFields.forEach(field => {
      counts[field.type] = (counts[field.type] || 0) + 1;
    });
    return counts;
  }
}
