import { useRef, type ReactNode, type PointerEvent } from 'react';
import type { AppDefinition } from '../types';
import type { DeskWindow } from '../windowState';
import { Icon } from './Icon';
interface Props { app: AppDefinition; window: DeskWindow; active:boolean; mobile:boolean; children:ReactNode; focus:()=>void; close:()=>void; minimize:()=>void; maximize:()=>void; move:(x:number,y:number)=>void }
export default function WindowFrame({app,window:w,active,mobile,children,focus,close,minimize,maximize,move}:Props){
 const drag=useRef<{x:number;y:number;ox:number;oy:number}|null>(null);
 function pointerDown(e:PointerEvent<HTMLElement>){if(mobile||w.maximized||e.button!==0||(e.target as HTMLElement).closest('button,a'))return;focus();drag.current={x:e.clientX,y:e.clientY,ox:w.x,oy:w.y};e.currentTarget.setPointerCapture(e.pointerId);}
 return <section data-app={app.id} className={`desk-window ${app.id}-window ${active?'active':''} ${w.maximized?'maximized':''}`} aria-label={app.title} style={mobile?undefined:{left:w.maximized?16:w.x,top:w.maximized?12:w.y,width:w.maximized?'calc(100% - 32px)':w.width,height:w.maximized?'calc(100% - 110px)':w.height,zIndex:w.z}} onPointerDown={()=>{if(!active)focus()}} onFocusCapture={()=>{if(!active)focus()}} hidden={w.minimized||(mobile&&!active)}>
 <header className="window-titlebar" onPointerDown={pointerDown} onPointerMove={e=>{if(drag.current)move(drag.current.ox+e.clientX-drag.current.x,drag.current.oy+e.clientY-drag.current.y)}} onPointerUp={e=>{drag.current=null;if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId)}} onPointerCancel={()=>drag.current=null} onDoubleClick={e=>{if(!(e.target as HTMLElement).closest('button')&&!mobile)maximize()}}>
 <div className="window-controls">
 <button className="traffic-light close" aria-label={`Close ${app.title}`} onClick={close}><span><svg viewBox="0 0 12 12" aria-hidden="true"><path d="m3.5 3.5 5 5m0-5-5 5"/></svg></span></button>
 {!mobile&&<><button className="traffic-light minimize" aria-label={`Minimize ${app.title}`} onClick={minimize}><span><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 6h7"/></svg></span></button>
 <button className="traffic-light maximize" aria-label={`${w.maximized?'Restore':'Maximize'} ${app.title}`} onClick={maximize}><span><svg viewBox="0 0 12 12" aria-hidden="true">{w.maximized?<path d="M2 5h3V2m5 5H7v3"/>:<path d="M2.5 5V2.5H5m4.5 4v3H7M3 3l2 2m4 4L7 7"/>}</svg></span></button></>}
 </div><div className="window-title"><span className={`title-icon ${app.color}`}><Icon name={app.id} size={16}/></span><span>{app.title}</span></div>{!mobile&&<button className="reading-toggle" onClick={maximize}>{w.maximized?'Exit reading view':'Reading view'}</button>}</header><div className="window-body">{children}</div></section>
}
