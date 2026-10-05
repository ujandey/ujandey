import { test } from 'node:test';
import assert from 'node:assert/strict';
import { deskReducer, initialDesk, bounds } from '../src/windowState.ts';
const size={width:1366,height:720};
const act=(state,type,id)=>deskReducer(state,{type,id,...size});
test('one instance, focus, minimize, restore, and close select the correct window',()=>{
 let desk=initialDesk(size.width,size.height);
 desk=act(desk,'open','chess');desk=act(desk,'open','chess');
 assert.equal(desk.windows.filter(w=>w.id==='chess').length,1);
 assert.equal(desk.active,'chess');
 desk=act(desk,'minimize','chess');assert.equal(desk.windows.find(w=>w.id==='chess').minimized,true);assert.notEqual(desk.active,'chess');
 desk=act(desk,'open','chess');assert.equal(desk.windows.find(w=>w.id==='chess').minimized,false);assert.equal(desk.active,'chess');
 desk=act(desk,'close','chess');assert.equal(desk.windows.some(w=>w.id==='chess'),false);assert.equal(desk.active,'welcome');
});
test('maximize and restore preserve window position',()=>{let desk=act(initialDesk(size.width,size.height),'open','memory');const before={...desk.windows.find(w=>w.id==='memory')};desk=act(desk,'maximize','memory');assert.equal(desk.windows.find(w=>w.id==='memory').maximized,true);desk=act(desk,'maximize','memory');const after=desk.windows.find(w=>w.id==='memory');assert.equal(after.maximized,false);assert.equal(after.x,before.x);assert.equal(after.y,before.y);});
test('arrange preserves visible work, active app, minimized and expanded state; reset is separate',()=>{
 let desk=act(initialDesk(size.width,size.height),'open','agent');
 desk=act(desk,'open','chess');desk=act(desk,'minimize','chess');desk=act(desk,'maximize','memory');
 const before=desk;
 desk=deskReducer(desk,{type:'arrange',workspace:'overview',...size});
 assert.equal(desk.active,before.active);assert.equal(desk.nextZ,before.nextZ);
 assert.deepEqual(desk.windows.map(w=>[w.id,w.minimized,w.maximized,w.z]),before.windows.map(w=>[w.id,w.minimized,w.maximized,w.z]));
 assert.equal(desk.windows.find(w=>w.id==='agent').minimized,false);
 desk=deskReducer(desk,{type:'reset',workspace:'overview',...size});
 assert.deepEqual(desk.windows.map(w=>w.id),['welcome','memory']);assert.equal(desk.active,'welcome');
});
test('drag and viewport changes keep title controls reachable',()=>{let desk=initialDesk(size.width,size.height);desk=deskReducer(desk,{type:'move',id:'memory',x:-900,y:9000,...size});const w=desk.windows.find(w=>w.id==='memory');assert.ok(w.x>=16);assert.ok(w.y<=size.height-180);const small=bounds(w,820,580);assert.ok(small.x+small.width<=804);assert.ok(small.y<=400);});
test('Notebook uses a full application width on a narrow laptop',()=>{const desk=initialDesk(800,720,'notebook');assert.equal(desk.active,'notebook');assert.equal(desk.windows[0].width,720);});
test('overview and dragged windows stay above the application dock',()=>{
 for(const [width,height] of [[1920,1032],[1440,852],[1366,720],[800,552]]){
  let desk=initialDesk(width,height);
  for(const window of desk.windows)assert.ok(window.y+window.height<=height-120,`${width}: ${window.id} overlaps the labeled dock`);
  desk=deskReducer(desk,{type:'move',id:'memory',x:width,y:height,width,height});
  const window=desk.windows.find(w=>w.id==='memory');
  assert.ok(window.y+window.height<=height-120);
 }
});
test('opening Memory Lab expands its preview while pointer focus preserves the composition',()=>{const initial=initialDesk(size.width,size.height);const preview=initial.windows.find(w=>w.id==='memory');const focused=act(initial,'focus','memory');assert.equal(focused.windows.find(w=>w.id==='memory').width,preview.width);const opened=act(initial,'open','memory');assert.equal(opened.windows.find(w=>w.id==='memory').width,810);assert.equal(opened.windows.filter(w=>w.id==='memory').length,1);});
