"use client";

import { useState } from "react";
import ScheduleReviewTable from "@/components/schedule/ScheduleReviewTable";
import ScheduleStats from "@/components/schedule/ScheduleStats";
import type { ScheduleEntry } from "@/lib/ai/types";
import { importSheet } from "@/lib/googleSheets/client";
export default function ScheduleImporter() {
  const [file, setFile] = useState<File | null>(null);
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);
  const [loading, setLoading] = useState(false);

  async function importSchedule() {
    if (!file) {
      alert("Please select a schedule image.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/schedule", {
        method: "POST",
        body: formData,
      });

      const json = await response.json();

      if (!json.success) {
        throw new Error(json.error);
      }

      setSchedule(json.schedule);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to import schedule."
      );
    } finally {
      setLoading(false);
    }
  }

async function saveSchedule() {
  if (schedule.length === 0) {
    alert("Nothing to save.");
    return;
  }

  try {
    await importSheet("Schedule", schedule);
    alert("Schedule saved successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to save schedule.");
  }
}


  return (
    <div className="space-y-6">

      <div className="rounded-lg border p-6">

        <h2 className="text-2xl font-semibold mb-4">
          Import Schedule
        </h2>

        <div className="flex gap-4 items-center">

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFile(e.target.files?.[0] ?? null)
            }
          />

          <button
            onClick={importSchedule}
            disabled={loading}
            className="rounded bg-blue-600 px-5 py-2 text-white"
          >
            {loading ? "Importing..." : "Import"}
          </button>

        </div>

      </div>

      {schedule.length > 0 && (
        <>
          <ScheduleStats schedule={schedule} />

          <ScheduleReviewTable
            schedule={schedule}
            onChange={setSchedule}
          />

          <div className="flex justify-end">

            <button
              onClick={saveSchedule}
              className="rounded bg-green-600 px-6 py-3 text-white"
            >
              Save to Planner
            </button>

          </div>
        </>
      )}
    </div>
  );
}