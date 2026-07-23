import type { SubjectId } from "../constants";

import { UPSC_SETTINGS } from "../constants";
import {
  getSubject,
  getSubjects,
} from "../data/subjects";

export interface StudyPlan {
  subjectId: SubjectId;

  subject: string;

  plannedHours: number;

  dailyHours: number;

  estimatedDays: number;
}

/**
 * Build a study plan for all active subjects.
 */
export function createStudyPlan(): StudyPlan[] {
  return getSubjects().map(subject => ({
    subjectId: subject.id,
    subject: subject.name,
    plannedHours: subject.studyHours,
    dailyHours: Math.min(
      UPSC_SETTINGS.dailyStudyHours,
      subject.studyHours,
    ),
    estimatedDays: Math.ceil(
      subject.studyHours /
        UPSC_SETTINGS.dailyStudyHours,
    ),
  }));
}

/**
 * Get a study plan for one subject.
 */
export function createSubjectPlan(
  subjectId: SubjectId,
): StudyPlan | null {
  const subject = getSubject(subjectId);

  if (!subject) {
    return null;
  }

  return {
    subjectId: subject.id,
    subject: subject.name,
    plannedHours: subject.studyHours,
    dailyHours: Math.min(
      UPSC_SETTINGS.dailyStudyHours,
      subject.studyHours,
    ),
    estimatedDays: Math.ceil(
      subject.studyHours /
        UPSC_SETTINGS.dailyStudyHours,
    ),
  };
}

/**
 * Total planned study hours.
 */
export function getTotalStudyHours(): number {
  return getSubjects().reduce(
    (total, subject) =>
      total + subject.studyHours,
    0,
  );
}

/**
 * Estimated preparation duration.
 */
export function getEstimatedPreparationDays(): number {
  return Math.ceil(
    getTotalStudyHours() /
      UPSC_SETTINGS.dailyStudyHours,
  );
}

/**
 * Subjects ordered by study hours.
 */
export function getSubjectsByStudyHours(): StudyPlan[] {
  return createStudyPlan().sort(
    (a, b) =>
      b.plannedHours - a.plannedHours,
  );
}

/**
 * Daily target.
 */
export function getDailyTarget() {
  return {
    hours: UPSC_SETTINGS.dailyStudyHours,
    maxSubjects:
      UPSC_SETTINGS.maxSubjectsPerDay,
  };
}
