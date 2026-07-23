import { UPSC_SETTINGS } from "../constants";
import type { SubjectId } from "../constants";

export interface RevisionSession {
  revisionNumber: number;
  dayOffset: number;
}

export interface RevisionPlan {
  subjectId: SubjectId;
  sessions: RevisionSession[];
}

/**
 * Returns the default revision intervals.
 */
export function getRevisionIntervals(): number[] {
  return [...UPSC_SETTINGS.revisionIntervals];
}

/**
 * Creates a revision schedule for a subject.
 */
export function createRevisionPlan(
  subjectId: SubjectId,
): RevisionPlan {
  return {
    subjectId,
    sessions: UPSC_SETTINGS.revisionIntervals.map(
      (dayOffset, index) => ({
        revisionNumber: index + 1,
        dayOffset,
      }),
    ),
  };
}

/**
 * Returns the next revision day.
 */
export function getNextRevisionDay(
  completedDays: number,
): number | null {
  return (
    UPSC_SETTINGS.revisionIntervals.find(
      day => day > completedDays,
    ) ?? null
  );
}

/**
 * Checks if revision is due.
 */
export function isRevisionDue(
  completedDays: number,
): boolean {
  return UPSC_SETTINGS.revisionIntervals.includes(
    completedDays,
  );
}

/**
 * Returns completed revision count.
 */
export function getCompletedRevisionCount(
  completedDays: number,
): number {
  return UPSC_SETTINGS.revisionIntervals.filter(
    day => day <= completedDays,
  ).length;
}

/**
 * Returns remaining revision count.
 */
export function getRemainingRevisionCount(
  completedDays: number,
): number {
  return UPSC_SETTINGS.revisionIntervals.filter(
    day => day > completedDays,
  ).length;
}

/**
 * Returns revision progress.
 */
export function getRevisionProgress(
  completedDays: number,
): number {
  const total =
    UPSC_SETTINGS.revisionIntervals.length;

  const completed =
    getCompletedRevisionCount(completedDays);

  return Math.round((completed / total) * 100);
}

/**
 * Returns the final revision day.
 */
export function getFinalRevisionDay(): number {
  return Math.max(
    ...UPSC_SETTINGS.revisionIntervals,
  );
}