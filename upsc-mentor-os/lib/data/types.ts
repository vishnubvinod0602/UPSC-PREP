import type { SubjectId } from "../constants";
import type {
  PRIORITIES,
  PYQ_WEIGHTAGES,
  REVISION_PRIORITIES,
} from "../constants/priorities";
import type { DIFFICULTIES } from "../constants/difficulty";
import type { RESOURCE_CATEGORIES } from "../constants/categories";

export type Priority =
  (typeof PRIORITIES)[number];

export type Difficulty =
  (typeof DIFFICULTIES)[number];

export type ResourceCategory =
  (typeof RESOURCE_CATEGORIES)[number];

export type PyqWeightage =
  (typeof PYQ_WEIGHTAGES)[number];

export type RevisionPriority =
  (typeof REVISION_PRIORITIES)[number];

export type ExamStage =
  | "Prelims"
  | "Mains"
  | "Interview"
  | "CSAT"
  | "Essay"
  | "Optional";

export interface BaseEntity {
  id: string;

  active: boolean;

  createdAt?: string;

  updatedAt?: string;
}

export interface SubjectEntity extends BaseEntity {
  id: SubjectId;

  name: string;

  studyHours: number;

  difficulty: Difficulty;

  pyqWeightage: PyqWeightage;

  revisionPriority: RevisionPriority;

  papers: ExamStage[];
}

export interface ResourceEntity extends BaseEntity {
  subjectId: SubjectId;

  category: ResourceCategory;

  type: string;

  name: string;

  author?: string;

  provider?: string;

  publisher?: string;

  class?: string;

  priority: Priority;

  source?: string;

  url?: string;

  tags?: string[];
}

export interface PYQEntity extends BaseEntity {
  subjectId: SubjectId;

  year: number;

  paper: ExamStage;

  question: string;

  marks: number;

  topic: string;

  subtopic?: string;

  difficulty: Difficulty;
}

export interface CurrentAffairEntity extends BaseEntity {
  subjectId: SubjectId;

  title: string;

  source: string;

  date: string;

  summary: string;

  tags: string[];

  importance: Priority;
}

export interface TestEntity extends BaseEntity {
  subjectId: SubjectId;

  title: string;

  paper: ExamStage;

  provider: string;

  totalMarks: number;

  duration: number;

  questions: number;

  url?: string;
}