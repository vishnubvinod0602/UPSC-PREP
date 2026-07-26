import { importRows } from "@/lib/googleSheets/server";

export interface ScheduleItem {
  [key: string]: any;
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