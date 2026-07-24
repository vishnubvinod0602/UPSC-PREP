import type { PlannerTask } from "@/store/planner";

export const REVISION_GAPS = [1, 3, 7, 15, 30];

function addDays(date: string, days: number): string {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export function generateRevisionTasks(
  originalTask: PlannerTask
): PlannerTask[] {
  return REVISION_GAPS.map((gap, index) => ({
    id: crypto.randomUUID(),

    title: `Revision ${index + 1} - ${originalTask.title}`,

    exam: originalTask.exam,

    subject: originalTask.subject,
    subjectId: originalTask.subjectId,

    resourceId: originalTask.resourceId,

    activity: "Revision",

    priority:
      index < 2
        ? "High"
        : index < 4
        ? "Medium"
        : "Low",

    start: originalTask.start,
    end: originalTask.end,

    completed: false,

    date: addDays(originalTask.date, gap),

    goal: `Revision ${index + 1}: ${
      originalTask.goal || originalTask.title
    }`,

    targetHours: Math.max(
      1,
      Math.ceil((originalTask.targetHours ?? 2) / 2)
    ),
  }));
}