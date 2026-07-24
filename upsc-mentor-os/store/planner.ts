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
isTaskModalOpen: boolean;
setTaskModalOpen: (open: boolean) => void;
  addTask: (task: PlannerTask) => void;

  toggleTask: (id: string) => void;
  
  deleteTask: (id: string) => void;
  updateTask: (task: PlannerTask) => void;
  editingTask: PlannerTask | null;
   setEditingTask: (task: PlannerTask | null) => void;
  
}

export const usePlannerStore = create<PlannerState>((set) => ({
  isTaskModalOpen: false,

setTaskModalOpen: (open) =>
  set({
    isTaskModalOpen: open,
  }),
  editingTask: null,
 tasks: [
  {
    id: "1",
    title: "Indian Polity",
    exam: "Mains",

    subject: "Indian Polity",
    subjectId: "indian-polity",
    resourceId: "polity-laxmikanth",

    activity: "Study",
    priority: "High",

    start: "07:00",
    end: "09:00",

    completed: false,
    date: "2026-07-23",

    goal: "Complete Fundamental Rights",
    targetHours: 2,
  },

  {
    id: "2",
    title: "Shubhra Ranjan PSIR Notes",
    exam: "Mains",

    subject: "PSIR Paper I",
    subjectId: "psir-paper-1",
    resourceId: "psir1-shubhra-ranjan",

    activity: "Revision",
    priority: "Medium",

    start: "10:00",
    end: "11:30",

    completed: false,
    date: "2026-07-23",

    goal: "Revise Political Theory",
    targetHours: 1.5,
  },

  {
    id: "3",
    title: "UPSC Previous Year Questions - Polity",
    exam: "Prelims",

    subject: "Indian Polity",
    subjectId: "indian-polity",
    resourceId: "polity-pyq",

    activity: "MCQ Practice",
    priority: "High",

    start: "16:00",
    end: "17:00",

    completed: false,
    date: "2026-07-23",

    goal: "Solve 50 PYQs",
    targetHours: 1,
  },
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

deleteTask: (id) =>
  set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== id),
  })),
updateTask: (updatedTask) =>
  set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === updatedTask.id
        ? updatedTask
        : task
    ),
  })),

setEditingTask: (task) =>
  set({
    editingTask: task,
  }),

}));