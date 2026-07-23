import type { TopicProgress } from "./topics";

/* ==========================================================
   Revision Intervals (Days)
========================================================== */

export const REVISION_INTERVALS = [
  1,
  3,
  7,
  15,
  30,
  60,
  90,
  180,
] as const;

export type RevisionLevel =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8;

/* ==========================================================
   Revision Record
========================================================== */

export interface RevisionSchedule {
  topicId: string;

  level: RevisionLevel;

  completed: boolean;

  lastRevision: string;

  nextRevision: string;
}

/* ==========================================================
   Helpers
========================================================== */

export function getRevisionInterval(
  level: RevisionLevel
): number {
  if (level === 0) return 0;

  return REVISION_INTERVALS[level - 1] ?? 180;
}

export function calculateNextRevision(
  date: Date,
  level: RevisionLevel
): Date {
  const next = new Date(date);

  next.setDate(
    next.getDate() + getRevisionInterval(level)
  );

  return next;
}

export function isRevisionDue(
  nextRevision: string
): boolean {
  return new Date(nextRevision) <= new Date();
}

/* ==========================================================
   Progress Helpers
========================================================== */

export function incrementRevision(
  progress: TopicProgress
): TopicProgress {
  const today = new Date();

  const nextLevel = Math.min(
    progress.revisionCount + 1,
    REVISION_INTERVALS.length
  ) as RevisionLevel;

  return {
    ...progress,

    revisionCount: nextLevel,

    lastStudied: today.toISOString(),

    nextRevision: calculateNextRevision(
      today,
      nextLevel
    ).toISOString(),
  };
}

export function resetRevision(
  progress: TopicProgress
): TopicProgress {
  return {
    ...progress,

    revisionCount: 0,

    nextRevision: undefined,
  };
}