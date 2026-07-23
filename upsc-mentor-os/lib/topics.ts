import type {
  EXAMS,
  PAPERS,
  ACTIVITIES,
  PRIORITIES,
} from "./upsc";

/* ==========================================================
   Derived Types
========================================================== */

export type Exam = (typeof EXAMS)[number];
export type Paper = (typeof PAPERS)[number];
export type Activity = (typeof ACTIVITIES)[number];
export type Priority = (typeof PRIORITIES)[number];

export type Difficulty = "Easy" | "Medium" | "Hard";

/* ==========================================================
   Topic
========================================================== */

export interface Topic {
  id: string;

  exam: Exam;

  paper: Paper;

  subject: string;

  name: string;

  description?: string;

  difficulty?: Difficulty;

  estimatedHours?: number;

  weightage?: number;

  tags?: string[];

  books?: string[];

  ncerts?: string[];

  pyqs?: string[];

  currentAffairs?: string[];

  subTopics?: string[];
}

/* ==========================================================
   Topic Progress
========================================================== */

export interface TopicProgress {
  topicId: string;

  completed: boolean;

  completionDate?: string;

  studyHours: number;

  revisionCount: number;

  nextRevision?: string;

  lastStudied?: string;

  pyqsSolved: number;

  notesCreated: number;

  weakArea: boolean;

  confidence: number; // 0-100
}

/* ==========================================================
   Planner
========================================================== */

export interface PlannedTopic {
  id: string;

  topicId: string;

  activity: Activity;

  priority: Priority;

  date: string;

  start: string;

  end: string;

  completed: boolean;
}

/* ==========================================================
   Revision
========================================================== */

export interface RevisionRecord {
  topicId: string;

  revisionNumber: number;

  revisionDate: string;

  nextRevision: string;

  completed: boolean;
}

/* ==========================================================
   Notes
========================================================== */

export interface TopicNote {
  id: string;

  topicId: string;

  title: string;

  createdAt: string;

  updatedAt: string;
}

/* ==========================================================
   PYQs
========================================================== */

export interface TopicPYQ {
  id: string;

  topicId: string;

  year: number;

  marks: number;

  solved: boolean;
}

/* ==========================================================
   Analytics
========================================================== */

export interface ProgressSummary {
  total: number;

  completed: number;

  pending: number;

  percentage: number;
}

export interface SubjectProgress extends ProgressSummary {
  subject: string;
}

export interface PaperProgress extends ProgressSummary {
  paper: Paper;
}

export interface ExamProgress extends ProgressSummary {
  exam: Exam;
}

/* ==========================================================
   Dashboard
========================================================== */

export interface DashboardStats {
  totalTopics: number;

  completedTopics: number;

  revisionDue: number;

  studyHours: number;

  streak: number;

  weakTopics: number;

  pyqsSolved: number;
}