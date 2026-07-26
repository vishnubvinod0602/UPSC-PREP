import { importRows } from "@/lib/googleSheets/server";
import type { ScheduleEvent } from "@/types/schedule";

export async function importSchedule(
  schedule: ScheduleEvent[]
): Promise<ScheduleEvent[]> {
  const rows = schedule.map((event) => ({
    subject: event.subject,
    faculty: event.faculty,
    venue: event.venue,
    mode: event.mode,

    timezone: event.timezone,

    startLocal: event.startLocal,
    endLocal: event.endLocal,

    startUtc: event.startUtc,
    endUtc: event.endUtc,
  }));

  await importRows("Schedule", rows);

  return rows;
}