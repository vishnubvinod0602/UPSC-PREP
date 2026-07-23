import type { SubjectId } from "../constants";

import {
  getSubjects,
} from "../data/subjects";

import {
  calculateSubjectProgress,
  type SubjectProgress,
} from "./tracker";

export interface AnalyticsSummary {
  totalSubjects: number;

  completedSubjects: number;

  averageProgress: number;

  totalStudyHours: number;

  completedStudyHours: number;

  remainingStudyHours: number;
}

/**
 * Overall analytics.
 */
export function getAnalytics(
  progress: SubjectProgress[],
): AnalyticsSummary {
  const subjects = getSubjects();

  const completedSubjects =
    progress.filter(
      item =>
        calculateSubjectProgress(item) >= 100,
    ).length;

  const totalStudyHours =
    progress.reduce(
      (sum, item) =>
        sum + item.totalHours,
      0,
    );

  const completedStudyHours =
    progress.reduce(
      (sum, item) =>
        sum + item.completedHours,
      0,
    );

  const averageProgress =
    progress.length === 0
      ? 0
      : Math.round(
          progress.reduce(
            (sum, item) =>
              sum +
              calculateSubjectProgress(item),
            0,
          ) / progress.length,
        );

  return {
    totalSubjects: subjects.length,
    completedSubjects,
    averageProgress,
    totalStudyHours,
    completedStudyHours,
    remainingStudyHours:
      totalStudyHours -
      completedStudyHours,
  };
}

/**
 * Top progressing subjects.
 */
export function getTopSubjects(
  progress: SubjectProgress[],
  limit = 5,
) {
  return [...progress]
    .sort(
      (a, b) =>
        calculateSubjectProgress(b) -
        calculateSubjectProgress(a),
    )
    .slice(0, limit);
}

/**
 * Lowest progressing subjects.
 */
export function getBottomSubjects(
  progress: SubjectProgress[],
  limit = 5,
) {
  return [...progress]
    .sort(
      (a, b) =>
        calculateSubjectProgress(a) -
        calculateSubjectProgress(b),
    )
    .slice(0, limit);
}

/**
 * Progress of a single subject.
 */
export function getSubjectAnalytics(
  progress: SubjectProgress[],
  subjectId: SubjectId,
) {
  const subject = progress.find(
    item =>
      item.subjectId === subjectId,
  );

  if (!subject) {
    return null;
  }

  const percentage =
    calculateSubjectProgress(subject);

  return {
    ...subject,
    percentage,
    remainingHours:
      subject.totalHours -
      subject.completedHours,
  };
}

/**
 * Total completed hours.
 */
export function getCompletedHours(
  progress: SubjectProgress[],
): number {
  return progress.reduce(
    (sum, item) =>
      sum + item.completedHours,
    0,
  );
}

/**
 * Total remaining hours.
 */
export function getRemainingHours(
  progress: SubjectProgress[],
): number {
  return progress.reduce(
    (sum, item) =>
      sum +
      (item.totalHours -
        item.completedHours),
    0,
  );
}

/**
 * Completion percentage.
 */
export function getCompletionPercentage(
  progress: SubjectProgress[],
): number {
  const total =
    progress.reduce(
      (sum, item) =>
        sum + item.totalHours,
      0,
    );

  if (total === 0) {
    return 0;
  }

  const completed =
    getCompletedHours(progress);

  return Math.round(
    (completed / total) * 100,
  );
}

/**
 * Dashboard analytics.
 */
export function getDashboardAnalytics(
  progress: SubjectProgress[],
) {
  return {
    analytics: getAnalytics(progress),
    topSubjects: getTopSubjects(progress),
    bottomSubjects:
      getBottomSubjects(progress),
    completion:
      getCompletionPercentage(progress),
  };
}