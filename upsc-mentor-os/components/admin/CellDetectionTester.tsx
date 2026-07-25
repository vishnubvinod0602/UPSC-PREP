"use client";

import { useState } from "react";
import { detectCells } from "@/lib/opencv/detectCells";

export default function CellDetectionTester() {
  const [imageUrl, setImageUrl] = useState("");
  const [cells, setCells] = useState<any[]>([]);

  async function handleImage(file: File) {
    const url = URL.createObjectURL(file);

    setImageUrl(url);

    const img = new Image();

    img.src = url;

    img.onload = async () => {
      const detected = await detectCells(img);

      console.log(detected);

      setCells(detected);
    };
  }

  return (
    <div className="space-y-4">

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleImage(e.target.files[0]);
          }
        }}
      />

      {imageUrl && (
        <div className="relative inline-block">

          <img
            src={imageUrl}
            alt=""
            className="max-w-full"
          />

          {cells.map((cell, index) => (
            <div
              key={index}
              className="absolute border-2 border-red-500"
              style={{
                left: cell.x,
                top: cell.y,
                width: cell.width,
                height: cell.height,
              }}
            />
          ))}

        </div>
      )}

    </div>
  );
}