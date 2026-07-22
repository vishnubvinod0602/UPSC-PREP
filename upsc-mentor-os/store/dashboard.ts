import { create } from "zustand";

interface DashboardState {
  studyHours: number;
  revisionDue: number;
  readinessScore: number;
  mockScore: number;

  setStudyHours: (hours: number) => void;
  setRevisionDue: (count: number) => void;
  setReadinessScore: (score: number) => void;
  setMockScore: (score: number) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  studyHours: 5.5,
  revisionDue: 18,
  readinessScore: 72,
  mockScore: 118,

  setStudyHours: (hours) => set({ studyHours: hours }),
  setRevisionDue: (count) => set({ revisionDue: count }),
  setReadinessScore: (score) => set({ readinessScore: score }),
  setMockScore: (score) => set({ mockScore: score }),
}));