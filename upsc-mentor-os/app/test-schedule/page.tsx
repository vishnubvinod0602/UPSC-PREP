"use client";

import { useState } from "react";

interface ScheduleEntry {
  date: string;
  startTime: string;
  endTime: string;
  subject: string;
  faculty: string;
  mode: string;
  venue: string;
}

export default function TestSchedulePage() {
  const [file, setFile] = useState<File | null>(null);
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);
  const [loading, setLoading] = useState(false);

  async function upload() {
    if (!file) return;

    setLoading(true);

    const form = new FormData();
    form.append("image", file);

    const res = await fetch("/api/schedule", {
      method: "POST",
      body: form,
    });

    const json = await res.json();

    setLoading(false);

    if (json.success) {
      setSchedule(json.schedule);
    } else {
      alert(json.error);
    }
  }

  function updateCell(
    row: number,
    field: keyof ScheduleEntry,
    value: string
  ) {
    const copy = [...schedule];
    copy[row][field] = value;
    setSchedule(copy);
  }

  return (
    <main className="max-w-7xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        Schedule Import
      </h1>

      <div className="flex gap-4 mb-6">

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFile(e.target.files?.[0] ?? null)
          }
        />

        <button
          onClick={upload}
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          {loading ? "Extracting..." : "Import"}
        </button>

      </div>

      {schedule.length > 0 && (

        <div className="overflow-auto border rounded">

          <table className="min-w-full border-collapse">

            <thead className="bg-gray-100">

              <tr>

                {[
                  "Date",
                  "Start",
                  "End",
                  "Subject",
                  "Faculty",
                  "Mode",
                  "Venue",
                ].map((h) => (
                  <th
                    key={h}
                    className="border p-2 text-left"
                  >
                    {h}
                  </th>
                ))}

              </tr>

            </thead>

            <tbody>

              {schedule.map((row, i) => (

                <tr key={i}>

                  {(
                    Object.keys(row) as (keyof ScheduleEntry)[]
                  ).map((key) => (

                    <td
                      key={key}
                      className="border p-1"
                    >

                      <input
                        value={row[key]}
                        onChange={(e) =>
                          updateCell(
                            i,
                            key,
                            e.target.value
                          )
                        }
                        className="w-full outline-none"
                      />

                    </td>

                  ))}

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </main>
  );
}