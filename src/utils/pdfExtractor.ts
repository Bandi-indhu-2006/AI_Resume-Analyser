import * as pdfjsLib from 'pdfjs-dist';

// Set worker source for pdfjs-dist with fallback CDN URLs
const PDFJS_VERSION = pdfjsLib.version || '4.10.38';

if (typeof window !== 'undefined' && pdfjsLib.GlobalWorkerOptions) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.mjs`;
}

/**
 * Extracts text from a PDF file using pdfjs-dist in the browser.
 * Iterates over every page, extracts item strings, preserves line breaks and spacing,
 * and normalizes whitespace.
 */
export async function extractTextFromPdfFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();

  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(arrayBuffer),
    useSystemFonts: true,
  });

  const pdfDoc = await loadingTask.promise;
  const pageTextParts: string[] = [];

  for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);
    const textContent = await page.getTextContent();

    let lastY: number | null = null;
    let pageText = '';

    for (const item of textContent.items) {
      if ('str' in item && typeof item.str === 'string') {
        const str = item.str;
        const transform = (item as any).transform;
        const currentY = Array.isArray(transform) && transform.length >= 6 ? transform[5] : null;

        if (lastY !== null && currentY !== null && Math.abs(currentY - lastY) > 5) {
          pageText += '\n';
        } else if (pageText.length > 0 && !pageText.endsWith('\n') && !pageText.endsWith(' ')) {
          pageText += ' ';
        }

        pageText += str;
        if (currentY !== null) {
          lastY = currentY;
        }
      }
    }

    if (pageText.trim()) {
      pageTextParts.push(pageText.trim());
    }
  }

  const combined = pageTextParts.join('\n\n');

  // Normalize whitespace: retain line breaks while collapsing repetitive inline spaces
  const normalizedText = combined
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return normalizedText;
}
