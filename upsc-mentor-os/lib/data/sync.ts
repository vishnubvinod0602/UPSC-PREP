import { clearCache, setCache } from "./cache";

import subjects from "./json/subjects.json";
import resources from "./json/resources.json";
import pyqs from "./json/pyqs.json";
import currentAffairs from "./json/current-affairs.json";
import tests from "./json/tests.json";

export const DATASETS = [
  "subjects",
  "resources",
  "pyqs",
  "current-affairs",
  "tests",
] as const;

export type Dataset = (typeof DATASETS)[number];

/**
 * Load every dataset into cache.
 */
export function syncData(): void {
  clearCache();

  setCache("subjects", subjects);
  setCache("resources", resources);
  setCache("pyqs", pyqs);
  setCache("current-affairs", currentAffairs);
  setCache("tests", tests);
}

/**
 * Reload a single dataset.
 */
export function reloadDataset(
  dataset: Dataset,
): void {
  switch (dataset) {
    case "subjects":
      setCache(dataset, subjects);
      break;

    case "resources":
      setCache(dataset, resources);
      break;

    case "pyqs":
      setCache(dataset, pyqs);
      break;

    case "current-affairs":
      setCache(dataset, currentAffairs);
      break;

    case "tests":
      setCache(dataset, tests);
      break;
  }
}

/**
 * Returns available datasets.
 */
export function getDatasets(): readonly Dataset[] {
  return DATASETS;
}

/**
 * Synchronize data during app startup.
 */
export function initializeData(): void {
  syncData();
}