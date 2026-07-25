import type { RowBox } from "./findRows";
import type { TableBounds } from "../opencv/detectTable";

export async function cropRow(
  file: File,
  table: TableBounds,
  row: RowBox
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Canvas not supported"));
        return;
      }

      canvas.width = table.width;
      canvas.height = row.height;

      ctx.drawImage(
        img,
        table.left,
        row.top,
        table.width,
        row.height,
        0,
        0,
        table.width,
        row.height
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Failed to crop row"));
          return;
        }

        resolve(blob);
      }, "image/png");

      URL.revokeObjectURL(img.src);
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    img.src = URL.createObjectURL(file);
  });
}