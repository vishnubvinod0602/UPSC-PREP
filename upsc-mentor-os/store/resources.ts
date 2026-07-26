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
  error: string | null;

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

  clearResources: () => void;
}

export const useResourceStore = create<ResourceStore>((set, get) => ({
  resources: [],
  loading: false,
  error: null,

  loadResources: async (subjectId, search) => {
    set({
      loading: true,
      error: null,
    });

    try {
      console.log("Loading Resources...");
      console.log("Subject ID:", subjectId);
      console.log("Search:", search);

      const data = await fetchSheet<Resource>(
        "Resources",
        {
          ...(subjectId ? { subjectId } : {}),
          ...(search ? { search } : {}),
        }
      );

      console.log("Fetched Resources:", data);

      set({
        resources: data,
        loading: false,
      });
    } catch (err) {
      console.error("Failed to load resources:", err);

      set({
        resources: [],
        loading: false,
        error: "Unable to load resources",
      });
    }
  },

  addResource: async (resource) => {
    try {
      await addRow("Resources", resource);
      await get().loadResources(resource.subjectId);
    } catch (err) {
      console.error("Add Resource Error:", err);
    }
  },

  updateResource: async (id, updates) => {
    try {
      await updateRow("Resources", id, updates);

      const resource = get().resources.find(
        (r) => r.id === id
      );

      await get().loadResources(
        updates.subjectId ?? resource?.subjectId
      );
    } catch (err) {
      console.error("Update Resource Error:", err);
    }
  },

  deleteResource: async (id) => {
    try {
      const resource = get().resources.find(
        (r) => r.id === id
      );

      await deleteRow("Resources", id);

      await get().loadResources(resource?.subjectId);
    } catch (err) {
      console.error("Delete Resource Error:", err);
    }
  },

  clearResources: () =>
    set({
      resources: [],
      error: null,
    }),
}));