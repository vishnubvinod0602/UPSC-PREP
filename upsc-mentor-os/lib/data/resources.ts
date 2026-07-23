import resources from "./resources.json";

import type { SubjectId } from "../constants";
import type {
  Priority,
} from "./types";

export interface Resource {
  id: string;

  subjectId: SubjectId;

  category: string;

  type: string;

  name: string;

  author?: string;

  provider?: string;

  publisher?: string;

  class?: string;

  priority: Priority;

  source?: string;

  url?: string;

  tags?: string[];

  active: boolean;
}

const RESOURCES = resources as Resource[];

/**
 * Get all active resources.
 */
export function getResources(): Resource[] {
  return RESOURCES.filter(resource => resource.active);
}

/**
 * Get all resources for a subject.
 */
export function getResourcesBySubject(
  subjectId: SubjectId,
): Resource[] {
  return RESOURCES.filter(
    resource =>
      resource.subjectId === subjectId &&
      resource.active,
  );
}

/**
 * Get resources by category.
 */
export function getResourcesByCategory(
  subjectId: SubjectId,
  category: string,
): Resource[] {
  return RESOURCES.filter(
    resource =>
      resource.subjectId === subjectId &&
      resource.category === category &&
      resource.active,
  );
}

/**
 * Get a resource by ID.
 */
export function getResource(
  id: string,
): Resource | undefined {
  return RESOURCES.find(
    resource => resource.id === id,
  );
}

/**
 * Search resources.
 */
export function searchResources(
  query: string,
): Resource[] {
  const search = query.toLowerCase();

  return RESOURCES.filter(resource =>
    resource.active &&
    (
      resource.name.toLowerCase().includes(search) ||
      resource.author?.toLowerCase().includes(search) ||
      resource.provider?.toLowerCase().includes(search) ||
      resource.tags?.some(tag =>
        tag.toLowerCase().includes(search),
      )
    ),
  );
}