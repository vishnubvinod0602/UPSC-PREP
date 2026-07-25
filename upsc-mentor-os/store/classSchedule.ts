import { create } from "zustand";
import type { ClassSchedule } from "@/lib/types/classSchedule";
import {
  fetchSheet,
  addRow,
  updateRow,
  deleteRow,
} from "@/lib/googleSheets/client";

interface ClassScheduleStore {
  classes: ClassSchedule[];
  loading: boolean;

  loadClasses: () => Promise<void>;

  addClass: (item: ClassSchedule) => Promise<void>;

  updateClass: (
    id: string,
    updates: Partial<ClassSchedule>
  ) => Promise<void>;

  deleteClass: (id: string) => Promise<void>;
}

export const useClassScheduleStore =
create<ClassScheduleStore>((set, get) => ({
  classes: [],
  loading: false,

  loadClasses: async () => {
    set({ loading: true });

    try {
      const classes =
        await fetchSheet<ClassSchedule>(
          "ClassSchedule"
        );

      set({
        classes,
        loading: false,
      });
    } catch (err) {
      console.error(err);

      set({
        loading: false,
      });
    }
  },

  addClass: async (item) => {
    await addRow("ClassSchedule", item);
    await get().loadClasses();
  },

  updateClass: async (id, updates) => {
    await updateRow(
      "ClassSchedule",
      id,
      updates
    );

    await get().loadClasses();
  },

  deleteClass: async (id) => {
    await deleteRow(
      "ClassSchedule",
      id
    );

    await get().loadClasses();
  },
}));