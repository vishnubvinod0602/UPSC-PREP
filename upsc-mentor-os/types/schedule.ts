// types/schedule.ts

export interface ScheduleEvent {
  /** Subject or class name */
  subject: string;

  /** Faculty name */
  faculty: string;

  /** Venue / classroom */
  venue: string;

  /** Online / Offline / Hybrid */
  mode: string;

  /** Source timetable timezone */
  timezone: "Asia/Kolkata";

  /** Original coaching start time */
  startLocal: string;

  /** Original coaching end time */
  endLocal: string;

  /** UTC start time */
  startUtc: string;

  /** UTC end time */
  endUtc: string;
}

export type Schedule = ScheduleEvent[];