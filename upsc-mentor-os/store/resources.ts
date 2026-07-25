import { create } from "zustand";
import type { Resource } from "@/lib/types/resource";
import {
  fetchSheet,
  addRow,
  updateRow,
  deleteRow,
} from "@/lib/googleSheets/client";

interface ResourceStore {
  resources: Resource[];
  loading: boolean;

  loadResources: (
    subjectId?: string,
    search?: string
  ) => Promise<void>;

  addResource: (resource: Resource) => Promise<void>;

  updateResource: (
    id: string,
    updates: Partial<Resource>
  ) => Promise<void>;

  deleteResource: (id: string) => Promise<void>;
}

export const useResourceStore = create<ResourceStore>((set, get) => ({
  resources: [],
  loading: false,

  loadResources: async (
    subjectId?: string,
    search?: string
  ) => {
    set({ loading: true });

    try {
      const resources = await fetchSheet<Resource>(
        "Resources",
        {
          ...(subjectId ? { subjectId } : {}),
          ...(search ? { search } : {}),
        }
      );

      set({
        resources,
        loading: false,
      });
    } catch (error) {
      console.error(error);

      set({
        loading: false,
      });
    }
  },

  addResource: async (resource) => {
    await addRow("Resources", resource);
    await get().loadResources(resource.subjectId);
  },

  updateResource: async (id, updates) => {
    await updateRow("Resources", id, updates);

    const subjectId =
      get().resources.find((r) => r.id === id)?.subjectId;

    await get().loadResources(subjectId);
  },

  deleteResource: async (id) => {
    const subjectId =
      get().resources.find((r) => r.id === id)?.subjectId;

    await deleteRow("Resources", id);

    await get().loadResources(subjectId);
  },
}));