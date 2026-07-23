export interface OCRService {
  extractText(file: File): Promise<string>;
}

export const ocrService: OCRService = {
  async extractText(_file: File) {
    // TODO: Tesseract implementation
    return "";
  },
};