"use client";

import { useState } from "react";
import { detectColumns } from "@/lib/opencv/detectColumns";
import { cropCell } from "@/lib/image/cropCell";
import { detectTable } from "@/lib/opencv/detectTable";
import { findRows } from "@/lib/image/findRows";

import { extractText } from "@/lib/ocr/extractText";
import type { ScheduleEntry } from "@/lib/parser/types";

export default function ClassScheduleImageImporter() {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState<ScheduleEntry[]>([]);

  async function handleImport() {

    if (!image) return;

    try {
      setLoading(true);
      setEntries([]);

      console.log("Step 1: Detecting table...");

      const table = await detectTable(image);

      console.log("Table:", table);

      console.log("Step 2: Finding rows...");

   const detectedRows = await findRows(image, table);

console.log("Rows:", detectedRows.length);

console.log("Step 3: Detecting columns...");

const columns = await detectColumns(image, table);

console.log("Detected Columns:", columns);

      const output: ScheduleEntry[] = [];

for (let i = 0; i < detectedRows.length; i++) {
  console.log(`Processing Row ${i + 1}`);

  const cellTexts: string[] = [];

  for (let c = 0; c < columns.length; c++) {
    const cellBlob = await cropCell(
      image,
      detectedRows[i],
      columns[c]
    );

    const text = await extractText(cellBlob);

    console.log(`Row ${i + 1} Cell ${c + 1}:`, text);

    cellTexts.push(text.trim());
  }

  if (cellTexts.length !== 6) {
    continue;
  }

  const timeParts = cellTexts[1]
    .replace(/\s+/g, " ")
    .split("-")
    .map((t) => t.trim());

  output.push({
    date: cellTexts[0],
    startTime: timeParts[0] ?? "",
    endTime: timeParts[1] ?? "",
    subject: cellTexts[2],
    faculty: cellTexts[3],
    mode: cellTexts[4],
    venue: cellTexts[5],
  });
}

setEntries(output);

console.log(output);
    } catch (err) {
      console.error(err);
      alert("Import failed. Check console.");
    } finally {
      setLoading(false);
    }
  }

 return (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold text-red-600">
  Class Schedule Importer
</h1>
    <input
      type="file"
      accept="image/*"
      onChange={(e) =>
        setImage(e.target.files?.[0] ?? null)
      }
    />

    <button
      onClick={handleImport}
      disabled={!image || loading}
      className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
    >
      {loading ? "Processing..." : "Import Schedule"}
    </button>

    <div className="space-y-3">
      {entries.length === 0 && !loading && (
        <p className="text-gray-500">
          No schedule entries imported yet.
        </p>
      )}

      {entries.map((entry, index) => (
        <div
          key={index}
          className="rounded border p-3"
        >
          <strong>Entry {index + 1}</strong>

          <pre className="whitespace-pre-wrap text-sm">
            {JSON.stringify(entry, null, 2)}
          </pre>
        </div>
      ))}
    </div>
  </div>
);
}