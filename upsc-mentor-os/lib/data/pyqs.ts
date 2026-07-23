import pyqs from "./pyqs.json";

import type { SubjectId } from "../constants";
import type {
  Difficulty,
  ExamStage,
} from "./types";

export interface PYQ {
  id: string;

  subjectId: SubjectId;

  year: number;

  exam: string;

  paper: ExamStage;

  questionNumber: number;

  type: string;

  question: string;

  options?: string[];

  correctAnswer?: string;

  explanation?: string;

  marks: number;

  negativeMarks?: number;

  topic: string;

  subtopic?: string;

  difficulty: Difficulty;

  source?: string;

  tags?: string[];

  linkedResources?: string[];

  linkedCurrentAffairs?: string[];

  aiHints?: string[];

  active: boolean;
}

const PYQS: PYQ[] = pyqs as PYQ[];

/**
 * Get all active PYQs.
 */
export function getPYQs(): PYQ[] {
  return PYQS.filter(pyq => pyq.active);
}

/**
 * Get PYQs by subject.
 */
export function getPYQsBySubject(
  subjectId: SubjectId,
): PYQ[] {
  return PYQS.filter(
    pyq =>
      pyq.subjectId === subjectId &&
      pyq.active,
  );
}

/**
 * Get PYQs by year.
 */
export function getPYQsByYear(
  year: number,
): PYQ[] {
  return PYQS.filter(
    pyq =>
      pyq.year === year &&
      pyq.active,
  );
}

/**
 * Get PYQs by paper.
 */
export function getPYQsByPaper(
  paper: ExamStage,
): PYQ[] {
  return PYQS.filter(
    pyq =>
      pyq.paper === paper &&
      pyq.active,
  );
}

/**
 * Get PYQs by topic.
 */
export function getPYQsByTopic(
  topic: string,
): PYQ[] {
  return PYQS.filter(
    pyq =>
      pyq.topic === topic &&
      pyq.active,
  );
}

/**
 * Search PYQs.
 */
export function searchPYQs(
  query: string,
): PYQ[] {
  const search = query.toLowerCase();

  return PYQS.filter(
    pyq =>
      pyq.active &&
      (
        pyq.question
          .toLowerCase()
          .includes(search) ||
        pyq.topic
          .toLowerCase()
          .includes(search) ||
        pyq.subtopic
          ?.toLowerCase()
          .includes(search)
      ),
  );
}

/**
 * Get a PYQ by ID.
 */
export function getPYQ(
  id: string,
): PYQ | undefined {
  return PYQS.find(
    pyq => pyq.id === id,
  );
}