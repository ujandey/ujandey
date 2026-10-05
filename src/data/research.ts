/**
 * Evidence for the portfolio; MNEMA rechecked 2026-10-05.
 * A cached README is a project source, not an independent reproduction.
 * Do not promote pending numerical claims to published metrics.
 */
import capturedSearches from './chess-traces.json';
import { mnemaBenchmark, mnemaBenchmarks, mnemaLinks, mnemaTaskReplay } from './mnema';

export type EvidenceStatus = 'project-source' | 'cached-project-source' | 'provided-by-author' | 'unavailable';

export interface EvidenceSource {
  label: string;
  url: string;
  status: EvidenceStatus;
  note: string;
}

export const researchSources: Record<string, EvidenceSource> = {
  memory: {
    label: 'MNEMA repository',
    url: 'https://github.com/ujandey/mnema',
    status: 'project-source',
    note: 'README, architecture, API, authorship, full benchmark report, aggregate retention data, and saved validation inspected on 2026-10-05. Results are project-reported; training and inference were not rerun.',
  },
  prediction: {
    label: 'World Cup predictor repository',
    url: 'https://github.com/ujandey/wc2026predictor',
    status: 'project-source',
    note: 'Current pipeline, predictor and simulator inspected at 1a4684f139fbbcc70cb403808363e04551a578b0. No saved predictions or verified deployed endpoint. Accuracy is computed before calibration is fitted on the same holdout.',
  },
  chess: {
    label: 'Chess engine README',
    url: 'https://github.com/ujandey/chess-engine/blob/main/README.md',
    status: 'project-source',
    note: 'Source inspected at ab9bdec8b42fcbbfd6b84ef30416a53325918146, then three small depth-3 local searches captured with book disabled. Full benchmark suite was not run.',
  },
  agent: {
    label: 'Gemini CLI agent README',
    url: 'https://github.com/ujandey/gemini-cli-agent/blob/main/README.md',
    status: 'project-source',
    note: 'Current README inspected at 1badc04ea0a966aa59bf76e5a6c4c8df5eedf92e. Example Session documents reading the calculator implementation and running an expression. This is a documentation replay, not a new execution recording.',
  },
  noted: {
    label: 'Noted repository',
    url: 'https://github.com/ujandey/Noted',
    status: 'cached-project-source',
    note: 'README and repository description retrieved. Listed deployment and screenshot targets could not be fetched.',
  },
  archive: {
    label: 'Original portfolio repository',
    url: 'https://github.com/ujandey/ujandey',
    status: 'cached-project-source',
    note: 'Historical README and file list retrieved. Current live portfolio and source index were inaccessible.',
  },
};

export const memoryEvidence = {
  authors: ['Ujan Dey', 'Swapnil'],
  fullName: 'Memory-Native Event-Driven Architecture for Edge Continual Learning',
  description: 'A collaborative NumPy research prototype combining sparse input codes, fast associative memory, an adaptive spiking cortex, and consolidation to study learning across sequential tasks.',
  descriptionStatus: 'project-source' as EvidenceStatus,
  benchmarkStatus: 'project-source' as EvidenceStatus,
  benchmarks: mnemaBenchmarks,
  benchmark: mnemaBenchmark,
  taskReplay: mnemaTaskReplay,
  technicalReport: mnemaLinks.technicalReport,
  boundaries: [
    'Research prototype; no claim of state-of-the-art performance or peer review.',
    'Published values are project-reported mean and sample SD over ten seeds, not independent reproduction or statistical significance.',
    'Projected energy figures are not measured hardware energy.',
    'A nominal FastStore budget does not describe total system memory.',
    'The current source differs from the recorded benchmark source; the import audit did not rerun training or inference.',
  ],
};

export const predictionEvidence = {
  period: '2026 tournament project',
  mode: 'case-study' as const,
  recordedPredictions: [],
  endpoint: null,
  components: ['Historical match data', 'Sequential Elo', 'Rolling form', 'XGBoost classification', 'Probability calibration', 'Monte Carlo simulation', 'FastAPI and web frontend'],
  status: 'project-source' as EvidenceStatus,
  evaluationNote: 'No final calibrated-model score is published here. The current train_model computes accuracy on the 2020+ holdout before fitting isotonic calibration on that same holdout. A separate final-model evaluation period is absent.',
};

export const chessEvidence = {
  mode: 'recorded-searches-and-concepts' as const,
  recordedSearches: capturedSearches.traces,
  capabilities: ['Legal move generation', 'Iterative deepening', 'Alpha-beta search', 'Transposition tables', 'UCI', 'SAN/PGN', 'Tkinter interface', 'Tests and benchmarks'],
  status: 'cached-project-source' as EvidenceStatus,
  note: 'Prepared board positions explain chess and search concepts. They are not recordings of this engine choosing a move.',
};

export const agentRepositoryExample = {
  label: 'Repository example replay',
  mode: 'documented-example' as const,
  source: researchSources.agent.url,
  request: "Fix the bug: 3 + 7 * 2 shouldn't be 20.",
  steps: [
    { title: 'Read the implementation', tool: 'get_file_content', operation: 'calculator/pkg/calculator.py', explanation: 'Inspect the calculator before deciding what to change.' },
    { title: 'Check the expression', tool: 'run_python_file', operation: 'calculator/main.py', args: ['3 + 7 * 2'], explanation: 'Run the existing calculator and return its output to the agent.' },
    { title: 'Report the result', tool: null, operation: null, explanation: 'The calculator already applies multiplication before addition: the result is 17.' },
  ],
  result: { expression: '3 + 7 * 2', result: 17 },
  provenance: 'Adapted from the repository README Example Session; no API request or Python execution occurs in the portfolio.',
};

export const archiveEvidence = [
  {
    id: 'noted', name: 'Noted', repo: 'https://github.com/ujandey/Noted',
    listedLiveUrl: 'https://noted-one-sandy.vercel.app/', liveReachabilityVerified: false,
    description: 'A React notes and drawing application with browser persistence.',
    screenshotSource: 'https://github.com/ujandey/ujandey/blob/3b43de082a447723144925311908490e221d7d52/images/noted.png', screenshotLocalPath: '/archive/noted.png',
  },
];

export const resumeEvidence = {
  path: '/resume.pdf',
  status: 'provided-by-author' as EvidenceStatus,
  note: 'Owner-supplied Ujandey_cv.pdf copied byte-for-byte to public/resume.pdf. SHA-256: 2ae9b41b8afad9b2e1edc5cc707aaf0189223a50370136d3f5a82a553cd7dfb7.',
};
