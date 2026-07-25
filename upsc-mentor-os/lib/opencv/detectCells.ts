import { loadOpenCV } from "./loadOpenCV";

export interface CellBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export async function detectCells(
  image: HTMLImageElement
): Promise<CellBox[]> {
  const cv = await loadOpenCV();

  const src = cv.imread(image);

  const gray = new cv.Mat();
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

  const binary = new cv.Mat();

  cv.adaptiveThreshold(
    gray,
    binary,
    255,
    cv.ADAPTIVE_THRESH_GAUSSIAN_C,
    cv.THRESH_BINARY_INV,
    15,
    2
  );

  // For now, just verify the preprocessing.
  cv.imshow("opencv-output", binary);

  src.delete();
  gray.delete();
  binary.delete();

  return [];
}