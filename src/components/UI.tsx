import { useEffect, useId, useRef, type ReactNode } from 'react';
import { Icon } from './Icon';
import { AppLink } from '../navigation';
export function Tabs<T extends string>({ tabs, value, onChange, href }: { tabs: readonly T[]; value: T; onChange: (value: T) => void; href?: (value: T) => string }) {
 const id = useId(); const ref = useRef<HTMLDivElement>(null); const panelId=`${id}-panel`;
 useEffect(()=>{const panel=ref.current?.nextElementSibling;if(panel instanceof HTMLElement){panel.id=panelId;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',`${id}-${value}`);panel.tabIndex=0;}},[id,panelId,value]);
 return <div className="tabs" role="tablist" aria-label="Application views" ref={ref}>{tabs.map((tab,i)=>{
  const props = { id: `${id}-${tab}`, role: 'tab', 'aria-controls': panelId, 'aria-selected': value===tab, tabIndex: value===tab?0:-1,
   onKeyDown: (e: React.KeyboardEvent) => {let index=i;if(e.key==='ArrowRight')index=(i+1)%tabs.length;else if(e.key==='ArrowLeft')index=(i-1+tabs.length)%tabs.length;else if(e.key==='Home')index=0;else if(e.key==='End')index=tabs.length-1;else return;e.preventDefault();onChange(tabs[index]);(ref.current?.children[index] as HTMLElement)?.focus();}
  };
  return href ? <AppLink key={tab} {...props} href={href(tab)}>{tab}</AppLink> : <button key={tab} {...props} onClick={()=>onChange(tab)}>{tab}</button>;
 })}</div>;
}
export function ExternalLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) { return <a className={`text-link ${className}`} href={href} target="_blank" rel="noreferrer">{children}<Icon name="external" size={14}/><span className="sr-only"> (opens in a new tab)</span></a> }
export function Caption({ children }: { children: ReactNode }) {return <p className="caption">{children}</p>}
export function Tag({ children, tone = '' }: { children: ReactNode; tone?: string }) {return <span className={`tag ${tone}`}>{children}</span>}
export function AppHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {return <header className="app-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{children&&<p>{children}</p>}</header>}
