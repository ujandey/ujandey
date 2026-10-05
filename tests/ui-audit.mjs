// Behavioral verification in jsdom. Browser geometry and visual review are separate.
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import './register-tsx.mjs';
const dom=new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>',{url:'http://localhost/',pretendToBeVisual:true});
const browserWindow=dom.window;
const {document,location,history}=browserWindow;
for(const key of ['window','document','navigator','location','history','localStorage','Node','Event','HTMLElement','innerWidth','innerHeight'])Object.defineProperty(globalThis,key,{configurable:true,get:()=>key==='window'?browserWindow:browserWindow[key]});
globalThis.IS_REACT_ACT_ENVIRONMENT=true;
globalThis.requestAnimationFrame=browserWindow.requestAnimationFrame.bind(browserWindow);
globalThis.cancelAnimationFrame=browserWindow.cancelAnimationFrame.bind(browserWindow);
browserWindow.scrollTo=()=>{};browserWindow.HTMLElement.prototype.scrollTo=function(){this.scrollTop=0;};
let copied='';Object.defineProperty(browserWindow.navigator,'clipboard',{value:{writeText:async text=>{copied=text;}}});
const {createRoot}=await import('react-dom/client');const {default:App}=await import('../src/App.tsx');
const root=createRoot(document.getElementById('root'));
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function settle(){await act(async()=>{await delay(45);});}
async function click(element){assert.ok(element,'Expected a reachable control');await act(async()=>{element.dispatchEvent(new browserWindow.MouseEvent('click',{bubbles:true,cancelable:true,button:0}));await delay(45);});await settle();}
async function waitFor(selector){for(let i=0;i<40;i++){const node=document.querySelector(selector);if(node)return node;await settle();}throw new Error(`Missing ${selector}`);}
const active=()=>document.querySelector('.desk-window.active');
const control=(container,text)=>Array.from(container.querySelectorAll('button,a')).find(node=>node.textContent.includes(text));
async function launch(id){await click(document.querySelector(`.dock [data-launcher="${id}"]`));await waitFor(`.desk-window.active[data-app="${id}"] article,.desk-window.active[data-app="${id}"] .app-pad`);assert.equal(active().dataset.app,id);}
async function back(){await act(async()=>{history.back();await delay(70);});await settle();}
async function forward(){await act(async()=>{history.forward();await delay(70);});await settle();}
async function visit(href){await act(async()=>{history.pushState({},'',href);browserWindow.dispatchEvent(new browserWindow.PopStateEvent('popstate'));await delay(60);});await settle();}
let views=0;
try{
 await act(async()=>root.render(React.createElement(App)));
 assert.equal(document.querySelectorAll('.desk-window').length,2);
 const intro=document.querySelector('.welcome-content');
 assert.match(intro.textContent,/physics undergraduate at NIT Agartala/);
 assert.match(intro.textContent,/Open to research internships, AI\/ML internships, and research collaborations\./);
 assert.match(intro.textContent,/77\.12%/);assert.match(intro.textContent,/89\.39%/);assert.match(intro.textContent,/4\.14×/);
 assert.match(intro.textContent,/MNEMA is a proof of concept for CognX/);
 assert.equal(intro.querySelector('a[href="https://www.cognx.tech"]').target,'_blank');
 assert.doesNotMatch(intro.textContent,/Swapnil|Built on initial code/);
 assert.deepEqual(Array.from(document.querySelectorAll('.primary-nav a')).map(x=>x.textContent.replace(/ \(PDF.*\)/,'')),['Projects','About','CV','Contact']);
 assert.ok(intro.querySelector('a[download]'));assert.equal(intro.querySelector('a[download]').getAttribute('href'),'/resume.pdf');
 assert.equal(intro.querySelector('.archive-image img').getAttribute('src'),'/archive/noted.png');
 await click(document.querySelector('.welcome-actions .primary'));
 assert.equal(active().dataset.app,'memory');assert.equal(location.pathname,'/memory');
 assert.match(active().textContent,/MNEMA is a proof of concept for CognX/);
 assert.ok(active().querySelector('a[href="https://www.cognx.tech"]'));
 assert.doesNotMatch(active().textContent,/Swapnil|Built on initial code/);
 const historyLength=history.length;const currentURL=location.href;
 // Pointer focus, keyboard focus and drag/window management never navigate.
 const welcome=document.querySelector('[data-app="welcome"]');
 await act(async()=>welcome.dispatchEvent(new browserWindow.Event('pointerdown',{bubbles:true})));
 assert.equal(active().dataset.app,'welcome');assert.equal(history.length,historyLength);assert.equal(location.href,currentURL);
 await act(async()=>document.querySelector('[data-app="memory"] .window-body').focus());
 assert.equal(location.href,currentURL);assert.equal(history.length,historyLength);
 for(const id of ['memory','prediction','chess','agent','about','contact']){
  await launch(id);
  for(const tab of Array.from(active().querySelectorAll('[role="tab"]'))){
   const name=tab.textContent;await click(tab);
   assert.equal(active().querySelector('[aria-selected="true"]').textContent,name);
   assert.equal(new URLSearchParams(location.search).get('section'),name);
   assert.ok(active().querySelector('[role="tabpanel"]'));
   assert.ok(tab.getAttribute('href').startsWith(`/${id}?`));views++;
  }
 }
 await visit('/memory?section=Experiments&checkpoint=5');
 assert.equal(active().querySelectorAll('.memory-retention-chart').length,2);
 const charts=()=>Array.from(active().querySelectorAll('.memory-retention-chart'));
 assert.match(charts()[0].textContent,/77\.12%/);assert.match(charts()[1].textContent,/89\.39%/);
 await click(active().querySelector('.memory-stage-controls a'));
 assert.equal(new URLSearchParams(location.search).get('checkpoint'),'1');
 assert.match(charts()[0].querySelector('p').textContent,/99\.80%/);assert.match(charts()[1].querySelector('p').textContent,/99\.94%/);
 await back();assert.equal(new URLSearchParams(location.search).get('checkpoint'),'5');assert.match(charts()[0].textContent,/77\.12%/);
 await forward();assert.match(charts()[0].querySelector('p').textContent,/99\.80%/);
 await click(control(active(),'Copy project link'));assert.equal(copied,location.href);
 await visit('/memory?section=Architecture');assert.ok(active().querySelector('.mnema-flow'));assert.match(active().textContent,/FastStore → cortex/);
 await launch('prediction');assert.equal(active().querySelectorAll('select').length,0);
 assert.equal(active().querySelector('.inline-links a.button.primary').href,'https://www.kaggle.com/code/ujandey/wc2026predictor');
 assert.equal(active().querySelector('.inline-links a.button.primary').target,'_blank');
 assert.match(active().querySelector('.inline-links a:last-child').textContent,/GitHub companion application/);
 await click(control(active(),'Pipeline'));
 const firstTab=active().querySelector('[aria-selected="true"]');
 await act(async()=>firstTab.dispatchEvent(new browserWindow.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true})));
 assert.equal(document.activeElement.textContent,'Evaluation');assert.match(active().textContent,/before calibrated.fit/);
 await click(control(active(),'Pipeline'));
 for(const stage of active().querySelectorAll('.prediction-pipeline a'))await click(stage);
 assert.equal(new URLSearchParams(location.search).get('stage'),'5');assert.match(active().querySelector('.prediction-stage').textContent,/Tournament simulation/);
 await launch('chess');
 assert.match(active().textContent,/Recorded local output/);assert.match(active().textContent,/g1f3/);
 assert.ok(active().querySelector('a[href="/evidence/chess-traces.json"]'));
 for(const item of active().querySelectorAll('.chess-position-picker button'))await click(item);
 assert.match(active().textContent,/a1a8/);assert.match(active().textContent,/908/);
 await click(control(active(),'Show selected move'));assert.match(active().querySelector('.chess-board title').textContent,/Ra8#/);
 await click(control(active(),'Board'));
 const beforePosition=history.length;
 await click(active().querySelectorAll('.chess-position-picker button')[1]);
 assert.equal(history.length,beforePosition+1,'Selecting a position creates one navigation entry');
 await click(active().querySelector('[aria-label="Next position in line"]'));assert.equal(new URLSearchParams(location.search).get('move'),'1');
 await click(control(active(),'Search'));await click(active().querySelectorAll('.chess-search-stages button')[1]);
 assert.ok(active().querySelector('.pruning-mark'));assert.match(active().textContent,/Pruning illustrated/);
 await click(active().querySelectorAll('.chess-search-stages button')[2]);assert.match(active().querySelector('.chess-tree').textContent,/Same position/);
 await launch('agent');
 for(const item of active().querySelectorAll('.agent-steps button'))await click(item);
 assert.match(active().querySelector('.agent-result').textContent,/17/);assert.equal(new URLSearchParams(location.search).get('step'),'3');
 await back();assert.equal(new URLSearchParams(location.search).get('step'),'2');assert.match(active().querySelector('.agent-operation h3').textContent,/run_python_file/);
 await launch('contact');assert.match(active().textContent,/Open to research internships, AI\/ML internships, and research collaborations\./);
 await click(control(active(),'Copy address'));assert.equal(copied,'ujandey007@gmail.com');
 browserWindow.navigator.clipboard.writeText=async()=>{throw new Error('denied');};
 await click(control(active(),'Copy address'));assert.match(active().querySelector('[role="status"]').textContent,/address above/);
 await click(active().querySelector('[aria-label="Minimize Contact"]'));assert.ok(document.querySelector('[data-app="contact"]').hidden);
 await launch('contact');assert.ok(!active().hidden);
 await click(active().querySelector('[aria-label="Close Contact"]'));assert.ok(!document.querySelector('[data-app="contact"]'));
 await launch('contact');
 // Arrange must keep all visible/minimized windows and current navigation intact.
 const beforeArrange=Array.from(document.querySelectorAll('.desk-window')).map(node=>[node.dataset.app,node.hidden,node.classList.contains('maximized')]);
 const urlBeforeArrange=location.href;const historyBeforeArrange=history.length;
 await click(document.querySelector('.arrange-button'));
 assert.deepEqual(Array.from(document.querySelectorAll('.desk-window')).map(node=>[node.dataset.app,node.hidden,node.classList.contains('maximized')]),beforeArrange);
 assert.equal(location.href,urlBeforeArrange);assert.equal(history.length,historyBeforeArrange);
 await click(control(active(),'Reading view'));assert.ok(document.querySelector('.os.reading-view'));assert.equal(location.href,urlBeforeArrange);
 await click(control(active(),'Exit reading view'));assert.ok(!document.querySelector('.os.reading-view'));
 await click(document.querySelector('.all-apps'));assert.equal(document.activeElement,document.querySelector('.launcher-grid a'));
 await act(async()=>document.dispatchEvent(new browserWindow.KeyboardEvent('keydown',{key:'Escape',bubbles:true})));
 assert.equal(document.activeElement,document.querySelector('.all-apps'));
 await click(document.querySelector('.all-apps'));await click(document.querySelector('.reset-button'));
 assert.equal(location.pathname,'/');assert.equal(document.querySelectorAll('.desk-window').length,2);
 // Tablet and mobile retain permanently labeled navigation, intro evidence, and CV.
 for(const width of [820,390,320]){
  await act(async()=>{browserWindow.innerWidth=width;browserWindow.dispatchEvent(new browserWindow.Event('resize'));});
  assert.ok(document.querySelector('.mobile-home'));assert.equal(document.querySelectorAll('.primary-nav a').length,4);
  assert.match(document.querySelector('.mobile-home').textContent,/77\.12%/);assert.ok(document.querySelector('.mobile-home a[download]'));
  await click(document.querySelector('.mobile-home .work-index a[href="/chess"]'));assert.equal(active().dataset.app,'chess');
  await click(document.querySelector('.primary-nav a[href="/contact"]'));assert.equal(active().dataset.app,'contact');
  await back();assert.equal(active().dataset.app,'chess');await back();assert.ok(document.querySelector('.mobile-home'));
 }
 // Reload direct project sections and meaningful experiment selections.
 await act(async()=>root.unmount());
 history.replaceState({},'','/memory?section=Experiments&checkpoint=3');
 const reloaded=createRoot(document.getElementById('root'));
 await act(async()=>reloaded.render(React.createElement(App)));await settle();
 assert.equal(document.querySelector('[aria-selected="true"]').textContent,'Experiments');
 assert.equal(document.querySelector('.memory-stage-controls [aria-current="true"]').textContent,'After task 34–5');
 await act(async()=>reloaded.unmount());
 console.log(`PASS: 7 desktop applications, ${views} tab views, source/CV/evidence links, history, direct reload, focus, arrange/reset, recorded/conceptual interactions, clipboard, keyboard, tablet and mobile DOM behavior.`);
}finally{dom.window.close();}
