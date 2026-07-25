export interface ScheduleEntry {
  date: string;
  startTime: string;
  endTime: string;
  subject: string;
  faculty: string;
  mode: string;
  venue: string;
}

export interface ExtractionResult {
  success: boolean;
  schedule: ScheduleEntry[];
  warnings: string[];
}