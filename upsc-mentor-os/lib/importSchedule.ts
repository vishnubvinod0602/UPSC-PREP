import { importRows } from "@/lib/googleSheets/server";

export interface ScheduleItem {
   id?: string;
  subject: string;
  faculty?: string;
  venue?: string;
  mode?: string;
  date: string;
  startTime: string;
  endTime: string;
}

export async function importSchedule(
  schedule: ScheduleItem[]
) {
  const rows = schedule.map((item) => ({
    id: crypto.randomUUID(),
    ...item,
  }));

  await importRows("Schedule", rows);

  return rows;
}