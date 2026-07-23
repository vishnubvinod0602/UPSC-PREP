import type { SubjectId } from "../constants";
import type { Resource } from "./resources";

/**
 * Group resources by category.
 */
export function groupResourcesByCategory(
  resources: Resource[],
): Record<string, Resource[]> {
  return resources.reduce<Record<string, Resource[]>>((groups, resource) => {
    if (!groups[resource.category]) {
      groups[resource.category] = [];
    }

    groups[resource.category].push(resource);

    return groups;
  }, {});
}

/**
 * Sort resources by priority.
 */
export function sortResourcesByPriority(
  resources: Resource[],
): Resource[] {
  const order = {
    Essential: 1,
    Recommended: 2,
    Reference: 3,
    Optional: 4,
  } as const;

  return [...resources].sort(
    (a, b) => order[a.priority] - order[b.priority],
  );
}

/**
 * Filter resources by category.
 */
export function filterResourcesByCategory(
  resources: Resource[],
  category: string,
): Resource[] {
  return resources.filter(
    resource => resource.category === category,
  );
}

/**
 * Filter resources by subject.
 */
export function filterResourcesBySubject(
  resources: Resource[],
  subjectId: SubjectId,
): Resource[] {
  return resources.filter(
    resource => resource.subjectId === subjectId,
  );
}

/**
 * Get all unique categories.
 */
export function getCategories(
  resources: Resource[],
): string[] {
  return [...new Set(resources.map(resource => resource.category))].sort();
}

/**
 * Get all unique providers.
 */
export function getProviders(
  resources: Resource[],
): string[] {
  return [
    ...new Set(
      resources
        .map(resource => resource.provider)
        .filter(Boolean),
    ),
  ].sort() as string[];
}

/**
 * Get all unique authors.
 */
export function getAuthors(
  resources: Resource[],
): string[] {
  return [
    ...new Set(
      resources
        .map(resource => resource.author)
        .filter(Boolean),
    ),
  ].sort() as string[];
}