import { create } from "zustand";

export interface PlannerTask {
  id: string;
  title: string;
  start: string;
  end: string;
  completed: boolean;
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
      start: "07:00",
      end: "09:00",
      completed: false,
    },
    {
      id: "2",
      title: "PSIR Revision",
      start: "10:00",
      end: "11:00",
      completed: false,
    },
    {
      id: "3",
      title: "MCQ Practice",
      start: "14:00",
      end: "15:30",
      completed: false,
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
}));