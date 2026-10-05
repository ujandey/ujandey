import { lazy, Suspense, useEffect, useReducer, useRef, useState } from 'react';
import { apps } from './data/registry';
import { identity } from './data/identity';
import type { AppId } from './types';
import { deskReducer, initialDesk } from './windowState';
import { AppLink, navigateTo, navigationEvent } from './navigation';
import WindowFrame from './components/WindowFrame';
import Wallpaper from './components/Wallpaper';
import { Icon } from './components/Icon';
import Welcome from './apps/Welcome';
import MemoryLab from './apps/MemoryLab';
const PredictionLab=lazy(()=>import('./apps/PredictionLab'));
const ChessLab=lazy(()=>import('./apps/ChessLab'));
const AgentConsole=lazy(()=>import('./apps/AgentConsole'));
const About=lazy(()=>import('./apps/About'));
const Contact=lazy(()=>import('./apps/Contact'));
const routeId=():AppId=>{
 const path=location.pathname.replace(/^\/|\/$/g,'');
 if(path==='notebook')return 'about';
 if(path==='archive'||path==='projects'||path==='')return 'welcome';
 return apps.find(a=>a.id===path)?.id??'welcome';
};
export default function App(){
 const [viewport,setViewport]=useState({width:innerWidth,height:innerHeight-48});const mobile=viewport.width<=1000;
 const [desk,dispatch]=useReducer(deskReducer,undefined,()=>{
  const state=initialDesk(innerWidth,innerHeight-48);
  return routeId()==='welcome'?state:deskReducer(state,{type:'open',id:routeId(),width:innerWidth,height:innerHeight-48});
 });
 const [mobileHome,setMobileHome]=useState(routeId()==='welcome');
 const [showApps,setShowApps]=useState(false);
 const launcherRef=useRef<HTMLButtonElement>(null);const focusRequested=useRef<AppId|null>(null);
 const action=(type:'open'|'focus'|'close'|'minimize'|'maximize',id:AppId)=>dispatch({type,id,...viewport});
 function openApp(id:AppId){navigateTo(id==='welcome'?'/':`/${id}`);}
 function closeApp(id:AppId,minimize=false){
  const remaining=desk.windows.filter(w=>w.id!==id&&!w.minimized).sort((a,b)=>b.z-a.z);
  action(minimize?'minimize':'close',id);
  if(routeId()===id)navigateTo(mobile?'/':remaining[0]&&remaining[0].id!=='welcome'?`/${remaining[0].id}`:'/',true);
  requestAnimationFrame(()=>{const target=Array.from(document.querySelectorAll<HTMLElement>(`[data-launcher="${id}"]`)).find(element=>element.getClientRects().length>0);(target??document.getElementById('desktop'))?.focus();});
 }
 useEffect(()=>{
  const resize=()=>{const size={width:innerWidth,height:innerHeight-48};setViewport(size);dispatch({type:'resize',...size});};
  window.addEventListener('resize',resize);return()=>window.removeEventListener('resize',resize);
 },[]);
 useEffect(()=>{
  const restore=()=>{
   const id=routeId();
   dispatch({type:'open',id,width:innerWidth,height:innerHeight-48});
   setMobileHome(id==='welcome');setShowApps(false);
   if(desk.active!==id)focusRequested.current=id;
   requestAnimationFrame(()=>{
    if(innerWidth<=1000)window.scrollTo({top:0});
    else document.querySelector<HTMLElement>(`[data-app="${id}"] .window-body`)?.scrollTo({top:0});
   });
  };
  window.addEventListener('popstate',restore);window.addEventListener(navigationEvent,restore);
  return()=>{window.removeEventListener('popstate',restore);window.removeEventListener(navigationEvent,restore);};
 },[desk.active]);
 useEffect(()=>{
  document.title=routeId()==='welcome'?'UjanOS — Ujan Dey | Projects':`${apps.find(a=>a.id===routeId())?.title} — UjanOS`;
  let frame:number|undefined;
  if(focusRequested.current){const id=focusRequested.current;focusRequested.current=null;frame=requestAnimationFrame(()=>{const target=document.querySelector<HTMLElement>(`[data-app="${id}"] .window-body`);if(target){target.tabIndex=-1;target.focus({preventScroll:true});}});}
  return()=>{if(frame!==undefined)cancelAnimationFrame(frame);};
 },[desk.active,desk.nextZ,mobileHome]);
 useEffect(()=>{
  if(!showApps)return;
  const frame=requestAnimationFrame(()=>document.querySelector<HTMLElement>('.launcher-grid a')?.focus());
  const dismiss=(e:PointerEvent)=>{if(e.target instanceof Node&&!launcherRef.current?.contains(e.target)&&!document.querySelector('.launcher-popover')?.contains(e.target))setShowApps(false);};
  const keys=(e:KeyboardEvent)=>{if(e.key==='Escape'){setShowApps(false);launcherRef.current?.focus();}};
  document.addEventListener('pointerdown',dismiss);document.addEventListener('keydown',keys);
  return()=>{cancelAnimationFrame(frame);document.removeEventListener('pointerdown',dismiss);document.removeEventListener('keydown',keys);};
 },[showApps]);
 function content(id:AppId){const props={openApp};switch(id){case 'welcome':return <Welcome {...props}/>;case 'memory':return <MemoryLab/>;case 'prediction':return <PredictionLab {...props}/>;case 'chess':return <ChessLab {...props}/>;case 'agent':return <AgentConsole {...props}/>;case 'about':return <About {...props}/>;case 'contact':return <Contact {...props}/>;default:return null;}}
 const reading=desk.windows.some(w=>w.id===desk.active&&w.maximized&&!w.minimized);
 return <div className={`os ${reading?'reading-view':''}`}><a className="skip-link" href="#desktop">Skip to workspace</a>
  <header className="system-bar"><AppLink className="brand" href="/"><span className="brand-mark"><Icon name="memory" size={21}/></span><strong>Ujan<span>OS</span></strong></AppLink>
   <nav className="primary-nav" aria-label="Portfolio"><AppLink href="/" aria-current={routeId()==='welcome'?'page':undefined}>Projects</AppLink><AppLink href="/about" aria-current={routeId()==='about'?'page':undefined}>About</AppLink>{identity.resume&&<a href={identity.resume} target="_blank" rel="noreferrer">CV<span className="sr-only"> (PDF, opens in a new tab)</span></a>}<AppLink href="/contact" aria-current={routeId()==='contact'?'page':undefined}>Contact</AppLink></nav>
   {!mobile&&<button className="arrange-button" onClick={()=>dispatch({type:'arrange',workspace:'overview',...viewport})}><Icon name="arrange" size={15}/><span>Arrange desk</span></button>}
  </header>
  <main id="desktop" className={`desktop ${mobile&&!mobileHome?'mobile-app-open':''}`} tabIndex={-1}><Wallpaper/>
   {mobile&&mobileHome&&<div className="mobile-home"><Welcome openApp={openApp}/></div>}
   {mobile&&!mobileHome&&<AppLink className="mobile-back" href="/">‹ Projects</AppLink>}
   {desk.windows.map(w=>{const app=apps.find(a=>a.id===w.id);if(!app)return null;return <div key={w.id} className={mobile&&mobileHome?'mobile-hidden':undefined}><WindowFrame app={app} window={w} active={desk.active===w.id} mobile={mobile} focus={()=>action('focus',w.id)} close={()=>closeApp(w.id)} minimize={()=>closeApp(w.id,true)} maximize={()=>action('maximize',w.id)} move={(x,y)=>dispatch({type:'move',id:w.id,x,y,...viewport})}><Suspense fallback={<div className="app-pad">Opening application…</div>}>{content(w.id)}</Suspense></WindowFrame></div>;})}
  </main>
  <footer className="desk-footer"><nav className="dock" aria-label="Desktop applications"><button className="all-apps" ref={launcherRef} aria-label="Desktop controls" aria-expanded={showApps} onClick={()=>setShowApps(v=>!v)}><Icon name="arrange" size={21}/></button><span className="dock-divider"/>{apps.map(app=><AppLink key={app.id} href={app.id==='welcome'?'/':`/${app.id}`} className={`dock-item ${desk.active===app.id?'selected':''}`} data-launcher={app.id} aria-label={`Open ${app.title}`}><span className={`app-icon ${app.color} icon-${app.id}`}><Icon name={app.id} size={24}/></span><span className="dock-label">{app.title}</span><span className={`dock-indicator ${desk.windows.some(w=>w.id===app.id)?'open':''}`}/></AppLink>)}</nav></footer>
  {showApps&&<div className="launcher-popover" role="region" aria-label="Desktop controls"><div className="launcher-title"><span>Desktop applications</span><button aria-label="Close desktop controls" onClick={()=>{setShowApps(false);launcherRef.current?.focus();}}>×</button></div><div className="launcher-grid">{apps.map(a=><AppLink key={a.id} href={a.id==='welcome'?'/':`/${a.id}`}><span className={`app-icon ${a.color} icon-${a.id}`}><Icon name={a.id} size={24}/></span><span>{a.title}<small>{a.subtitle}</small></span></AppLink>)}</div><button className="reset-button" onClick={()=>{dispatch({type:'reset',workspace:'overview',...viewport});navigateTo('/',true);setShowApps(false);}}>Reset desk — close windows and restore introduction</button></div>}
 </div>;
}
