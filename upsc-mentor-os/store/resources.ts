import { create } from "zustand";
import type { Resource } from "@/lib/types/resource";
import { DEFAULT_RESOURCES } from "@/lib/constants/resources";

interface ResourceStore {
  resources: Resource[];

  addResource: (resource: Resource) => void;
  updateResource: (id: string, updates: Partial<Resource>) => void;
  deleteResource: (id: string) => void;
}

export const useResourceStore = create<ResourceStore>((set) => ({
  resources: DEFAULT_RESOURCES as Resource[],

  addResource: (resource) =>
    set((state) => ({
      resources: [...state.resources, resource],
    })),

  updateResource: (id, updates) =>
    set((state) => ({
      resources: state.resources.map((resource) =>
        resource.id === id
          ? { ...resource, ...updates }
          : resource
      ),
    })),

  deleteResource: (id) =>
    set((state) => ({
      resources: state.resources.filter(
        (resource) => resource.id !== id
      ),
    })),
}));