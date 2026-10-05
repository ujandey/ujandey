import { useState } from 'react';
import type { AppProps } from '../types';
import { researchInterests, notebookEntries } from '../data/notebook';
import { AppHeading, Caption, ExternalLink, Tag } from '../components/UI';
import { Icon } from '../components/Icon';
import './supporting.css';

export default function Notebook({ openApp }: AppProps) {
  const [selected, setSelected] = useState(researchInterests[0].id);
  const interest = researchInterests.find(item=>item.id===selected) ?? researchInterests[0];
  return <article className="supporting-app notebook-app">
    <AppHeading eyebrow="Notebook / research interests" title="Four questions to work on.">My research interests, and the connections between them.</AppHeading>
    <div className="notebook-spread"><nav className="notebook-index" aria-label="Research interests">{researchInterests.map(item=><button key={item.id} aria-pressed={selected===item.id} onClick={()=>setSelected(item.id)}><span>{item.number}</span><div><strong>{item.title}</strong><small>{item.short}</small></div><Icon name="arrow" size={15}/></button>)}</nav><section className="notebook-page" aria-live="polite"><span className="section-label">RESEARCH INTEREST / {interest.number}</span><h3>{interest.question}</h3><p>{interest.description}</p><div className="notebook-topics">{interest.connections.map(topic=><Tag key={topic} tone="moss">{topic}</Tag>)}</div>{selected==='memory'&&<button className="notebook-project-link" onClick={()=>openApp('memory')}><Icon name="memory" size={22}/><div><span>Related project</span><strong>MNEMA · Memory Lab</strong></div><Icon name="arrow" size={16}/></button>}</section></div>
    <Caption>These are research interests and questions, not a publication list or completed research record.</Caption>
    <section className="notebook-notes"><div><span className="section-label">Public notes</span><h3>No public notes yet.</h3></div>{notebookEntries.length>0?<div className="notebook-entry-list">{notebookEntries.map(note=><div key={note.id}><ExternalLink href={note.href}>{note.title}</ExternalLink><p>{note.summary}</p>{note.published&&<time dateTime={note.published}>{note.published}</time>}</div>)}</div>:<p>The questions above describe my current interests. Dated notes and diagrams will appear here when they’re ready to share.</p>}</section>
  </article>;
}
