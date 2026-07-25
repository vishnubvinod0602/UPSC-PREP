import { create } from "zustand";
import { Subject } from "@/lib/types/subject";
import {
  fetchSheet,
  addRow,
  updateRow,
  deleteRow,
} from "@/lib/googleSheets/client";

interface SubjectStore {
  subjects: Subject[];
  loading: boolean;

  loadSubjects: () => Promise<void>;

  addSubject: (subject: Subject) => Promise<void>;

  updateSubject: (
    id: string,
    updates: Partial<Subject>
  ) => Promise<void>;

  deleteSubject: (id: string) => Promise<void>;
}

export const useSubjectStore = create<SubjectStore>((set, get) => ({
  subjects: [],
  loading: false,

  loadSubjects: async () => {
    set({ loading: true });

    try {
      const subjects = await fetchSheet<Subject>("Subjects");

      set({
        subjects,
        loading: false,
      });
    } catch (error) {
      console.error(error);

      set({
        loading: false,
      });
    }
  },

  addSubject: async (subject) => {
    await addRow("Subjects", subject);
    await get().loadSubjects();
  },

  updateSubject: async (id, updates) => {
    await updateRow("Subjects", id, updates);
    await get().loadSubjects();
  },

  deleteSubject: async (id) => {
    await deleteRow("Subjects", id);
    await get().loadSubjects();
  },
}));