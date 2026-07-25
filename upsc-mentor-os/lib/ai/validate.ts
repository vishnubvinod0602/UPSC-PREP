import type { ScheduleEntry } from "./types";

export function validateSchedule(
  schedule: unknown
): ScheduleEntry[] {

  if (!Array.isArray(schedule)) {
    throw new Error("Schedule is not an array.");
  }

  return schedule.map((entry) => ({
    date: String(entry.date ?? ""),
    startTime: String(entry.startTime ?? ""),
    endTime: String(entry.endTime ?? ""),
    subject: String(entry.subject ?? ""),
    faculty: String(entry.faculty ?? ""),
    mode: String(entry.mode ?? ""),
    venue: String(entry.venue ?? ""),
  }));
}