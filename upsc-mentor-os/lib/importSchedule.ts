import { importRows } from "@/lib/googleSheets/server";
import { ScheduleItem } from "@/types/schedule";

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