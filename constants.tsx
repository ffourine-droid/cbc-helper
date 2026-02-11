
import { ProjectTemplate, GuideSection, FAQItem } from './types';

export const TRANSLATIONS = {
  en: {
    welcome: "Welcome! Pick your child's grade to start",
    searchPlaceholder: "Search projects, guides, or questions...",
    dailyTip: "Daily CBC Tip",
    trending: "Trending Projects",
    home: "Home",
    guides: "Guides",
    projects: "Projects",
    help: "Help",
    back: "Back",
    materials: "Materials Needed",
    steps: "Steps",
    competencies: "Core Competencies",
    cost: "Estimated Cost",
    free: "Free",
    lowCost: "Low Cost",
    gradeBands: {
      'PP1-G3': "Pre-Primary - Grade 3",
      'G4-G6': "Grade 4 - Grade 6",
      'G7-G9': "JSS Grade 7 - 9",
      'G10-G12': "Senior Grade 10 - 12"
    },
    askAi: "Ask Mama AI",
    askAiDesc: "Ask any question about CBC projects or structure"
  },
  sw: {
    welcome: "Karibu! Chagua gredi ya mwanao kuanza",
    searchPlaceholder: "Tafuta miradi, miongozo, au maswali...",
    dailyTip: "Kidokezo cha Kila Siku",
    trending: "Miradi Inayovuma",
    home: "Mwanzo",
    guides: "Miongozo",
    projects: "Miradi",
    help: "Msaada",
    back: "Rudi",
    materials: "Vifaa Vinavyohitajika",
    steps: "Hatua",
    competencies: "Umahiri wa Msingi",
    cost: "Gharama Inayokadiriwa",
    free: "Bure",
    lowCost: "Gharama Ndogo",
    gradeBands: {
      'PP1-G3': "Chekechea - Gredi ya 3",
      'G4-G6': "Gredi ya 4 - Gredi ya 6",
      'G7-G9': "JSS Gredi 7 - 9",
      'G10-G12': "Sekondari Gredi 10 - 12"
    },
    askAi: "Uliza Mama AI",
    askAiDesc: "Uliza swali lolote kuhusu miradi ya CBC au muundo wake"
  }
};

export const PROJECTS: ProjectTemplate[] = [
  {
    id: '1',
    title: 'DIY Water Filter',
    gradeBand: 'G7-G9',
    subject: 'Science & Technology',
    cost: 50,
    materials: ['Soda bottle', 'Sand', 'Fine gravel', 'Charcoal pieces', 'Cotton wool'],
    steps: [
      'Cut the soda bottle in half.',
      'Place cotton wool at the neck of the bottle.',
      'Layer charcoal, then sand, then gravel.',
      'Pour dirty water through and watch it clear up!'
    ],
    competencies: ['Critical Thinking', 'Problem Solving'],
    tips: 'Use locally available charcoal from your jiko. Ensure the sand is washed first.',
    imageUrl: 'https://picsum.photos/seed/waterfilter/400/300'
  },
  {
    id: '2',
    title: 'Paper Mache Map of Kenya',
    gradeBand: 'G4-G6',
    subject: 'Social Studies',
    cost: 100,
    materials: ['Old newspapers', 'Cassava flour (for glue)', 'Water', 'Cardboard base'],
    steps: [
      'Soak newspapers in water overnight.',
      'Mix with cassava glue to make pulp.',
      'Mold the map shape on the cardboard.',
      'Let it dry for 2 days before painting.'
    ],
    competencies: ['Creativity', 'Imagination'],
    tips: 'Cassava flour is a cheaper alternative to industrial glue.',
    imageUrl: 'https://picsum.photos/seed/map/400/300'
  },
  {
    id: '3',
    title: 'Model of a Lung',
    gradeBand: 'G7-G9',
    subject: 'Integrated Science',
    cost: 150,
    materials: ['2 Balloons', 'Plastic bottle', 'Y-shaped tube or straws', 'Rubber band'],
    steps: [
      'Cut the bottom off the plastic bottle.',
      'Attach balloons to the straws and place inside bottle.',
      'Seal the top with clay or tape.',
      'Pull the bottom balloon to simulate breathing.'
    ],
    competencies: ['Communication', 'Self-efficacy'],
    tips: 'Ensure the bottle seal is airtight for the model to work properly.',
    imageUrl: 'https://picsum.photos/seed/lung/400/300'
  }
];

export const GUIDES: GuideSection[] = [
  {
    id: 'g1',
    title: 'What is CBC?',
    summary: 'The basics of the Competency-Based Curriculum.',
    content: 'CBC is designed to emphasize the significance of developing skills and knowledge and also to apply those competencies to real-life situations. Unlike the 8-4-4 system, CBC focuses on what a learner can DO rather than just what they KNOW.',
    icon: 'Info'
  },
  {
    id: 'g2',
    title: 'Pathway Options',
    summary: 'Understanding Grade 10 placements and beyond.',
    content: 'After Grade 9, students choose pathways based on their interests and abilities: STEM (Science, Tech, Engineering, Math), Social Sciences, or Arts & Sports Science.',
    icon: 'Path'
  },
  {
    id: 'g3',
    title: 'The 2026 Transition',
    summary: 'Key changes coming for Grade 10.',
    content: 'In 2026, the first CBC cohort will enter Senior Secondary School. This transition involves placement based on Junior Secondary CBA results and learner preferences.',
    icon: 'Clock'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'f1',
    question: 'What is a Learner Portfolio?',
    answer: 'A portfolio is a collection of a student\'s work (projects, photos, essays) that shows their progress over time. It is used for assessment.',
    category: 'General'
  },
  {
    id: 'f2',
    question: 'How can I save money on projects?',
    answer: 'Focus on using recycled materials like plastic bottles, old newspapers, and natural items like stones or sticks. Avoid buying expensive ready-made models.',
    category: 'Costs'
  }
];
