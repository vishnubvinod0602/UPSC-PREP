import type {
  Activity,
  Exam,
  Paper,
  Priority,
} from "./topics";

/* ==========================================================
   Planner Task
========================================================== */

export interface PlannerTask {
  id: string;

  title: string;

  exam: Exam;

  paper: Paper;

  subject: string;

  topic: string;

  activity: Activity;

  priority: Priority;

  date: string;

  start: string;

  end: string;

  completed: boolean;

  notes?: string;
}

/* ==========================================================
   Daily Planner
========================================================== */

export interface DailyPlanner {
  date: string;

  tasks: PlannerTask[];

  totalTasks: number;

  completedTasks: number;

  totalStudyMinutes: number;
}

/* ==========================================================
   Weekly Planner
========================================================== */

export interface WeeklyPlanner {
  week: string;

  planners: DailyPlanner[];
}

/* ==========================================================
   Planner Stats
========================================================== */

export interface PlannerStats {
  total: number;

  completed: number;

  pending: number;

  completionRate: number;

  totalStudyMinutes: number;
}

/* ==========================================================
   Helpers
========================================================== */

export function calculateStudyMinutes(
  start: string,
  end: string
): number {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);

  return (eh * 60 + em) - (sh * 60 + sm);
}

export function calculateCompletionRate(
  completed: number,
  total: number
): number {
  if (total === 0) return 0;

  return Math.round((completed / total) * 100);
}

export function getPlannerStats(
  tasks: PlannerTask[]
): PlannerStats {
  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const totalStudyMinutes = tasks.reduce(
    (sum, task) =>
      sum + calculateStudyMinutes(task.start, task.end),
    0
  );

  return {
    total: tasks.length,

    completed,

    pending: tasks.length - completed,

    completionRate: calculateCompletionRate(
      completed,
      tasks.length
    ),

    totalStudyMinutes,
  };
}

/* ==========================================================
   Defaults
========================================================== */

export const DEFAULT_STUDY_SESSION = 60; // minutes

export const DEFAULT_BREAK = 10; // minutes

export const MAX_DAILY_STUDY_HOURS = 10;