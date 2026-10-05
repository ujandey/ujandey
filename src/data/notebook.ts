export interface ResearchInterest {
  id: string;
  number: string;
  title: string;
  short: string;
  question: string;
  description: string;
  connections: string[];
}

// This is a map of stated interests, not a record of completed research.
export const researchInterests: ResearchInterest[] = [
  {
    id: 'memory', number: '01', title: 'Learning without forgetting', short: 'Continual learning · Memory',
    question: 'What should a learning system hold on to?',
    description: 'I’m interested in continual learning and catastrophic forgetting: how a model can adapt to new information while preserving useful knowledge. Memory-centric systems offer a concrete way to investigate that question.',
    connections: ['Continual learning', 'Catastrophic forgetting', 'Associative memory'],
  },
  {
    id: 'representation', number: '02', title: 'Representing the world', short: 'Representations · Architectures',
    question: 'How does the representation shape what can be learned?',
    description: 'My interests include representation learning and neural architectures, especially how the structure of a representation influences learning and recall. Neuromorphic-inspired computation is one direction I want to explore.',
    connections: ['Representation learning', 'Neural architectures', 'Neuromorphic-inspired computation'],
  },
  {
    id: 'physics', number: '03', title: 'Physics as a starting point', short: 'Scientific computing · Physics',
    question: 'How can physical structure inform a learning system?',
    description: 'I study physics and am interested in scientific computing and physics-informed approaches to AI. I want to connect mathematical descriptions of physical systems with computational experiments.',
    connections: ['Scientific computing', 'Physics-informed AI', 'Computational experiments'],
  },
  {
    id: 'evaluation', number: '04', title: 'Experiments worth trusting', short: 'Reproducibility · Evaluation',
    question: 'What does an experiment actually establish?',
    description: 'Reproducible experiments and honest model evaluation are central to my research direction. I’m interested in making the assumptions, comparisons, uncertainty, and limitations of an experiment visible.',
    connections: ['Reproducibility', 'Model evaluation', 'Experimental limitations'],
  },
];

export interface NotebookEntry {
  id: string;
  title: string;
  summary: string;
  /** A real publication date, only when supplied by the author. */
  published?: string;
  href: string;
  topics: string[];
}

// Add genuine, publishable notes here when available.
export const notebookEntries: NotebookEntry[] = [];
