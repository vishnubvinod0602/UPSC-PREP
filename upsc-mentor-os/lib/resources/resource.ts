import type { Exam, Paper } from "../topics";

/* ==========================================================
   Types
========================================================== */

export type BookPriority = "Essential" | "Recommended" | "Reference";

export interface Book {
  id: string;

  title: string;

  author: string;

  priority: BookPriority;

  exam: Exam;

  paper: Paper;

  subject: string;

  description?: string;
}

/* ==========================================================
   Standard UPSC Books
========================================================== */

export const BOOKS: Book[] = [
  // ---------- POLITY ----------
  {
    id: "polity-laxmikanth",
    title: "Indian Polity",
    author: "M. Laxmikanth",
    priority: "Essential",
    exam: "Prelims",
    paper: "GS Paper I",
    subject: "Indian Polity",
  },
{
    id: "polity-notes-p",
    title: "Polity Notes",
    author: "Fortune",
    priority: "Essential",
    exam: "Prelims",
    paper: "GS Paper I",
    subject: "Indian Polity",
  },
  {
    id: "polity-notes-m",
    title: "Polity Notes",
    author: "Fortune",
    priority: "Essential",
    exam: "Mains",
    paper: "GS Paper I",
    subject: "Indian Polity",
  },
  {
    id: "constitution-dbasu",
    title: "Introduction to the Constitution of India",
    author: "D. D. Basu",
    priority: "Reference",
    exam: "Mains",
    paper: "GS II",
    subject: "Polity",
  },

  // ---------- HISTORY ----------
  {
    id: "history-spectrum",
    title: "A Brief History of Modern India",
    author: "Spectrum",
    priority: "Essential",
    exam: "Prelims",
    paper: "GS Paper I",
    subject: "Modern History",
  },
{
    id: "modern-fortune",
    title: "Modern History",
    author: "Fortune",
    priority: "Recommended",
    exam: "Prelims",
    paper: "GS Paper I",
    subject: "Modern History",
  },
  {
    id: "history-bipan",
    title: "India's Struggle for Independence",
    author: "Bipan Chandra",
    priority: "Recommended",
    exam: "Mains",
    paper: "GS I",
    subject: "History",
  },

  // ---------- GEOGRAPHY ----------
  {
    id: "geography-gc-leong-p",
    title: "Certificate Physical and Human Geography",
    author: "G. C. Leong",
    priority: "Essential",
    exam: "Prelims",
    paper: "GS Paper I",
    subject: "World Geography",
  },
  {
    id: "phgeography-fortune-p",
    title: "Physical Geography",
    author: "Fortune",
    priority: "Essential",
    exam: "Prelims",
    paper: "GS Paper I",
    subject: "World Geography",
  },
  {
    id: "ingeography-fortune-p",
    title: "Indian Geography",
    author: "Fortune",
    priority: "Essential",
    exam: "Prelims",
    paper: "GS Paper I",
    subject: "Indian Geography",
  },
  {
    id: "ph-classnotes-p",
    title: "Physical Geography",
    author: "Fortune",
    priority: "Essential",
    exam: "Prelims",
    paper: "GS Paper I",
    subject: "Physical Geography",
  },
{
    id: "in-classnotes-p",
    title: "Indian Geography",
    author: "Fortune",
    priority: "Essential",
    exam: "Prelims",
    paper: "GS Paper I",
    subject: "Indian Geography",
  },
    {
    id: "geography-gc-leong-m",
    title: "Certificate Physical and Human Geography",
    author: "G. C. Leong",
    priority: "Essential",
    exam: "Mains",
    paper: "GS Paper I",
    subject: "World Geography",
  },
  {
    id: "phgeography-fortune-p",
    title: "Physical Geography",
    author: "Fortune",
    priority: "Essential",
    exam: "Mains",
    paper: "GS Paper I",
    subject: "World Geography",
  },
  {
    id: "ingeography-fortune-p",
    title: "Indian Geography",
    author: "Fortune",
    priority: "Essential",
    exam: "Mains",
    paper: "GS Paper I",
    subject: "Indian Geography",
  },
{
    id: "ph-classnotes-p",
    title: "Physical Geography",
    author: "Fortune",
    priority: "Essential",
    exam: "Mains",
    paper: "GS Paper I",
    subject: "Physical Geography",
  },
  {
    id: "in-classnotes-p",
    title: "Indian Geography",
    author: "Fortune",
    priority: "Essential",
    exam: "Mains",
    paper: "GS Paper I",
    subject: "Indian Geography",
  },

  // ---------- ECONOMY ----------
  {
    id: "economy-ramesh-singh",
    title: "Indian Economy",
    author: "Ramesh Singh",
    priority: "Recommended",
    exam: "Prelims",
    paper: "GS Paper I",
    subject: "Indian Economy",
  },

  // ---------- ENVIRONMENT ----------
  {
    id: "environment-shankar",
    title: "Environment",
    author: "Shankar IAS",
    priority: "Essential",
    exam: "Prelims",
    paper: "GS Paper I",
    subject: "Ecology & Environment",
  },

  // ---------- ETHICS ----------
  {
    id: "ethics-lexicon",
    title: "Lexicon for Ethics",
    author: "Chronicle",
    priority: "Recommended",
    exam: "Mains",
    paper: "GS IV",
    subject: "Ethics",
  },

  // ---------- PSIR ----------
  {
    id: "psir-op-gauba",
    title: "An Introduction to Political Theory",
    author: "O. P. Gauba",
    priority: "Essential",
    exam: "Mains",
    paper: "PSIR Paper I",
    subject: "Political Theory",
  },

  {
    id: "psir-andrew-heywood",
    title: "Political Theory",
    author: "Andrew Heywood",
    priority: "Reference",
    exam: "Mains",
    paper: "PSIR Paper I",
    subject: "Political Theory",
  },
];

/* ==========================================================
   Helpers
========================================================== */

export function getBooksByExam(exam: Exam) {
  return BOOKS.filter((book) => book.exam === exam);
}

export function getBooksByPaper(paper: Paper) {
  return BOOKS.filter((book) => book.paper === paper);
}

export function getBooksBySubject(subject: string) {
  return BOOKS.filter((book) => book.subject === subject);
}

export function getEssentialBooks() {
  return BOOKS.filter((book) => book.priority === "Essential");
}