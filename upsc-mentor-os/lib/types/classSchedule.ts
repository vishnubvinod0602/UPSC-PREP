export interface ClassSchedule {
  id: string;

  date: string;

  startTime: string;

  endTime: string;

  subject: string;

  faculty: string;

  mode: string;

  venue: string;

  topic: string;

  status: "Pending" | "Completed";

  notes: string;
}