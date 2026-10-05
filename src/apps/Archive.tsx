import { archiveProjects } from '../data/archive';
import type { AppProps } from '../types';
import { AppHeading, ExternalLink, Caption } from '../components/UI';
import './supporting.css';

const Archive: React.FC<AppProps> = () => {
  return <article className="supporting-app archive-app">
    <AppHeading eyebrow="Earlier web project" title="Noted — notes & drawing.">A React browser notebook with note cards, a drawing canvas and localStorage persistence. I developed this web application; notes remain in the visitor’s browser rather than an account-backed service.</AppHeading>
    <div className="archive-projects">{archiveProjects.map((project,index)=><section className={`archive-project archive-${project.accent}`} key={project.id}>
      {project.screenshot?<a className="archive-image" href={project.live??project.source} target="_blank" rel="noreferrer"><img src={project.screenshot} alt={project.screenshotAlt??`${project.title} application screenshot`} loading="lazy"/></a>:<div className="archive-cover" aria-hidden="true"><span className="archive-cover-label">{project.category}</span>{project.id==='noted'?<svg className="archive-notes-art" viewBox="0 0 180 135" fill="none"><g stroke="currentColor" strokeWidth="1"><rect x="18" y="19" width="87" height="99" fill="#f7f8ee" transform="rotate(-6 18 19)"/><rect x="76" y="34" width="87" height="87" fill="#f7f8ee" transform="rotate(8 76 34)"/><path d="M33 41h46M31 51h39M30 61h43M29 71h21"/><path d="M91 88c-6-27 32-16 23-1s-26 8-16-12 28 3 36 18" strokeWidth="2"/><path d="m117 56 36-33 5 6-36 33-9 3z" fill="#cbd5b9"/></g></svg>:<><span className="archive-monogram">{project.mark}</span><svg className="archive-music-art" viewBox="0 0 210 65" fill="none"><path d="M0 32h210M0 45h210M0 58h210" stroke="currentColor"/><path d="M15 25V9m14 16V3m14 22V13m14 12V6m14 19V17m14 8V8m14 17V3m14 22V13m14 12V6m14 19V17m14 8V8m14 17V3m14 22V13" stroke="currentColor" strokeWidth="5"/></svg></>}<span className="archive-cover-number">0{index+1}</span></div>}
      <div className="archive-description"><span className="section-label">{project.technology}</span><h3>{project.title}</h3><p>{project.description}</p><div className="inline-links">{project.live&&<ExternalLink href={project.live}>Open website</ExternalLink>}<ExternalLink href={project.source}>View source</ExternalLink></div></div>
    </section>)}</div>
    <Caption>Original Noted screenshot from the owner’s profile repository. External demo availability is unverified.</Caption>
  </article>;
}

export default Archive;
