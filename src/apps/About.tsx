import type { AppProps } from '../types';
import { identity, opportunities, interests } from '../data/identity';
import { ExternalLink, Caption } from '../components/UI';
import { AppLink } from '../navigation';
import './supporting.css';
const About: React.FC<AppProps> = () => {
 return <article className="supporting-app about-app">
  <header className="about-intro"><div><span className="eyebrow">Ujan Dey / background</span><h2>Physics undergraduate.<br/>Exploring machine learning.</h2><p>I’m studying for an integrated BS–MS in Physics at NIT Agartala. Alongside my degree, I build software and explore machine learning.</p><p className="opportunity-line">{opportunities}</p></div></header>
  <section className="about-education" aria-label="Education"><span className="section-label">Education</span><div><h3>{identity.education}</h3><p>{identity.institution}</p></div><span className="about-period">{identity.period}</span></section>
  <section className="research-interests" id="interests"><span className="section-label">Research interests</span><h3>Learning, memory &amp; scientific computing</h3><p>I’m interested in how systems adapt to new information while preserving useful knowledge, and how physical structure can inform computational models.</p><ul>{interests.map(interest=><li key={interest}>{interest}</li>)}</ul></section>
  <section className="about-resume" id="cv" aria-labelledby="resume-heading"><div><span className="section-label">CV</span><h3 id="resume-heading">My CV</h3><p>Education, experience and project background in the original document.</p></div>{identity.resume&&<div className="inline-links"><a className="button secondary" href={identity.resume} target="_blank" rel="noreferrer">View CV<span className="sr-only"> (PDF, opens in a new tab)</span></a><a className="button secondary" href={identity.resume} download="Ujan-Dey-CV.pdf">Download CV</a></div>}</section>
  <footer className="supporting-footer"><ExternalLink href={identity.github}>GitHub</ExternalLink><ExternalLink href={identity.linkedin}>LinkedIn</ExternalLink><AppLink className="text-link" href="/contact">Contact Ujan →</AppLink><AppLink className="text-link" href="/">Projects →</AppLink></footer>
  <Caption>UjanOS · A personal research desktop by Ujan Dey</Caption>
 </article>;
}

export default About;
