import { useState } from 'react';
import { AppLink } from '../navigation';
import type { AppId } from '../types';
export default function CaseStudyFooter({ id }: { id: AppId }) {
 const [status,setStatus]=useState('');
 async function copyLink(){
  const url=new URL(location.pathname===`/${id}`?location.pathname+location.search:`/${id}`,location.origin).href;
  try{await navigator.clipboard.writeText(url);setStatus('Link copied.');}
  catch{setStatus(`Copy this link: ${url}`);}
 }
 return <footer className="case-footer"><nav aria-label="Continue reading"><AppLink href="/">Projects</AppLink><AppLink href="/about">About &amp; CV</AppLink><AppLink href="/contact">Contact</AppLink></nav><button className="text-link" onClick={copyLink}>Copy project link</button><p role="status">{status}</p></footer>;
}
