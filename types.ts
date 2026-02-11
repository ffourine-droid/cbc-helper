
export type GradeBand = 'PP1-G3' | 'G4-G6' | 'G7-G9' | 'G10-G12';

export interface ProjectTemplate {
  id: string;
  title: string;
  gradeBand: GradeBand;
  subject: string;
  cost: number;
  materials: string[];
  steps: string[];
  competencies: string[];
  tips: string;
  imageUrl: string;
}

export interface GuideSection {
  id: string;
  title: string;
  summary: string;
  content: string;
  icon: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Projects' | 'General' | 'Transitions' | 'Costs';
}

export type Language = 'en' | 'sw';

export enum AppTab {
  HOME = 'home',
  GUIDES = 'guides',
  PROJECTS = 'projects',
  HELP = 'help'
}
