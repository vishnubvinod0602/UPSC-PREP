export async function preprocessImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Canvas not supported"));
        return;
      }

      // 2× upscale
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;

      ctx.scale(2, 2);

      // Draw original image
      ctx.drawImage(img, 0, 0);

      // Increase contrast
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const contrast = 40;

      const factor =
        (259 * (contrast + 255)) /
        (255 * (259 - contrast));

      for (let i = 0; i < data.length; i += 4) {
        data[i] = factor * (data[i] - 128) + 128;
        data[i + 1] = factor * (data[i + 1] - 128) + 128;
        data[i + 2] = factor * (data[i + 2] - 128) + 128;
      }

      ctx.putImageData(imageData, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Failed to create image"));
          return;
        }

        resolve(blob);
      }, "image/png");
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}