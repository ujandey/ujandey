import CaseStudyFooter from '../components/CaseStudyFooter';
import { Caption, ExternalLink, Tag, Tabs } from '../components/UI';
import { memoryEvidence, researchSources } from '../data/research';
import { mnemaLinks } from '../data/mnema';
import { AppLink, choiceHref, useRouteChoice } from '../navigation';
import MnemaEvidence from '../components/MnemaEvidence';
import './memory-lab.css';
import './memory-results.css';

const tabs = ['Overview', 'Architecture', 'Experiments', 'Findings', 'Sources'] as const;
function Overview() {
 return <>
  <div className="memory-intro-top"><Tag>Collaborative research prototype · NumPy on CPU</Tag></div>
  <h2 className="memory-question">MNEMA<span className="memory-title-dot">.</span></h2>
  <p className="memory-lead">Can a separate associative memory help a model learn sequential tasks without losing earlier knowledge?</p>
  <p className="project-role">MNEMA is a proof of concept for <ExternalLink href={mnemaLinks.website}>CognX</ExternalLink>.</p>
  <p className="memory-summary">Sparse input codes feed a FastStore and an adaptive spiking cortex in parallel. A confidence gate blends their outputs; a controller regulates learning and consolidation.</p>
  <p className="evidence-context">Research prototype with a completed full Split-MNIST benchmark recorded on September 11, 2026. This dates the experiment, not the project’s start.</p>
  <MnemaEvidence/>
  <div className="memory-actions"><ExternalLink href={memoryEvidence.technicalReport}>Technical report (PDF)</ExternalLink><ExternalLink href={mnemaLinks.benchmarkReport}>Benchmark report</ExternalLink><ExternalLink href={mnemaLinks.repository}>Source</ExternalLink><AppLink className="text-link" href="/memory?section=Architecture">Architecture →</AppLink><AppLink className="text-link" href="/memory?section=Experiments">Compare saved task results →</AppLink></div>
 </>;
}
const components = [
  { number: '01', title: 'Spike encoder & sparse separator', word: 'Represent', description: 'Encode 784 pixel intensities in 16 time bins, then select 64 indices from 16,384 units. Separation collapses spike timing.', tone: 'cobalt' },
  { number: '02', title: 'FastStore & readout', word: 'Remember', description: 'Active rows accumulate class votes. A confidence gate blends those votes with cortex outputs.', tone: 'lavender' },
  { number: '03', title: 'Adaptive spiking cortex', word: 'Learn', description: 'Ten output neurons use four coupled synaptic planes and eligibility traces. Prediction errors trigger local learning.', tone: 'moss' },
  { number: '04', title: 'Controller & sleep consolidation', word: 'Retain', description: 'Novelty gates writes; sleep pressure triggers replay. Up to 64 sampled store rows train the cortex individually.', tone: 'amber' },
];
function Architecture() {
  return <>
    <span className="section-label">Data flow / NumPy on CPU</span>
    <h2 className="memory-section-title">The memory architecture</h2>
    <p className="memory-copy">Sparse codes feed FastStore and the cortex in parallel. The readout combines their outputs; a controller gates writes, learning, and sleep.</p>
    <div className="mnema-flow" role="img" aria-label="Input passes through the encoder and sparse separator, then branches to FastStore and cortex in parallel. Their outputs blend in the readout. The learning controller gates writes and cortex updates; consolidation replays FastStore associations into the cortex.">
      <div className="flow-node">Input pixels → spike encoder</div><span className="flow-arrow" aria-hidden="true">↓</span>
      <div className="flow-node">Sparse separator · active code</div><span className="flow-arrow" aria-hidden="true">↙ &nbsp; ↘</span>
      <div className="flow-parallel"><div className="flow-node"><strong>FastStore</strong><span>Associative class votes</span></div><div className="flow-node"><strong>Cortex</strong><span>Adaptive output neurons</span></div></div>
      <span className="flow-arrow" aria-hidden="true">↘ &nbsp; ↙</span><div className="flow-node">Confidence blending / readout → prediction</div>
      <div className="flow-control"><strong>Learning controller</strong><span>Confidence + prediction + training target → novelty, error &amp; sleep pressure</span><span>Novelty → store writes · Error → cortex updates</span><strong>Consolidation: FastStore → cortex</strong><span>Sleep pressure triggers replay of sampled associations</span></div>
    </div>
    <Caption>Diagram of implemented relationships; no live activity is shown.</Caption>
    <details className="memory-details"><summary>Component implementation details</summary><div className="memory-component-list">{components.map(component => <section key={component.number}><span className={`memory-component-number ${component.tone}`}>{component.number}</span><div><h3>{component.title}</h3><p>{component.description}</p></div></section>)}</div></details>
    <details className="memory-details"><summary>Stateful inference & evaluation</summary><p>Native inference changes adaptive state even when learning is disabled. Research evaluation restores the trained checkpoint after every image and checks state hashes and reverse-order predictions.</p><p>The cortex has one sparse-to-output projection. Sleep replays individual associations rather than complete input codes or images.</p><div className="memory-actions"><ExternalLink href={mnemaLinks.architecture}>Architecture guide</ExternalLink><ExternalLink href={mnemaLinks.implementation}>NumPy implementation</ExternalLink></div></details>
  </>;
}
function Experiments() {
 const [checkpointChoice,setCheckpoint]=useRouteChoice('memory','checkpoint',['1','2','3','4','5'] as const,'5');
 const checkpoint=Number(checkpointChoice)-1;
 const benchmark=memoryEvidence.benchmark;
 return <>
  <div className="memory-intro-top"><Tag>Completed full-data benchmark</Tag><span className="memory-project-id">60 / 60 runs</span></div>
  <h2 className="memory-section-title">Learning across five tasks</h2>
  <p className="memory-copy">60,000 training images, 10,000 test images, six methods, ten seeds. Split-MNIST tasks arrive in digit pairs: 01 → 23 → 45 → 67 → 89. Every prediction considers all ten classes without a task identifier.</p>
  <div className="memory-table-scroll" role="region" aria-label="Full benchmark comparison" tabIndex={0}><table className="memory-benchmark-table"><caption>Final results · mean ± sample SD over ten seeds</caption><thead><tr><th scope="col">Method</th><th scope="col">Accuracy (%)</th><th scope="col">Forgetting (pp)</th></tr></thead><tbody>{memoryEvidence.benchmarks.map(result=><tr key={result.method} className={result.method==='MNEMA'?'memory-result-highlight':''}><th scope="row">{result.method}</th><td>{result.accuracy.toFixed(2)} ± {result.accuracySpread.toFixed(2)}</td><td>{result.forgetting.toFixed(2)} ± {result.forgettingSpread.toFixed(2)}</td></tr>)}</tbody></table></div>
  <Caption>Project-reported descriptive comparison; no statistical significance or independent reproduction claimed.</Caption>
  <div className="memory-explorer">
   <h3>Compare saved task accuracy</h3><p>Both methods at the same training checkpoint, on a common 0–100% axis.</p>
   <div className="memory-stage-controls" role="group" aria-label="Training checkpoint">{benchmark.tasks.map((task,i)=><AppLink key={task} href={choiceHref('memory','checkpoint',String(i+1))} aria-current={checkpoint===i?'true':undefined} onClick={event=>{if(!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey&&event.button===0){event.preventDefault();setCheckpoint(String(i+1) as '1'|'2'|'3'|'4'|'5');}}}><span>After task {i+1}</span>{task}</AppLink>)}</div>
   <div className="retention-comparison" aria-live="polite">{memoryEvidence.taskReplay.methods.map(method=>{
    const scores=method.retention[checkpoint];
    const mean=scores.slice(0,checkpoint+1).reduce((total,value)=>total+value,0)/(checkpoint+1)*100;
    return <section className="memory-retention-chart" key={method.name}><h4>{method.name}</h4><p>Seen-task mean <strong>{mean.toFixed(2)}%</strong></p><div className="chart-scale" aria-hidden="true"><span>0%</span><span>50%</span><span>100%</span></div><ul>{scores.map((score,i)=><li key={benchmark.tasks[i]} className={i>checkpoint?'memory-future-task':''}><span>{benchmark.tasks[i]}</span><div className="memory-retention-track" aria-hidden="true"><i style={{width:`${score*100}%`}}/></div><strong>{(score*100).toFixed(2)}%</strong><small>{i>checkpoint?'Unseen':'Learned'}</small></li>)}</ul></section>;
   })}</div>
   <Caption>Saved ten-seed mean accuracy, including measurements of unseen tasks. This reads recorded data; it does not run a model.</Caption><ExternalLink href={memoryEvidence.taskReplay.source}>Original retention matrices</ExternalLink>
  </div>
  <p className="note-box">The imported run’s source differs from this checkout. The standard validator and resume logic reject the bundle here; passing saved-artifact checks did not rerun training or inference. <ExternalLink href={mnemaLinks.evidenceBundle}>Source and reproduction limitations</ExternalLink></p>
  <details className="memory-details"><summary>How the scores are defined</summary><p>Final accuracy is the macro mean of five final task scores. Forgetting is the mean decline from each earlier task’s best post-learning score to its final score, excluding the last task. Mean ± sample SD describes variation over seeds, not confidence intervals.</p><p>Compute differs between methods: replay and consolidation perform internal work; EWC makes Fisher-estimation reads. One dataset and fixed task order limit generalization.</p><ExternalLink href={mnemaLinks.protocol}>Protocol &amp; definitions</ExternalLink></details>
  <ExternalLink href={mnemaLinks.benchmarkReport}>Read the full benchmark report</ExternalLink>
 </>;
}
function Findings() {
  return <>
    <span className="section-label">Full-data findings & limitations</span>
    <h2 className="memory-section-title">Retention, accuracy & resources</h2>
    <p className="memory-copy">A useful continual-learning system has to balance retaining the past, learning the present, and the resources needed to do both.</p>
    <div className="memory-tradeoff"><div><span>PLASTICITY</span><strong>Learn the new</strong></div><svg viewBox="0 0 90 36" aria-hidden="true"><path d="M5 18h80M5 18l7-6M5 18l7 6M85 18l-7-6M85 18l-7 6" fill="none" stroke="currentColor" strokeWidth="1.3"/><circle cx="45" cy="18" r="4" fill="currentColor"/></svg><div><span>STABILITY</span><strong>Keep the useful</strong></div></div>
    <Caption>Read retention, accuracy, and resource use together</Caption>
    <div className="memory-finding-list">
      <section><span>01</span><div><h3>Lowest observed mean forgetting</h3><p>MNEMA reports 6.53 ± 1.41 points of forgetting in this comparison. DER++-300 achieves the highest mean accuracy at 89.39 ± 0.60%, compared with MNEMA’s 77.12 ± 0.87%.</p></div></section>
      <section><span>02</span><div><h3>Retention comes with a memory trade-off</h3><p>MNEMA allocates 4,391,100 bytes of resident arrays. Replay-300 and DER++-300 attain higher accuracy with smaller allocations. The configured 64 KiB FastStore threshold undercounts rows: active payload reaches 73,388 bytes.</p></div></section>
      <section><span>03</span><div><h3>Inference cost is a partial projection</h3><p>The report projects 0.316 µJ per image for MNEMA and 1.768 for each dense baseline. Counter coverage omits operations, writes, and checkpoint restoration. These values do not measure device energy or total training energy.</p></div></section>
    </div>
    <details className="memory-details"><summary>Scope of the evidence</summary><p>The imported bundle covers one dataset and fixed task order. Its saved-artifact audit passed without rerunning training or inference. The current source differs from the recorded revision, and the standard validator rejects this bundle on the current MNEMA checkout. Exact reproduction would require original source bytes and environment; the recorded revision is unavailable in the current public repository.</p><p>Array payload excludes runtime overhead, datasets, and temporary workspace. The prototype does not establish deployment performance, privacy, category-level one-shot learning, or statistical superiority.</p><ExternalLink href={mnemaLinks.evidenceBundle}>Evidence & reproduction limits</ExternalLink></details>
    <details className="memory-details"><summary>Compare resident arrays & projected inference</summary><div className="memory-table-scroll" role="region" aria-label="Resource comparison" tabIndex={0}><table className="memory-benchmark-table"><caption>Reported means · array payload and partial energy projection</caption><thead><tr><th scope="col">Method</th><th scope="col">Array bytes</th><th scope="col">Projected µJ/image</th></tr></thead><tbody>{memoryEvidence.benchmarks.map(result => <tr key={result.method}><th scope="row">{result.method}</th><td>{result.residentBytes.toLocaleString('en-US')}</td><td>{result.projectedInference.toFixed(3)}</td></tr>)}</tbody></table></div><ExternalLink href={mnemaLinks.benchmarkReport}>Resource accounting in the report</ExternalLink></details>
  </>;
}
function Sources() {
  return <>
    <span className="section-label">Website & sources</span>
    <h2 className="memory-section-title">MNEMA, a proof of concept for CognX.</h2>
    <p className="memory-copy">{memoryEvidence.fullName}. Source, documentation, and benchmark artifacts use Apache 2.0.</p>
    <div className="memory-source-panel"><span className="memory-source-symbol" aria-hidden="true">↗</span><div><h3>CognX</h3><p>MNEMA is a proof of concept for CognX. Visit the main website to learn more.</p><ExternalLink href={mnemaLinks.website}>www.cognx.tech</ExternalLink></div></div>
    <div className="memory-source-panel"><span className="memory-source-symbol" aria-hidden="true">↗</span><div><h3>MNEMA repository</h3><p>Source code, experiment artifacts, and any available documentation belong with the project.</p><ExternalLink href={researchSources.memory.url}>github.com/ujandey/mnema</ExternalLink></div></div>
    <div className="memory-source-panel"><span className="memory-source-symbol" aria-hidden="true">↗</span><div><h3>Technical report</h3><p>The repository links its full PDF report, covering architecture, methodology, results, and limitations.</p><ExternalLink href={memoryEvidence.technicalReport}>Open MNEMA report (PDF)</ExternalLink></div></div>
    <div className="memory-source-panel"><span className="memory-source-symbol" aria-hidden="true">↗</span><div><h3>Full-data evidence</h3><p>Reports, saved predictions, summaries, figures, and worker provenance for all 60 runs.</p><div className="memory-actions"><ExternalLink href={mnemaLinks.benchmarkReport}>Benchmark report</ExternalLink><ExternalLink href={mnemaLinks.evidenceBundle}>Evidence bundle</ExternalLink><ExternalLink href={mnemaLinks.validation}>Import audit</ExternalLink></div></div></div>
    <details className="memory-details" open><summary>Source status & provenance</summary><p>Repository documentation and saved results checked on {memoryEvidence.benchmark.checked}. The full experiment was recorded on {memoryEvidence.benchmark.created} at source revision <code className="memory-source-hash">{memoryEvidence.benchmark.sourceCommit}</code>.</p><p>The saved import audit reports passing checks for 60 pairs, with no training or inference rerun and a current-source mismatch. This portfolio presents project-reported evidence and does not claim independent reproduction.</p><p>{memoryEvidence.benchmark.environment}. CPU workers used one BLAS thread.</p><ExternalLink href={mnemaLinks.authors}>Authorship record</ExternalLink></details>
    <details className="memory-details"><summary>Use or reproduce MNEMA</summary><p>Setup and API examples support running the current prototype. For the imported benchmark, the standard validator and resume logic reject the current source mismatch. The recorded source revision is identified but unavailable in the current public repository. Exact reproduction is blocked without an external copy of those bytes and the recorded software environment. A fresh run of the current revision must use a separate output context and creates new evidence; do not modify recorded hashes to bypass validation.</p><div className="memory-actions"><ExternalLink href={mnemaLinks.gettingStarted}>Getting started</ExternalLink><ExternalLink href={mnemaLinks.api}>Python API</ExternalLink><ExternalLink href={mnemaLinks.runbook}>Benchmark runbook</ExternalLink></div></details>
  </>;
}
export default function MemoryLab() {
  const [tab, setTab] = useRouteChoice('memory','section',tabs,'Overview');
  return <div className="memory-app"><Tabs tabs={tabs} value={tab} onChange={setTab} href={view=>choiceHref('memory','section',view)}/><div className="app-pad memory-content" role="region" aria-label={`Memory Lab ${tab}`}>
    {tab === 'Overview' && <Overview/>}
    {tab === 'Architecture' && <Architecture/>}
    {tab === 'Experiments' && <Experiments/>}
    {tab === 'Findings' && <Findings/>}
    {tab === 'Sources' && <Sources/>}
  <CaseStudyFooter id="memory"/></div></div>;
}
