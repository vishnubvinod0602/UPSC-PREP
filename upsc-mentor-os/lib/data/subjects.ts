import subjects from "./json/subjects.json";
import type { SubjectId } from "../constants";

export interface Subject {
  id: SubjectId;
  name: string;

  studyHours: number;

  difficulty: "Easy" | "Medium" | "Hard";

  pyqWeightage: "Low" | "Medium" | "High" | "Very High";

  revisionPriority: "Low" | "Medium" | "High" | "Highest";

  papers: string[];

  active: boolean;
}

const SUBJECTS = subjects as Subject[];

/**
 * Get all active subjects.
 */
export function getSubjects(): Subject[] {
  return SUBJECTS.filter(subject => subject.active);
}

/**
 * Get all subjects.
 */
export function getAllSubjects(): Subject[] {
  return SUBJECTS;
}

/**
 * Get a subject by ID.
 */
export function getSubject(id: SubjectId): Subject | undefined {
  return SUBJECTS.find(subject => subject.id === id);
}

/**
 * Check if a subject exists.
 */
export function hasSubject(id: SubjectId): boolean {
  return SUBJECTS.some(subject => subject.id === id);
}