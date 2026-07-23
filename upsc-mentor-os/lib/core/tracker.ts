import type { SubjectId } from "../constants";

import {
  getSubject,
  getSubjects,
} from "../data/subjects";

export interface SubjectProgress {
  subjectId: SubjectId;

  completedHours: number;

  totalHours: number;
}

export interface TrackerSummary {
  totalSubjects: number;

  completedSubjects: number;

  totalHours: number;

  completedHours: number;

  progress: number;
}

/**
 * Calculate progress for a subject.
 */
export function calculateSubjectProgress(
  progress: SubjectProgress,
): number {
  if (progress.totalHours <= 0) {
    return 0;
  }

  return Math.min(
    100,
    Math.round(
      (progress.completedHours /
        progress.totalHours) *
        100,
    ),
  );
}

/**
 * Check if a subject is completed.
 */
export function isSubjectCompleted(
  progress: SubjectProgress,
): boolean {
  return (
    calculateSubjectProgress(progress) >=
    100
  );
}

/**
 * Remaining study hours.
 */
export function getRemainingHours(
  progress: SubjectProgress,
): number {
  return Math.max(
    0,
    progress.totalHours -
      progress.completedHours,
  );
}

/**
 * Build overall tracker summary.
 */
export function getTrackerSummary(
  progress: SubjectProgress[],
): TrackerSummary {
  const totalSubjects =
    getSubjects().length;

  const completedSubjects =
    progress.filter(isSubjectCompleted)
      .length;

  const totalHours = progress.reduce(
    (sum, item) =>
      sum + item.totalHours,
    0,
  );

  const completedHours =
    progress.reduce(
      (sum, item) =>
        sum + item.completedHours,
      0,
    );

  const overallProgress =
    totalHours === 0
      ? 0
      : Math.round(
          (completedHours /
            totalHours) *
            100,
        );

  return {
    totalSubjects,
    completedSubjects,
    totalHours,
    completedHours,
    progress: overallProgress,
  };
}

/**
 * Create an empty tracker for all subjects.
 */
export function initializeTracker(): SubjectProgress[] {
  return getSubjects().map(subject => ({
    subjectId: subject.id,
    completedHours: 0,
    totalHours: subject.studyHours,
  }));
}

/**
 * Get progress for a single subject.
 */
export function getSubjectProgress(
  progress: SubjectProgress[],
  subjectId: SubjectId,
): SubjectProgress | undefined {
  return progress.find(
    item =>
      item.subjectId === subjectId,
  );
}

/**
 * Update completed hours for a subject.
 */
export function updateSubjectProgress(
  progress: SubjectProgress[],
  subjectId: SubjectId,
  completedHours: number,
): SubjectProgress[] {
  return progress.map(item =>
    item.subjectId === subjectId
      ? {
          ...item,
          completedHours: Math.min(
            completedHours,
            item.totalHours,
          ),
        }
      : item,
  );
}

/**
 * Get subject name.
 */
export function getSubjectName(
  subjectId: SubjectId,
): string | null {
  return (
    getSubject(subjectId)?.name ??
    null
  );
}