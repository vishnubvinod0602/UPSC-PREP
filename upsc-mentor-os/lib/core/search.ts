import type { SubjectId } from "../constants";

import {
  getSubjects,
  getSubject,
} from "../data/subjects";

import {
  getResources,
} from "../data/resources";

import {
  getPYQs,
} from "../data/pyqs";

import {
  getCurrentAffairs,
} from "../data/current-affairs";

import {
  getTests,
} from "../data/tests";

export interface SearchResult {
  id: string;

  type:
    | "subject"
    | "resource"
    | "pyq"
    | "current-affair"
    | "test";

  title: string;

  subjectId?: SubjectId;

  subtitle?: string;
}

/**
 * Search everything.
 */
export function searchAll(
  query: string,
): SearchResult[] {
  const search = query.trim().toLowerCase();

  if (!search) {
    return [];
  }

  const results: SearchResult[] = [];

  // Subjects
  getSubjects().forEach(subject => {
    if (
      subject.name
        .toLowerCase()
        .includes(search)
    ) {
      results.push({
        id: subject.id,
        type: "subject",
        title: subject.name,
      });
    }
  });

  // Resources
  getResources().forEach(resource => {
    if (
      resource.name
        .toLowerCase()
        .includes(search) ||
      resource.tags?.some(tag =>
        tag.toLowerCase().includes(search),
      )
    ) {
      results.push({
        id: resource.id,
        type: "resource",
        title: resource.name,
        subjectId: resource.subjectId,
        subtitle: resource.category,
      });
    }
  });

  // PYQs
  getPYQs().forEach(pyq => {
    if (
      pyq.question
        .toLowerCase()
        .includes(search) ||
      pyq.topic
        .toLowerCase()
        .includes(search)
    ) {
      results.push({
        id: pyq.id,
        type: "pyq",
        title: pyq.question,
        subjectId: pyq.subjectId,
        subtitle: `${pyq.year} • ${pyq.paper}`,
      });
    }
  });

  // Current Affairs
  getCurrentAffairs().forEach(article => {
    if (
      article.title
        .toLowerCase()
        .includes(search) ||
      article.tags.some(tag =>
        tag.toLowerCase().includes(search),
      )
    ) {
      results.push({
        id: article.id,
        type: "current-affair",
        title: article.title,
        subjectId: article.subjectId,
        subtitle: article.date,
      });
    }
  });

  // Tests
  getTests().forEach(test => {
    if (
      test.title
        .toLowerCase()
        .includes(search)
    ) {
      results.push({
        id: test.id,
        type: "test",
        title: test.title,
        subjectId: test.subjectId,
        subtitle: test.provider,
      });
    }
  });

  return results;
}

/**
 * Search only subjects.
 */
export function searchSubjects(
  query: string,
) {
  const search = query.toLowerCase();

  return getSubjects().filter(subject =>
    subject.name
      .toLowerCase()
      .includes(search),
  );
}

/**
 * Check whether a subject exists.
 */
export function subjectExists(
  subjectId: SubjectId,
): boolean {
  return getSubject(subjectId) !== undefined;
}