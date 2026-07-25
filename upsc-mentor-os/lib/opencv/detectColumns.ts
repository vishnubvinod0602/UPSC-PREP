import { loadOpenCV } from "./loadOpenCV";
import type { TableBounds } from "./detectTable";

export interface ColumnBox {
  left: number;
  width: number;
}

export async function detectColumns(
  file: File,
  table: TableBounds
): Promise<ColumnBox[]> {
  const cv = await loadOpenCV();

  // Load image
  const img = new Image();

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });

  const src = cv.imread(img);

  // Crop table
  const roi = new cv.Rect(
    table.left,
    table.top,
    table.width,
    table.height
  );

  const tableMat = src.roi(roi);

  // Grayscale
  const gray = new cv.Mat();
  cv.cvtColor(tableMat, gray, cv.COLOR_RGBA2GRAY);

  // Binary
  const binary = new cv.Mat();
  cv.threshold(
    gray,
    binary,
    0,
    255,
    cv.THRESH_BINARY_INV + cv.THRESH_OTSU
  );

  // Extract vertical lines
  const kernel = cv.getStructuringElement(
    cv.MORPH_RECT,
    new cv.Size(3, 40)
  );

  const vertical = new cv.Mat();

  cv.morphologyEx(
    binary,
    vertical,
    cv.MORPH_OPEN,
    kernel
  );

  // Detect contours
  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();

  cv.findContours(
    vertical,
    contours,
    hierarchy,
    cv.RETR_EXTERNAL,
    cv.CHAIN_APPROX_SIMPLE
  );

  console.log("Contours found:", contours.size());

  const xPositions: number[] = [];

  for (let i = 0; i < contours.size(); i++) {
    const contour = contours.get(i);
    const rect = cv.boundingRect(contour);

    if (rect.height > table.height * 0.6 && rect.width < 30) {
      xPositions.push(rect.x);
    }

    contour.delete();
  }

  xPositions.sort((a, b) => a - b);

  console.log("Column X positions:", xPositions);

  // Convert x positions to columns
  const columns: ColumnBox[] = [];

  for (let i = 0; i < xPositions.length - 1; i++) {
    columns.push({
      left: xPositions[i],
      width: xPositions[i + 1] - xPositions[i],
    });
  }

  console.log("Detected Columns:", columns);

  // Cleanup
  contours.delete();
  hierarchy.delete();

  src.delete();
  tableMat.delete();
  gray.delete();
  binary.delete();
  vertical.delete();

  URL.revokeObjectURL(img.src);

  return columns;
}