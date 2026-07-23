import tests from "./json/tests.json";

import type { SubjectId } from "../constants";
import type { ExamStage } from "./types";

export interface Test {
  id: string;

  subjectId: SubjectId;

  title: string;

  paper: ExamStage;

  provider: string;

  totalMarks: number;

  duration: number;

  questions: number;

  url?: string;

  active: boolean;
}

const TESTS = tests as Test[];

/**
 * Get all active tests.
 */
export function getTests(): Test[] {
  return TESTS.filter(test => test.active);
}

/**
 * Get tests by subject.
 */
export function getTestsBySubject(
  subjectId: SubjectId,
): Test[] {
  return TESTS.filter(
    test =>
      test.subjectId === subjectId &&
      test.active,
  );
}

/**
 * Get tests by paper.
 */
export function getTestsByPaper(
  paper: ExamStage,
): Test[] {
  return TESTS.filter(
    test =>
      test.paper === paper &&
      test.active,
  );
}

/**
 * Get tests by provider.
 */
export function getTestsByProvider(
  provider: string,
): Test[] {
  const search = provider.toLowerCase();

  return TESTS.filter(
    test =>
      test.active &&
      test.provider
        .toLowerCase()
        .includes(search),
  );
}

/**
 * Search tests.
 */
export function searchTests(
  query: string,
): Test[] {
  const search = query.toLowerCase();

  return TESTS.filter(
    test =>
      test.active &&
      (
        test.title
          .toLowerCase()
          .includes(search) ||
        test.provider
          .toLowerCase()
          .includes(search)
      ),
  );
}

/**
 * Get a test by ID.
 */
export function getTest(
  id: string,
): Test | undefined {
  return TESTS.find(
    test => test.id === id,
  );
}

/**
 * Get mock tests only.
 */
export function getMockTests(): Test[] {
  return TESTS.filter(
    test =>
      test.active &&
      test.title
        .toLowerCase()
        .includes("mock"),
  );
}

/**
 * Get sectional tests only.
 */
export function getSectionalTests(): Test[] {
  return TESTS.filter(
    test =>
      test.active &&
      test.title
        .toLowerCase()
        .includes("sectional"),
  );
}