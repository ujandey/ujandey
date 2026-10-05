# Verified content sources — October 5, 2026

The supplied audit was rechecked against the current repository. No applicable AGENTS.md was found. The implementation initially contained a header with workspace presets, history-changing focus, an Arrange action that minimized unrelated apps, name-only predictor selectors, no CV link, an empty Notebook and a separate one-project gallery.

PowerShell HTTPS fetches and some connected-web pages failed. Node fetch subsequently retrieved current GitHub metadata and pinned source files. Downloaded material is in `.research/portfolio/`; it was read before any external project code was executed. Repository `created_at` dates are described as repository creation, never project start or duration. There is no Git repository in this workspace.

| Project | Inspected source revision | Repository created | Evidence used |
| --- | --- | --- | --- |
| [MNEMA](https://github.com/ujandey/mnema/tree/9746dae77fc958473a1ca89a478f0713d87104a2) | `9746dae77fc958473a1ca89a478f0713d87104a2` | 2026-09-12 | Authors, architecture, setup, full benchmark summary, bundle and import audit |
| [Predictor](https://github.com/ujandey/wc2026predictor/tree/1a4684f139fbbcc70cb403808363e04551a578b0) | `1a4684f139fbbcc70cb403808363e04551a578b0` | 2026-06-26 | README, pipeline.py, predictor.py, simulator.py, API and data orchestration |
| [Chess](https://github.com/ujandey/chess-engine/tree/ab9bdec8b42fcbbfd6b84ef30416a53325918146) | `ab9bdec8b42fcbbfd6b84ef30416a53325918146` | 2026-04-19 | README, board, move generator, opening book, UCI, notation and benchmark source; three limited local captures |
| [Agent](https://github.com/ujandey/gemini-cli-agent/tree/1badc04ea0a966aa59bf76e5a6c4c8df5eedf92e) | `1badc04ea0a966aa59bf76e5a6c4c8df5eedf92e` | 2026-02-28 | Authentic README Example Session and implementation explanation |
| [Noted screenshot](https://github.com/ujandey/ujandey/blob/3b43de082a447723144925311908490e221d7d52/images/noted.png) | Profile `3b43de082a447723144925311908490e221d7d52` | — | Actual original screenshot, downloaded and visually inspected; copied unchanged to public/archive/noted.png |

## Owner-provided facts and CV

The owner supplied the opportunity preference and subsequently requested removing MNEMA’s displayed attribution and individual contribution statement. Public copy now presents MNEMA as a proof of concept for CognX and links to the owner-provided main website, https://www.cognx.tech. Repository authorship records remain linked as source evidence. No percentages or division of architecture, experiments or report-writing are inferred.

One unambiguous CV, `Ujandey_cv.pdf`, exists at the project root. It was copied unchanged to `public/resume.pdf`. Both copies and the served production response have SHA-256 `2ae9b41b8afad9b2e1edc5cc707aaf0189223a50370136d3f5a82a553cd7dfb7`. View and Download links appear in the introduction and About; permanent navigation includes CV. Its contents were preserved.

## MNEMA

The full benchmark summary was compared directly with all six local benchmark records and every cell of the two displayed retention matrices. MNEMA reports 77.12 ± 0.87% mean final accuracy and 6.53 ± 1.41 pp forgetting; DER++-300 reports 89.39 ± 0.60% and 12.12 ± 0.73 pp. The array allocation ratio is 4,391,100 / 1,061,636 = 4.13616…, displayed as 4.14×. Lower observed forgetting accompanies lower final accuracy and greater array payload in this benchmark.

The full data record uses 60,000 training images, 10,000 test images, five sequential digit-pair tasks, six methods and ten seeds (60 seed-method runs). Scores are task-macro means. Forgetting averages the drop from the earlier learned tasks’ best post-learning checkpoint to the final score, excluding the fifth task. SD is sample SD across seeds. Low forgetting alone is not overall performance. These are project-reported results with no independent reproduction or significance claim.

The imported experiment was recorded September 11, 2026, at source revision `fe86ec1c6abc600dda8ec50565a551af4e5434bd`. GitHub’s commit endpoint returns 422, “No commit found,” for that revision in the current repository. The saved import audit reports 60 checked pairs, passing artifact checks, `training_rerun=false`, `inference_rerun=false`, and `current_source_matches_recorded=false`. Current documentation states that the unmodified validator/resume logic rejects the bundle on this checkout. Exact reproduction is blocked without an external copy of the original source bytes and recorded environment. Fresh runs of current source require a separate output context and generate new provenance. No recovery of the missing revision is claimed, and recorded hashes were not changed.

The architecture presentation follows implemented relationships: encoder → separator → parallel FastStore/cortex → blended readout. The controller gates store writes, cortex learning and consolidation; consolidation replays store associations into the cortex. Component parameters and stateful-inference limits are progressively disclosed. Energy values remain partial counter projections, not hardware measurements. Array payload excludes process/runtime/data/workspace memory. The 64 KiB FastStore threshold undercounts physical rows. COGNX copyright remains in project source, while unexplained branding is omitted from the main portfolio narrative.

Report PDF and pinned raw source URLs return HTTP 200. No MNEMA training or inference was run.

## Predictor

The owner identifies [the Kaggle notebook](https://www.kaggle.com/code/ujandey/wc2026predictor) as the main project artifact, with GitHub as the secondary companion application. The notebook is the primary action on every Predictor tab. Its contents could not be retrieved through the web tool during this update; the implementation and evaluation details below describe the inspected GitHub application.

Current `backend/pipeline.py` was inspected. `train_model` splits at 2020-01-01, trains a class-balanced 300-estimator XGBoost classifier on earlier matches, computes `accuracy_score` using its predictions on the 2020+ holdout, then fits isotonic calibration on those same held-out inputs/labels. `test_accuracy` therefore refers to the pre-calibration classifier. The README’s approximately 57% claim is identified as project-reported and not an evaluation of the final calibrated model. There is no separate final calibrated-model evaluation in that function.

Temporal feature updates and simulator batching were inspected. Team form uses prior five/ten games; history is updated after capturing each row’s features. The simulator precomputes matchup probabilities, uses Elo-seeded default groups and simplified knockout/tie-break rules. No saved prediction artifacts are committed, and no deployed reliable endpoint was verified. Training/API startup can build artifacts automatically, so it was not launched. Name-only dropdowns were replaced with a static case study and meaningful pipeline-stage interaction. No forecasts were fabricated.

## Chess

Board, move generator, opening-book, UCI, notation and search timeout paths were inspected before execution. The capture imports the project’s own engine, disables opening-book use, uses a fresh generator and 16 MiB hash setting for each position, requests depth 3 with a 0.75-second ceiling, and records depth-completion callbacks. The capture checks root FEN restoration and root-move legality. No benchmark suite, dependencies installation, model training, network calls or alternative chess engine was used.

`public/evidence/chess-traces.json` records UTC capture time, Python/OS/architecture/processor, settings, FEN, chosen move, SAN, completed depth, cumulative nodes, measured wall time, principal variation and per-depth records. Three captures:

| Position | Move | Depth | Nodes | Wall time |
| --- | --- | ---: | ---: | ---: |
| Initial position | g1f3 | 3 | 1,185 | 36.73 ms |
| Scotch opening | b1c3 | 3 | 2,703 | 100.22 ms |
| Back-rank tactic | a1a8 (Ra8#) | 3 | 908 | 22.54 ms |

Exact unrounded values remain in JSON. These are single captures on this host, not engine-strength or general performance benchmarks. `scripts/capture-chess.py` documents the method. Prepared legal positions and the interactive pruning/reuse schematic remain explicitly conceptual and separate from recorded outputs.

## Agent and screenshots

The authentic calculator README session shows reading `calculator/pkg/calculator.py`, executing `calculator/main.py` with `3 + 7 * 2`, and returning 17. The portfolio condenses those documented steps and does not claim a successful edit, richer investigation, failure recovery or independent recording. No Gemini API requests or visitor tools execute.

Noted’s actual screenshot was recovered from the current profile’s `images/noted.png`, not the obsolete root path. It visibly shows note cards, color and add/delete controls. It is presented inside Projects. The external Noted demo’s availability is unverified. Other projects have no supplied product screenshots.

## Remaining owner input / external artifacts

No missing CV remains. Project start dates/durations and any more specific roles on projects other than MNEMA have not been supplied; none are invented. Optional additions: saved predictor outputs with model/data/date provenance, an independent final calibrated-model evaluation, a richer authentic agent task recording, and additional actual project screenshots. The original MNEMA benchmark source bytes must come from an external retained copy if exact reproduction is needed.
