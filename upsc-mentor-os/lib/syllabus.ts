import {
  PRELIMS_SYLLABUS,
  GS1_SYLLABUS,
  GS2_SYLLABUS,
  GS3_SYLLABUS,
  GS4_SYLLABUS,
  ESSAY_SYLLABUS,
  PSIR_PAPER1_SYLLABUS,
  PSIR_PAPER2_SYLLABUS,
  INTERVIEW_SYLLABUS,
} from "./syllabus";

export const UPSC_SYLLABUS = {
  Prelims: PRELIMS_SYLLABUS,

  Mains: {
    "GS I": GS1_SYLLABUS,
    "GS II": GS2_SYLLABUS,
    "GS III": GS3_SYLLABUS,
    "GS IV": GS4_SYLLABUS,
    Essay: ESSAY_SYLLABUS,
    "PSIR Paper I": PSIR_PAPER1_SYLLABUS,
    "PSIR Paper II": PSIR_PAPER2_SYLLABUS,
  },

  Interview: INTERVIEW_SYLLABUS,
} as const;

/* ==========================================================
   Quick Access Lists
========================================================== */

export const PRELIMS_PAPERS = Object.keys(
  UPSC_SYLLABUS.Prelims.papers
);

export const MAINS_PAPERS = Object.keys(
  UPSC_SYLLABUS.Mains
);

export const ALL_EXAMS = Object.keys(
  UPSC_SYLLABUS
);

/* ==========================================================
   Export
========================================================== */

export default UPSC_SYLLABUS;