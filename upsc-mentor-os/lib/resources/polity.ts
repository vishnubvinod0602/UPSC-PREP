import type { SubjectResources } from "./types";

export const POLITY_RESOURCES: SubjectResources = {
  id: "indian-polity",

  subject: "Indian Polity",

  description:
    "Resources for UPSC Prelims, GS Paper II, Essay and Interview.",

  estimatedStudyHours: 120,

  difficulty: "Medium",

  pyqWeightage: "Very High",

  revisionPriority: "Highest",

  prerequisites: [],

  coreResources: {
    textbook: "laxmikanth",
    ncert: "ncert-11-constitution",
    coachingNotes: "vision-polity",
    governmentSource: "constitution-of-india",
    newspaper: "the-hindu",
    magazine: "yojana",
    revision: "mind-maps",
  },

  studySequence: [
    "ncert-11-constitution",
    "laxmikanth",
    "vision-polity",
    "constitution-of-india",
    "the-hindu",
    "yojana",
    "mind-maps",
  ],

  textbooks: {
    id: "textbooks",
    title: "Textbooks",
    resources: [],
  },

  ncerts: {
    id: "ncerts",
    title: "NCERTs",
    resources: [],
  },

  coachingNotes: {
    id: "coaching-notes",
    title: "Coaching Notes",
    resources: [],
  },

  governmentSources: {
    id: "government-sources",
    title: "Government Sources",
    resources: [],
  },

  reports: {
    id: "reports",
    title: "Reports",
    resources: [],
  },

  websites: {
    id: "websites",
    title: "Websites",
    resources: [],
  },

  newspapers: {
    id: "newspapers",
    title: "Newspapers",
    resources: [],
  },

  magazines: {
    id: "magazines",
    title: "Magazines",
    resources: [],
  },

  currentAffairs: {
    id: "current-affairs",
    title: "Current Affairs",
    resources: [],
  },

  revisionSources: {
    id: "revision",
    title: "Revision Sources",
    resources: [],
  },

  answerWriting: {
    valueAdditions: [],
    diagrams: [],
    examples: [],
    quotes: [],
    caseStudies: [],
  },
} as const;