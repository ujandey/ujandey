import { mnemaBenchmarks, mnemaLinks } from '../data/mnema';
import { ExternalLink } from './UI';
export default function MnemaEvidence({ compact = false }: { compact?: boolean }) {
 const methods=mnemaBenchmarks.filter(result=>['MNEMA','DER++-300'].includes(result.method)).reverse();
 const ratio=methods[0].residentBytes/methods[1].residentBytes;
 return <section className={`evidence-summary ${compact?'compact':''}`} aria-label="MNEMA evidence summary">
  <h3>Learning without forgetting: the measured tradeoff</h3>
  <p className="evidence-context">Project-reported full Split-MNIST · 5 sequential tasks · 10 seeds</p>
  <table><caption className="sr-only">Mean final accuracy and forgetting across ten seeds</caption><thead><tr><th scope="col">Method</th><th scope="col">Accuracy</th><th scope="col">Forgetting</th></tr></thead><tbody>{methods.map(result=><tr key={result.method}><th scope="row">{result.method}</th><td>{result.accuracy.toFixed(2)}%</td><td>{result.forgetting.toFixed(2)} pp</td></tr>)}</tbody></table>
  <p>Lower observed forgetting, with lower final accuracy and {ratio.toFixed(2)}× the resident array allocation of DER++-300.</p>
  <p className="evidence-context">Forgetting is the average decline from earlier tasks’ best post-learning scores to their final scores; the last task is excluded. A low value alone does not establish a better model.</p>
  {!compact&&<p className="evidence-context">Mean ± sample SD: MNEMA 77.12 ± 0.87% accuracy, 6.53 ± 1.41 pp forgetting; DER++-300 89.39 ± 0.60%, 12.12 ± 0.73 pp. Arrays exclude runtime, data and temporary workspace.</p>}
  <ExternalLink href={mnemaLinks.summary}>Saved benchmark evidence</ExternalLink>
  <p className="evidence-context">Not independently reproduced. Current source differs from the recorded run; the standard validator rejects this imported bundle on the current MNEMA checkout. The recorded revision is unavailable in its current public repository. <a href={mnemaLinks.evidenceBundle} target="_blank" rel="noreferrer">Provenance & reproduction limits ↗</a></p>
 </section>;
}
