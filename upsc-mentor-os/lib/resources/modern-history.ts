export const MODERN_HISTORY_RESOURCES = {
  id: "modern-history",

  subject: "Modern History",

  description:
    "Resources for UPSC Prelims, GS I, Essay and Interview.",

  pyqWeightage: "Very High",

  revisionPriority: "Highest",

  /* ==========================================================
     NCERTs
  ========================================================== */

  ncerts: [
    {
      class: "VIII",
      title: "Our Pasts III",
      priority: "Recommended",
    },
    {
      class: "XII",
      title: "Themes in Indian History Part III",
      priority: "Essential",
    },
  ],

  /* ==========================================================
     Standard Books
  ========================================================== */

  books: [
    {
      id: "spectrum",

      title: "A Brief History of Modern India",

      author: "Spectrum",

      priority: "Essential",
    },

    {
      id: "bipan-struggle",

      title: "India's Struggle for Independence",

      author: "Bipan Chandra",

      priority: "Recommended",
    },

    {
      id: "bipan-india-since-independence",

      title: "India Since Independence",

      author: "Bipan Chandra",

      priority: "Reference",
    },

    {
      id: "plassey-partition",

      title: "From Plassey to Partition",

      author: "Sekhar Bandyopadhyay",

      priority: "Reference",
    },
  ],

  /* ==========================================================
     Coaching Notes
  ========================================================== */

  coachingNotes: [
    {
      provider: "Vision IAS",
      priority: "Recommended",
    },
    {
      provider: "ForumIAS",
      priority: "Recommended",
    },
    {
      provider: "Drishti IAS",
      priority: "Recommended",
    },
    {
      provider: "Next IAS",
      priority: "Optional",
    },
    {
      provider: "Insights IAS",
      priority: "Optional",
    },
  ],

  /* ==========================================================
     Government Sources
  ========================================================== */

  governmentSources: [
    "National Archives of India",
    "Ministry of Culture",
    "Indian Culture Portal",
    "PIB",
  ],

  /* ==========================================================
     Reports
  ========================================================== */

  reports: [
    "ASI Publications",
    "National Archives Publications",
    "Indian Culture Portal Resources",
  ],

  /* ==========================================================
     Current Affairs Sources
  ========================================================== */

  magazines: [
    "Yojana",
    "Kurukshetra",
  ],

  newspapers: [
    "The Hindu",
    "The Indian Express",
  ],

  websites: [
    "National Archives of India",
    "Indian Culture Portal",
    "PIB",
    "IGNOU eGyankosh",
  ],

  /* ==========================================================
     Important Current Topics
  ========================================================== */

  currentAffairs: [
    "Freedom Fighters",
    "Revolutionary Movements",
    "Historical Anniversaries",
    "Museum Initiatives",
    "Colonial Legacy",
    "Freedom Movement Commemorations",
    "Cultural Heritage",
  ],

  /* ==========================================================
     Answer Writing
  ========================================================== */

  answerWriting: {
    valueAdditions: [
      "Historical Timelines",
      "Congress Sessions",
      "Governor-General & Viceroy Reforms",
      "Important Acts",
      "Freedom Fighters' Quotes",
      "Committees & Commissions",
    ],

    diagrams: [
      "Timeline (1757–1947)",
      "Governor-General Timeline",
      "Freedom Movement Flowchart",
      "Acts & Reforms Timeline",
    ],
  },

  /* ==========================================================
     Revision
  ========================================================== */

  revisionSources: [
    "Chronology Charts",
    "Mind Maps",
    "Freedom Fighters List",
    "Acts & Committees Summary",
    "PYQ Revision",
    "One Page Notes",
  ],
} as const;