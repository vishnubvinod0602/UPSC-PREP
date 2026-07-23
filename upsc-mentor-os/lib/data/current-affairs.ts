import currentAffairs from "./current-affairs.json";


import type { SubjectId } from "../constants";
import type { Priority } from "./types";

export interface CurrentAffair {
  id: string;

  subjectId: SubjectId;

  title: string;

  source: string;

  date: string;

  summary: string;

  tags: string[];

  importance: Priority;

  active: boolean;
}

const CURRENT_AFFAIRS =
  currentAffairs as CurrentAffair[];

/**
 * Get all active current affairs.
 */
export function getCurrentAffairs(): CurrentAffair[] {
  return CURRENT_AFFAIRS.filter(
    article => article.active,
  );
}

/**
 * Get current affairs by subject.
 */
export function getCurrentAffairsBySubject(
  subjectId: SubjectId,
): CurrentAffair[] {
  return CURRENT_AFFAIRS.filter(
    article =>
      article.subjectId === subjectId &&
      article.active,
  );
}

/**
 * Get current affairs by date.
 */
export function getCurrentAffairsByDate(
  date: string,
): CurrentAffair[] {
  return CURRENT_AFFAIRS.filter(
    article =>
      article.date === date &&
      article.active,
  );
}

/**
 * Get current affairs by tag.
 */
export function getCurrentAffairsByTag(
  tag: string,
): CurrentAffair[] {
  const search = tag.toLowerCase();

  return CURRENT_AFFAIRS.filter(
    article =>
      article.active &&
      article.tags.some(t =>
        t.toLowerCase().includes(search),
      ),
  );
}

/**
 * Search current affairs.
 */
export function searchCurrentAffairs(
  query: string,
): CurrentAffair[] {
  const search = query.toLowerCase();

  return CURRENT_AFFAIRS.filter(
    article =>
      article.active &&
      (
        article.title
          .toLowerCase()
          .includes(search) ||
        article.summary
          .toLowerCase()
          .includes(search) ||
        article.source
          .toLowerCase()
          .includes(search) ||
        article.tags.some(tag =>
          tag.toLowerCase().includes(search),
        )
      ),
  );
}

/**
 * Get a current affair by ID.
 */
export function getCurrentAffair(
  id: string,
): CurrentAffair | undefined {
  return CURRENT_AFFAIRS.find(
    article => article.id === id,
  );
}

/**
 * Get current affairs within a date range.
 */
export function getCurrentAffairsBetween(
  startDate: string,
  endDate: string,
): CurrentAffair[] {
  return CURRENT_AFFAIRS.filter(article => {
    if (!article.active) return false;

    return (
      article.date >= startDate &&
      article.date <= endDate
    );
  });
}