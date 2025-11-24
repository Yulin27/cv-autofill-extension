/**
 * PDF Parser - Extracts text from PDF files
 * Uses pdf.js library (Mozilla's PDF renderer)
 */

/**
 * Extract text from PDF file
 * @param {ArrayBuffer} pdfData - PDF file data as ArrayBuffer
 * @returns {Promise<string>} - Extracted text content
 */
export async function extractTextFromPDF(pdfData) {
  try {
    // Load PDF.js library from CDN
    if (!window.pdfjsLib) {
      await loadPDFJS();
    }

    // Load PDF document
    const loadingTask = pdfjsLib.getDocument({ data: pdfData });
    const pdf = await loadingTask.promise;

    let fullText = '';

    // Extract text from each page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();

      // Combine text items
      const pageText = textContent.items
        .map(item => item.str)
        .join(' ');

      fullText += pageText + '\n\n';
    }

    return fullText.trim();

  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error(`PDF extraction failed: ${error.message}`);
  }
}

/**
 * Load PDF.js library dynamically
 */
async function loadPDFJS() {
  return new Promise((resolve, reject) => {
    // Use Mozilla's CDN for PDF.js
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = () => {
      // Set worker source
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      resolve();
    };
    script.onerror = () => reject(new Error('Failed to load PDF.js library'));
    document.head.appendChild(script);
  });
}

/**
 * Validate PDF file
 * @param {File} file - File object to validate
 * @returns {boolean} - True if valid PDF
 */
export function isValidPDF(file) {
  return file && file.type === 'application/pdf';
}

/**
 * Get PDF metadata
 * @param {ArrayBuffer} pdfData - PDF file data
 * @returns {Promise<Object>} - PDF metadata
 */
export async function getPDFMetadata(pdfData) {
  try {
    if (!window.pdfjsLib) {
      await loadPDFJS();
    }

    const loadingTask = pdfjsLib.getDocument({ data: pdfData });
    const pdf = await loadingTask.promise;
    const metadata = await pdf.getMetadata();

    return {
      numPages: pdf.numPages,
      info: metadata.info,
      metadata: metadata.metadata
    };

  } catch (error) {
    console.error('Error getting PDF metadata:', error);
    return null;
  }
}
