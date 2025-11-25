/**
 * PDF Parser - Extracts text from PDF files
 * Uses pdf.js library (Mozilla's PDF renderer)
 * Service Worker Compatible Version - Uses lazy loading
 */

// Import PDF.js lazy loader
import { getPDFJS } from '../lib/pdf-loader.js';

/**
 * Extract text from PDF file
 * @param {ArrayBuffer} pdfData - PDF file data as ArrayBuffer
 * @returns {Promise<string>} - Extracted text content
 */
export async function extractTextFromPDF(pdfData) {
  try {
    console.log('[PDF-PARSER] Starting PDF text extraction...');
    console.log('[PDF-PARSER] PDF data size:', pdfData.byteLength, 'bytes');

    // Load PDF.js library (lazy loaded)
    console.log('[PDF-PARSER] Loading PDF.js library...');
    const pdfjsLib = await getPDFJS();
    console.log('[PDF-PARSER] ✓ PDF.js library ready');

    // Load PDF document
    console.log('[PDF-PARSER] Creating PDF loading task...');
    const loadingTask = pdfjsLib.getDocument({
      data: pdfData,
      useWorkerFetch: false,
      isEvalSupported: false,
      useSystemFonts: true
    });

    console.log('[PDF-PARSER] Waiting for PDF to load...');
    const startLoad = Date.now();
    const pdf = await loadingTask.promise;
    const loadTime = Date.now() - startLoad;

    console.log(`[PDF-PARSER] ✓ PDF loaded successfully in ${loadTime}ms`);
    console.log(`[PDF-PARSER] Number of pages: ${pdf.numPages}`);

    let fullText = '';

    // Extract text from each page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      console.log(`[PDF-PARSER] Processing page ${pageNum}/${pdf.numPages}...`);
      const pageStart = Date.now();

      const page = await pdf.getPage(pageNum);
      console.log(`[PDF-PARSER]   - Page ${pageNum} loaded in ${Date.now() - pageStart}ms`);

      const textStart = Date.now();
      const textContent = await page.getTextContent();
      console.log(`[PDF-PARSER]   - Text content extracted in ${Date.now() - textStart}ms`);
      console.log(`[PDF-PARSER]   - Found ${textContent.items.length} text items`);

      // Combine text items
      const pageText = textContent.items
        .map(item => item.str)
        .join(' ');

      fullText += pageText + '\n\n';
      console.log(`[PDF-PARSER]   - Page ${pageNum} text length: ${pageText.length} characters`);
    }

    console.log(`[PDF-PARSER] ✓ COMPLETE: Extracted ${fullText.length} total characters from PDF`);
    return fullText.trim();

  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error(`PDF extraction failed: ${error.message}`);
  }
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
    // Load PDF.js library (lazy loaded)
    const pdfjsLib = await getPDFJS();

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
