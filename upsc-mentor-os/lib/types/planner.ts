export interface PlannerTask {
  id: string;
  subjectId: string;
  resourceId: string;
  date: string;
  targetHours: number;
  goal: string;
  completed: boolean;
}