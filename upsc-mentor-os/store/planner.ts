import { create } from "zustand";
export interface PlannerTask {
  id: string;

  title: string;

  exam: "Prelims" | "Mains";

  subject: string;

  activity:
    | "Study"
    | "Revision"
    | "MCQ Practice"
    | "PYQ Practice"
    | "Answer Writing"
    | "Test"
    | "Class"
    | "Notes Making";

  priority: "Low" | "Medium" | "High";

  start: string;
  end: string;

  completed: boolean;

  date: string;

  subjectId?: string;
  resourceId?: string;
  goal?: string;
  targetHours?: number;
}
interface PlannerState {
  tasks: PlannerTask[];

  addTask: (task: PlannerTask) => void;

  toggleTask: (id: string) => void;
}

export const usePlannerStore = create<PlannerState>((set) => ({
  tasks: [
    {
  id: "1",
  title: "GS Paper II",
  exam: "Mains",
  subject: "GS II",
  activity: "Study",
  priority: "High",
  start: "07:00",
  end: "09:00",
  completed: false,
  date: "2026-07-23",

    },
    {
  id: "2",
  title: "PSIR Revision",
  exam: "Mains",
  subject: "PSIR",
  activity: "Revision",
  priority: "Medium",
  start: "10:00",
  end: "11:30",
  completed: false,
  date: "2026-07-23",
},
    {
  id: "3",
  title: "MCQ Practice",
  exam: "Prelims",
  subject: "Revision",
  activity: "MCQ Practice",
  priority: "High",
  start: "16:00",
  end: "17:00",
  completed: false,
  date: "2026-07-23",
}
  ],

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      ),
    })),
}));