import type { AppProps } from '../types';
import { identity, opportunities } from '../data/identity';
import { mnemaLinks } from '../data/mnema';
import { ExternalLink } from '../components/UI';
import { Icon } from '../components/Icon';
import { AppLink } from '../navigation';
import MnemaEvidence from '../components/MnemaEvidence';
import Archive from './Archive';
const work = [
 { id:'prediction',number:'02',title:'World Cup predictor',detail:'Kaggle notebook · football forecasting' },
 { id:'chess',number:'03',title:'Python chess engine',detail:'Reversible board state, legal moves and search' },
 { id:'agent',number:'04',title:'Gemini CLI agent',detail:'Inspect a file, execute Python and explain the result' },
] as const;
export default function Welcome(props: AppProps) {
 return <article className="welcome-content">
  <div className="welcome-kicker"><span>Physics undergraduate</span><span>NIT Agartala</span></div>
  <h1>Ujan Dey<span className="name-period">.</span></h1>
  <p className="welcome-lead">Working toward machine-learning research.</p>
  <p className="welcome-description">I’m Ujan, a physics undergraduate at NIT Agartala. My projects include a collaborative continual-learning prototype, a football prediction pipeline, and a Python chess engine.</p>
  <p className="opportunity-line">{opportunities}</p>
  <div className="welcome-actions"><AppLink className="button primary" data-launcher="memory" href="/memory">Explore MNEMA — learning without forgetting <Icon name="arrow" size={17}/></AppLink>{identity.resume&&<><a className="quiet-button" href={identity.resume} target="_blank" rel="noreferrer">View CV<span className="sr-only"> (PDF, opens in a new tab)</span></a><a className="quiet-button" href={identity.resume} download="Ujan-Dey-CV.pdf">Download CV</a></>}</div>
  <p className="intro-contribution">MNEMA is a proof of concept for <ExternalLink href={mnemaLinks.website}>CognX</ExternalLink>.</p>
  <MnemaEvidence compact/>
  <nav className="work-index" aria-label="Featured projects">{work.map(item=><AppLink key={item.id} data-launcher={item.id} href={`/${item.id}`}><span className="work-number">{item.number}</span><span><strong>{item.title}</strong><small>{item.detail}</small></span><Icon name="arrow" size={16}/></AppLink>)}</nav>
  <Archive {...props}/>
  <div className="welcome-bottom"><AppLink href="/about">About &amp; research interests</AppLink><AppLink href="/contact">Contact Ujan</AppLink><a href={identity.github} target="_blank" rel="noreferrer">GitHub ↗</a></div>
 </article>;
}
