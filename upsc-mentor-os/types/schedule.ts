export interface ScheduleItem {
  id?: string;

  date: string;

  startTime: string;

  endTime: string;

  subject: string;

  faculty?: string;

  venue?: string;

  mode?: string;
}