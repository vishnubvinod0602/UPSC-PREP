/* ============================================================================
 * Common Types
 * ========================================================================== */

export type Priority =
  | "Essential"
  | "Recommended"
  | "Reference"
  | "Optional";

export type Weightage =
  | "Low"
  | "Medium"
  | "High"
  | "Very High";

export type RevisionPriority =
  | "Low"
  | "Medium"
  | "High"
  | "Highest";

export type Difficulty =
  | "Easy"
  | "Medium"
  | "Hard";

/* ============================================================================
 * Base Resource
 * ========================================================================== */

export interface BaseResource {
  id: string;
  name: string;

  priority: Priority;

  description?: string;
  url?: string;
  tags?: string[];
}

/* ============================================================================
 * Resource Types
 * ========================================================================== */

export interface BookResource extends BaseResource {
  author: string;
  publisher?: string;
  edition?: string;
}

export interface NCERTResource extends BaseResource {
  class: string;
}

export interface CoachingNoteResource extends BaseResource {
  provider: string;
}

/**
 * Generic resource used for reports, websites,
 * newspapers, magazines, government sources, etc.
 */
export interface Resource extends BaseResource {
  source?: string;
  type?: string;
}

/* ============================================================================
 * Resource Category
 * ========================================================================== */

export interface ResourceCategory<T extends BaseResource> {
  id: string;
  title: string;
  description?: string;

  resources: T[];
}

/* ============================================================================
 * Core Resources
 * ========================================================================== */

export interface CoreResources {
  textbook?: string;
  ncert?: string;
  coachingNotes?: string;
  governmentSource?: string;
  report?: string;
  newspaper?: string;
  magazine?: string;
  revision?: string;
}

/* ============================================================================
 * Answer Writing
 * ========================================================================== */

export interface AnswerWriting {
  valueAdditions: string[];
  diagrams: string[];

  examples?: string[];
  quotes?: string[];
  caseStudies?: string[];
}

/* ============================================================================
 * Subject Resources
 * ========================================================================== */

export interface SubjectResources {
  id: string;

  subject: string;

  description: string;

  estimatedStudyHours: number;

  difficulty: Difficulty;

  pyqWeightage: Weightage;

  revisionPriority: RevisionPriority;

  prerequisites: string[];

  /**
   * IDs of the primary resources.
   */
  coreResources: CoreResources;

  /**
   * Ordered list of resource IDs representing
   * the recommended study flow.
   */
  studySequence: string[];

  textbooks: ResourceCategory<BookResource>;

  ncerts: ResourceCategory<NCERTResource>;

  coachingNotes: ResourceCategory<CoachingNoteResource>;

  governmentSources: ResourceCategory<Resource>;

  reports: ResourceCategory<Resource>;

  websites: ResourceCategory<Resource>;

  newspapers: ResourceCategory<Resource>;

  magazines: ResourceCategory<Resource>;

  currentAffairs: ResourceCategory<Resource>;

  revisionSources: ResourceCategory<Resource>;

  answerWriting: AnswerWriting;
}