import { getImageData } from "../image/imageData";

export interface TableBounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

export async function detectTable(
  file: File
): Promise<TableBounds> {
  const image = await getImageData(file);

  const { width, height, data } = image;

  let top = 0;
  let bottom = height - 1;
  let left = 0;
  let right = width - 1;

  const threshold = 240;

  // Top
  outerTop:
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;

      const gray =
        (data[i] + data[i + 1] + data[i + 2]) / 3;

      if (gray < threshold) {
        top = y;
        break outerTop;
      }
    }
  }

  // Bottom
  outerBottom:
  for (let y = height - 1; y >= 0; y--) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;

      const gray =
        (data[i] + data[i + 1] + data[i + 2]) / 3;

      if (gray < threshold) {
        bottom = y;
        break outerBottom;
      }
    }
  }

  // Left
  outerLeft:
  for (let x = 0; x < width; x++) {
    for (let y = top; y <= bottom; y++) {
      const i = (y * width + x) * 4;

      const gray =
        (data[i] + data[i + 1] + data[i + 2]) / 3;

      if (gray < threshold) {
        left = x;
        break outerLeft;
      }
    }
  }

  // Right
  outerRight:
  for (let x = width - 1; x >= 0; x--) {
    for (let y = top; y <= bottom; y++) {
      const i = (y * width + x) * 4;

      const gray =
        (data[i] + data[i + 1] + data[i + 2]) / 3;

      if (gray < threshold) {
        right = x;
        break outerRight;
      }
    }
  }

  return {
    left,
    top,
    width: right - left,
    height: bottom - top,
  };
}