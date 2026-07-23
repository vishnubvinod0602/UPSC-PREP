import { Subject } from "@/lib/types/subject";
export const DEFAULT_SUBJECTS: Subject[] = [
  // Essay
  {
    id: "essay",
    name: "Essay",
    papers: ["Essay"],
    active: true,
  },

  // GS I
  {
    id: "ancient-history",
    name: "Ancient History",
    papers: ["Prelims", "GS I"],
    active: true,
  },
  {
    id: "medieval-history",
    name: "Medieval History",
    papers: ["Prelims", "GS I"],
    active: true,
  },
  {
    id: "modern-history",
    name: "Modern History",
    papers: ["Prelims", "GS I"],
    active: true,
  },
  {
    id: "art-culture",
    name: "Art & Culture",
    papers: ["Prelims", "GS I"],
    active: true,
  },
  {
    id: "indian-geography",
    name: "Indian Geography",
    papers: ["Prelims", "GS I"],
    active: true,
  },
  {
    id: "world-geography",
    name: "World Geography",
    papers: ["Prelims", "GS I"],
    active: true,
  },
  {
    id: "society",
    name: "Indian Society",
    papers: ["GS I"],
    active: true,
  },

  // GS II
  {
    id: "indian-polity",
    name: "Indian Polity",
    papers: ["Prelims", "GS II"],
    active: true,
  },
  {
    id: "governance",
    name: "Governance",
    papers: ["GS II"],
    active: true,
  },
  {
    id: "international-relations",
    name: "International Relations",
    papers: ["GS II"],
    active: true,
  },

  // GS III
  {
    id: "economy",
    name: "Economy",
    papers: ["Prelims", "GS III"],
    active: true,
  },
  {
    id: "agriculture",
    name: "Agriculture",
    papers: ["GS III"],
    active: true
  },
  {
    id: "environment",
    name: "Environment & Ecology",
    papers: ["Prelims", "GS III"],
    active: true,
  },
  {
    id: "science-tech",
    name: "Science & Technology",
    papers: ["Prelims", "GS III"],
  active: true,
},
  {
    id: "disaster-management",
    name: "Disaster Management",
    papers: ["GS III"],
    active: true,
  },
  {
    id: "internal-security",
    name: "Internal Security",
    papers: ["GS III"],
    active: true,
  },

  // GS IV
  {
    id: "ethics",
    name: "Ethics, Integrity & Aptitude",
    papers: ["GS IV"],
    active: true,
  },

  // Optional - PSIR
  {
    id: "psir-paper-1",
    name: "PSIR Paper I",
    papers: ["Optional"],
    active: true,
  },
  {
    id: "psir-paper-2",
    name: "PSIR Paper II",
    papers: ["Optional"],
    active: true,
  },

  // Common
  {
    id: "current-affairs",
    name: "Current Affairs",
    papers: [
      "Prelims",
      "GS I",
      "GS II",
      "GS III",
      "GS IV",
      "Essay",
      "Optional",
    ],
    active: true,
  },
  {
    id: "csat",
    name: "CSAT",
    papers: ["CSAT"],
    active: true,
  },
  {
    id: "interview",
    name: "Personality Test",
    papers: ["Interview"],
    active: true,
  },
] ;

export type SubjectId = Subject["id"];




