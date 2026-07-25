export interface Subject {
  id: string;
  name: string;
  studyHours: number;
  difficulty: string;
  pyqWeightage: string;
  revisionPriority: string;
  papers: string[];
  active: boolean;
}

export interface Resource {
  id: string;
  subjectId: string;
  category: string;
  type: string;
  name: string;
  provider?: string;
  author?: string;
  publisher?: string;
  priority: string;
  source: string;
  url: string;
  tags: string[];
  active: boolean;
}