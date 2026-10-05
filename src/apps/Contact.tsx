import { useState } from 'react';
import type { AppProps } from '../types';
import { identity, opportunities } from '../data/identity';
import { ExternalLink, Caption } from '../components/UI';
import { Icon } from '../components/Icon';
import './supporting.css';
import { AppLink } from '../navigation';

const Contact: React.FC<AppProps> = () => {
  const [status, setStatus] = useState('');
  async function copyEmail() {
    try { await navigator.clipboard.writeText(identity.email); setStatus('Email address copied.'); }
    catch { setStatus('Copy unavailable. Select the email address above to copy it.'); }
  }
  return <article className="supporting-app contact-app">
    <div className="contact-top"><span className="eyebrow">Contact Ujan</span><Icon name="contact" size={35}/></div>
    <h2>Write to me.</h2>
    <p className="opportunity-line">{opportunities}</p>
    <p className="contact-lead">For questions about MNEMA, my other projects, or research collaboration, email me directly.</p>
    <section className="contact-address" aria-label="Email"><span className="section-label">Email</span><a href={`mailto:${identity.email}`}>{identity.email}</a><div className="contact-actions"><a className="button primary" href={`mailto:${identity.email}`}>Send an email <Icon name="arrow" size={16}/></a><button className="button secondary" onClick={copyEmail}>Copy address</button></div><p className="contact-copy-status" role="status">{status}</p></section>
    <div className="contact-profiles"><div><span className="section-label">Code & projects</span><ExternalLink href={identity.github}>github.com/ujandey</ExternalLink><p>Source code, experiments, and things I’m building.</p></div><div><span className="section-label">LinkedIn</span><ExternalLink href={identity.linkedin}>Find me on LinkedIn</ExternalLink><p>Connect with Ujan Dey.</p></div></div>
    <Caption>Email is the direct way to reach me.</Caption>
    <AppLink className="text-link" href="/about">About &amp; CV <Icon name="arrow" size={15}/></AppLink>
  </article>;
}

export default Contact;
