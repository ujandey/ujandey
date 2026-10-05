/** Project-reported full-data evidence inspected on 2026-10-05; no models rerun. */
const repo = 'https://github.com/ujandey/mnema';
const checkedRevision = '9746dae77fc958473a1ca89a478f0713d87104a2';
const full = `${repo}/blob/${checkedRevision}/results/research_benchmark/full`;

export const mnemaLinks = {
  website: 'https://www.cognx.tech',
  repository: repo,
  authors: `${repo}/blob/main/AUTHORS.md`,
  architecture: `${repo}/blob/main/docs/ARCHITECTURE.md`,
  implementation: `${repo}/blob/main/mnema/model.py`,
  technicalReport: `${repo}/blob/main/docs/mnema.pdf`,
  benchmarkReport: `${full}/BENCHMARK_REPORT.md`,
  summary: `${full}/summaries/summary.json`,
  evidenceBundle: `${full}/README.md`,
  validation: `${full}/IMPORT_VALIDATION.json`,
  protocol: `${repo}/blob/main/docs/RESEARCH_BENCHMARK.md`,
  gettingStarted: `${repo}/blob/main/docs/GETTING_STARTED.md`,
  api: `${repo}/blob/main/docs/API.md`,
  runbook: `${repo}/blob/main/experiments/RESEARCH_BENCHMARK.md`,
};

export const mnemaBenchmark = {
  checkedRevision,
  checked: '2026-10-05',
  created: '2026-09-11',
  sourceCommit: 'fe86ec1c6abc600dda8ec50565a551af4e5434bd',
  configId: 'ab869e57feea62e93198f72fedde18182dc93a28a72d4875e966067d676027a8',
  trainImages: 60000,
  testImages: 10000,
  seeds: 10,
  completedRuns: 60,
  tasks: ['0–1', '2–3', '4–5', '6–7', '8–9'],
  environment: 'Python 3.11.7 · NumPy 2.2.6 · Matplotlib 3.10.3 · PyYAML 6.0.2',
  source: mnemaLinks.summary,
};

// Rounded to the precision published in BENCHMARK_REPORT.md.
export const mnemaBenchmarks = [
  { method: 'Naive MLP', accuracy: 19.79, accuracySpread: 0.06, forgetting: 99.52, forgettingSpread: 0.12, residentBytes: 814120, projectedInference: 1.768, source: mnemaLinks.benchmarkReport },
  { method: 'Replay-300 (Research)', accuracy: 82.44, accuracySpread: 1.33, forgetting: 20.58, forgettingSpread: 1.62, residentBytes: 1049636, projectedInference: 1.768, source: mnemaLinks.benchmarkReport },
  { method: 'Replay-64KiB', accuracy: 67.59, accuracySpread: 2.07, forgetting: 39.30, forgettingSpread: 2.60, residentBytes: 879291, projectedInference: 1.768, source: mnemaLinks.benchmarkReport },
  { method: 'EWC', accuracy: 19.98, accuracySpread: 0.36, forgetting: 99.12, forgettingSpread: 0.40, residentBytes: 7327080, projectedInference: 1.768, source: mnemaLinks.benchmarkReport },
  { method: 'DER++-300', accuracy: 89.39, accuracySpread: 0.60, forgetting: 12.12, forgettingSpread: 0.73, residentBytes: 1061636, projectedInference: 1.768, source: mnemaLinks.benchmarkReport },
  { method: 'MNEMA', accuracy: 77.12, accuracySpread: 0.87, forgetting: 6.53, forgettingSpread: 1.41, residentBytes: 4391100, projectedInference: 0.316, source: mnemaLinks.benchmarkReport },
];

/** retention_mean rows from summary.json: checkpoint × evaluated digit-pair task.
 * Values are fractions averaged across seeds, including future-task measurements.
 * This is a saved-data explorer, not model execution or an individual seed replay.
 */
export const mnemaTaskReplay = {
  source: mnemaLinks.summary,
  methods: [
    {
      name: 'MNEMA',
      retention: [
        [0.997966903073286, 0, 0, 0, 0],
        [0.9367848699763591, 0.9449069539666992, 0, 0, 0],
        [0.9122458628841607, 0.9334476003917727, 0.7593383137673426, 0, 0],
        [0.8808983451536643, 0.9178256611165525, 0.7426360725720385, 0.8588620342396778, 0],
        [0.8448226950354609, 0.9001958863858961, 0.6829775880469584, 0.8719536757301107, 0.5562279374684822],
      ],
    },
    {
      name: 'DER++-300',
      retention: [
        [0.9994326241134752, 0, 0, 0, 0],
        [0.9857210401891253, 0.989177277179236, 0, 0, 0],
        [0.9694089834515367, 0.9239471106758081, 0.9949306296691569, 0, 0],
        [0.9625531914893617, 0.9102350636630755, 0.9263607257203841, 0.9874622356495466, 0],
        [0.9415130023640664, 0.856513222331048, 0.7823906083244397, 0.9057905337361529, 0.9835098335854765],
      ],
    },
  ],
};
