import { create } from "zustand";
import { Subject } from "@/lib/types/subject";
import { DEFAULT_SUBJECTS } from "@/lib/constants/subjects";

interface SubjectStore {
  subjects: Subject[];

  addSubject: (subject: Subject) => void;
  updateSubject: (id: string, updates: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;
}

export const useSubjectStore = create<SubjectStore>((set) => ({
  subjects: [...DEFAULT_SUBJECTS],

  addSubject: (subject) =>
    set((state) => ({
      subjects: [...state.subjects, subject],
    })),

  updateSubject: (id, updates) =>
    set((state) => ({
      subjects: state.subjects.map((s) =>
        s.id === id ? { ...s, ...updates } : s
      ),
    })),

  deleteSubject: (id) =>
    set((state) => ({
      subjects: state.subjects.filter((s) => s.id !== id),
    })),
}));