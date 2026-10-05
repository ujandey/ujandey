import type { AppId, Workspace } from './types';
export interface DeskWindow { id: AppId; x: number; y: number; width: number; height: number; minimized: boolean; maximized: boolean; z: number }
export interface DeskState { windows: DeskWindow[]; active: AppId | null; workspace: Workspace; nextZ: number }
export function bounds(w: DeskWindow, width: number, height: number): DeskWindow {
 const windowWidth=Math.min(w.width,Math.max(320,width-32));
 const windowHeight=Math.min(w.height,Math.max(300,height-160));
 return {...w,width:windowWidth,height:windowHeight,x:Math.max(16,Math.min(w.x,width-windowWidth-16)),y:Math.max(20,Math.min(w.y,height-windowHeight-120))};
}
export function arrangement(id: AppId, width: number, height: number, workspace: Workspace): DeskWindow {
 const compact=width<1180; const welcomeWidth=compact?Math.round(width*.49):Math.min(650,width*.47); const memoryWidth=compact?Math.round(width*.43):Math.min(540,width*.39);
 const first = id==='welcome';
 const x=first?Math.max(28,width*.045):id==='memory'&&workspace==='overview'?Math.min(width-memoryWidth-35,width*.535):Math.max(36,(width-Math.min(790,width-80))/2);
 const y=first?Math.max(32,(height-650)*.25+36):id==='memory'&&workspace==='overview'?Math.max(70,(height-650)*.25+94):48;
 return bounds({id,x,y,width:first?welcomeWidth:id==='memory'&&workspace==='overview'?memoryWidth:Math.min(810,width-80),height:first?650:id==='memory'&&workspace==='overview'?550:Math.min(610,height-155),minimized:false,maximized:false,z:first?3:2},width,height);
}
export function initialDesk(width: number,height: number,workspace: Workspace='overview'): DeskState {const ids:AppId[]=workspace==='overview'?['welcome','memory']:workspace==='explore'?['memory']:['notebook'];return {windows:ids.map(id=>arrangement(id,width,height,workspace)),active:ids[0],workspace,nextZ:5};}
export type DeskAction = {type:'open'|'focus'|'close'|'minimize'|'maximize';id:AppId;width:number;height:number} | {type:'arrange';workspace:Workspace;width:number;height:number} | {type:'reset';workspace:Workspace;width:number;height:number} | {type:'move';id:AppId;x:number;y:number;width:number;height:number} | {type:'resize';width:number;height:number};
export function deskReducer(state:DeskState,action:DeskAction):DeskState {
 if(action.type==='reset')return initialDesk(action.width,action.height,action.workspace);
 if(action.type==='arrange')return {...state,windows:state.windows.map((w,i)=>w.minimized||w.maximized?w:bounds({...w,x:28+i*36,y:24+i*28},action.width,action.height))};
 if(action.type==='resize')return {...state,windows:state.windows.map(w=>bounds(w,action.width,action.height))};
 if(action.type==='move')return {...state,windows:state.windows.map(w=>w.id===action.id?bounds({...w,x:action.x,y:action.y},action.width,action.height):w)};
 const current=state.windows.find(w=>w.id===action.id);
 if(action.type==='open'||action.type==='focus'){const expanded=current&&action.type==='open'&&action.id==='memory'&&state.workspace==='overview'&&!current.maximized&&current.width<Math.min(810,action.width-80)?arrangement(action.id,action.width,action.height,'explore'):current;return {...state,active:action.id,nextZ:state.nextZ+1,windows:current?state.windows.map(w=>w.id===action.id?{...expanded!,minimized:false,z:state.nextZ}:w):[...state.windows,{...arrangement(action.id,action.width,action.height,state.workspace),z:state.nextZ}]};}
 if(action.type==='maximize')return {...state,active:action.id,nextZ:state.nextZ+1,windows:state.windows.map(w=>w.id===action.id?{...w,maximized:!w.maximized,z:state.nextZ}:w)};
 const windows=action.type==='close'?state.windows.filter(w=>w.id!==action.id):state.windows.map(w=>w.id===action.id?{...w,minimized:true}:w);
 return {...state,windows,active:state.active===action.id?[...windows].filter(w=>!w.minimized).sort((a,b)=>b.z-a.z)[0]?.id??null:state.active};
}
