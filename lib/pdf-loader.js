/**
 * PDF.js Loader Module
 * Lazy loader for service worker compatibility (no top-level await)
 */

let pdfjsLib = null;
let isLoading = false;
let loadPromise = null;

/**
 * Get PDF.js library instance (lazy loaded)
 * @returns {Promise<Object>} PDF.js library
 */
export async function getPDFJS() {
  // If already loaded, return immediately
  if (pdfjsLib) {
    return pdfjsLib;
  }

  // If currently loading, wait for that promise
  if (isLoading) {
    return loadPromise;
  }

  // Start loading
  isLoading = true;
  loadPromise = (async () => {
    try {
      console.log('[PDF-LOADER] Loading PDF.js module...');

      // Dynamic import of PDF.js ES module
      const pdfModule = await import('./pdf.min.mjs');
      pdfjsLib = pdfModule;

      // Disable worker in service worker context (workers can't spawn sub-workers)
      // This makes PDF.js run on the main thread instead
      pdfjsLib.GlobalWorkerOptions.workerSrc = false;

      console.log('[PDF-LOADER] ✓ PDF.js loaded (worker disabled for service worker compatibility)');

      return pdfjsLib;
    } catch (error) {
      console.error('[PDF-LOADER] Failed to load PDF.js:', error);
      isLoading = false;
      loadPromise = null;
      throw error;
    } finally {
      isLoading = false;
    }
  })();

  return loadPromise;
}
