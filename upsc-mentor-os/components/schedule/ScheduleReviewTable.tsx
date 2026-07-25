"use client";

import { ScheduleEntry } from "@/lib/ai/types";

interface Props {
  schedule: ScheduleEntry[];
  onChange: (schedule: ScheduleEntry[]) => void;
}

export default function ScheduleReviewTable({
  schedule,
  onChange,
}: Props) {
  function update(
    row: number,
    field: keyof ScheduleEntry,
    value: string
  ) {
    const copy = [...schedule];
    copy[row][field] = value;
    onChange(copy);
  }

  return (
    <div className="overflow-auto rounded border">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th>Date</th>
            <th>Start</th>
            <th>End</th>
            <th>Subject</th>
            <th>Faculty</th>
            <th>Mode</th>
            <th>Venue</th>
          </tr>
        </thead>

        <tbody>
          {schedule.map((row, i) => (
            <tr key={i}>
              {(Object.keys(row) as (keyof ScheduleEntry)[]).map((key) => (
                <td key={key} className="border p-1">
                  <input
                    value={row[key]}
                    onChange={(e) =>
                      update(i, key, e.target.value)
                    }
                    className="w-full"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}