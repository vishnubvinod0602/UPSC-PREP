import { ColumnBox } from "@/lib/opencv/detectColumns";

export async function cropCell(
  image: File,
  row: {
    top: number;
    height: number;
  },
  column: ColumnBox
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

      canvas.width = column.width;
      canvas.height = row.height;

      ctx.drawImage(
        img,
        column.left,
        row.top,
        column.width,
        row.height,
        0,
        0,
        column.width,
        row.height
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Failed to crop cell"));
          return;
        }

        resolve(blob);
      });
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(image);
  });
}