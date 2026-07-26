import type { ScheduleEvent } from "@/types/schedule";

export function validateSchedule(
  schedule: unknown
): ScheduleEvent[] {
  if (!Array.isArray(schedule)) {
    throw new Error("Schedule is not an array.");
  }

  return schedule.map((entry) => {
    const event = entry as Partial<ScheduleEvent>;

    return {
      subject: String(event.subject ?? ""),
      faculty: String(event.faculty ?? ""),
      venue: String(event.venue ?? ""),
      mode: String(event.mode ?? ""),

      timezone: "Asia/Kolkata",

      startLocal: String(event.startLocal ?? ""),
      endLocal: String(event.endLocal ?? ""),

      startUtc: String(event.startUtc ?? ""),
      endUtc: String(event.endUtc ?? ""),
    };
  });
}