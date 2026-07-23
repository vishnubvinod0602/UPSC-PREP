export type SubjectId = string;
export const UPSC_SUBJECTS = [
  // Essay
  {
    id: "essay",
    name: "Essay",
    papers: ["Essay"],
  },

  // GS I
  {
    id: "ancient-history",
    name: "Ancient History",
    papers: ["Prelims", "GS I"],
  },
  {
    id: "medieval-history",
    name: "Medieval History",
    papers: ["Prelims", "GS I"],
  },
  {
    id: "modern-history",
    name: "Modern History",
    papers: ["Prelims", "GS I"],
  },
  {
    id: "art-culture",
    name: "Art & Culture",
    papers: ["Prelims", "GS I"],
  },
  {
    id: "indian-geography",
    name: "Indian Geography",
    papers: ["Prelims", "GS I"],
  },
  {
    id: "world-geography",
    name: "World Geography",
    papers: ["Prelims", "GS I"],
  },
  {
    id: "society",
    name: "Indian Society",
    papers: ["GS I"],
  },

  // GS II
  {
    id: "indian-polity",
    name: "Indian Polity",
    papers: ["Prelims", "GS II"],
  },
  {
    id: "governance",
    name: "Governance",
    papers: ["GS II"],
  },
  {
    id: "international-relations",
    name: "International Relations",
    papers: ["GS II"],
  },

  // GS III
  {
    id: "economy",
    name: "Economy",
    papers: ["Prelims", "GS III"],
  },
  {
    id: "agriculture",
    name: "Agriculture",
    papers: ["GS III"],
  },
  {
    id: "environment",
    name: "Environment & Ecology",
    papers: ["Prelims", "GS III"],
  },
  {
    id: "science-tech",
    name: "Science & Technology",
    papers: ["Prelims", "GS III"],
  },
  {
    id: "disaster-management",
    name: "Disaster Management",
    papers: ["GS III"],
  },
  {
    id: "internal-security",
    name: "Internal Security",
    papers: ["GS III"],
  },

  // GS IV
  {
    id: "ethics",
    name: "Ethics, Integrity & Aptitude",
    papers: ["GS IV"],
  },

  // Optional - PSIR
  {
    id: "psir-paper-1",
    name: "PSIR Paper I",
    papers: ["Optional"],
  },
  {
    id: "psir-paper-2",
    name: "PSIR Paper II",
    papers: ["Optional"],
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
  },
  {
    id: "csat",
    name: "CSAT",
    papers: ["CSAT"],
  },
  {
    id: "interview",
    name: "Personality Test",
    papers: ["Interview"],
  },
] as const;

export type SubjectId = (typeof UPSC_SUBJECTS)[number]["id"];