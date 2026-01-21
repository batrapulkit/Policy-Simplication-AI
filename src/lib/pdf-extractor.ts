import * as pdfjsLib from 'pdfjs-dist';

// Configure the worker to use the local file from node_modules
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export async function extractTextFromPdf(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();

    console.log('[PDF Extractor] Loading PDF with PDF.js...');
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    console.log('[PDF Extractor] PDF loaded. Pages:', pdf.numPages);

    const textParts: string[] = [];

    // Extract text from each page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');

      textParts.push(pageText);
      console.log(`[PDF Extractor] Page ${pageNum}: ${pageText.length} characters`);
    }

    const fullText = textParts.join('\n\n');
    console.log('[PDF Extractor] Total extracted:', fullText.length, 'characters');
    console.log('[PDF Extractor] First 500 chars:', fullText.substring(0, 500));

    if (!fullText || fullText.trim().length < 50) {
      throw new Error('No text could be extracted from this PDF. It may be a scanned image.');
    }

    return fullText;
  } catch (error) {
    console.error('[PDF Extractor] Error:', error);
    throw new Error(`Failed to extract text from PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
