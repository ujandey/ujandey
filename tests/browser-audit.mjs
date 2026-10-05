// Real-browser layout and interaction checks. Requires Edge or CDP_URL.
import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const base=process.env.SITE_URL??'http://127.0.0.1:4173';
const output='.verification/portfolio-browser';await fs.mkdir(output,{recursive:true});
const browser=process.env.CDP_URL?await chromium.connectOverCDP(process.env.CDP_URL):await chromium.launch({channel:'msedge',headless:true});
const errors=[];
const cases=[{width:1440,height:900},{width:1024,height:768},{width:820,height:1180},{width:390,height:844},{width:320,height:740},{width:720,height:450}];
const routes=['/memory','/prediction','/chess','/agent','/about','/contact'];
try{
 for(const viewport of cases){
  const page=await browser.newPage({viewport,deviceScaleFactor:1});page.on('pageerror',e=>errors.push(e.message));
  const size=`${viewport.width}x${viewport.height}`;
  const shot=async name=>page.screenshot({path:`${output}/${size}-${name}.png`,fullPage:true});
  const overflow=async()=>assert.ok(await page.evaluate(()=>globalThis.document.documentElement.scrollWidth<=globalThis.innerWidth),`${size}: horizontal page overflow`);
  await page.goto(base,{waitUntil:'networkidle'});await overflow();await shot('projects');
  const intro=page.locator(viewport.width<=1000?'.mobile-home .welcome-content':'.welcome-window .welcome-content');
  await intro.locator('.evidence-summary').scrollIntoViewIfNeeded();assert.ok(await intro.locator('.evidence-summary').isVisible());await shot('intro-evidence');
  for(const label of ['Projects','About','CV','Contact'])assert.ok(await page.getByRole('navigation',{name:'Portfolio',exact:true}).getByRole('link',{name:label,exact:label!=='CV'}).isVisible());
  for(const path of routes){
   await page.goto(base+path,{waitUntil:'networkidle'});const active=page.locator('.desk-globalThis.window.active');
   await shot(path.slice(1));await overflow();
   for(const tab of await active.getByRole('tab').all()){
    await tab.click();await shot(`${path.slice(1)}-${(await tab.textContent()).replaceAll(' ','-')}`);await overflow();
    const tabs=active.locator('.tabs');const before=await tabs.boundingBox();
    if(viewport.width<=1000)await page.evaluate(()=>globalThis.window.scrollTo(0,600));
    else await active.locator('.window-body').evaluate(element=>element.scrollTop=600);
    const after=await tabs.boundingBox();assert.ok(after.y>=0&&after.y<=Math.max(before.y,60),`${size}: section navigation scrolled away`);
    if(viewport.width<=1000)await page.evaluate(()=>globalThis.window.scrollTo(0,0));
    else await active.locator('.window-body').evaluate(element=>element.scrollTop=0);
   }
   if(viewport.width>1000){await active.getByRole('button',{name:'Reading view',exact:true}).click();await shot(`${path.slice(1)}-reading`);await overflow();await active.getByRole('button',{name:'Exit reading view',exact:true}).click();}
  }
  await page.goto(base+'/memory?section=Experiments&checkpoint=3',{waitUntil:'networkidle'});
  assert.equal(await page.getByRole('tab',{name:'Experiments',exact:true}).getAttribute('aria-selected'),'true');
  assert.equal(await page.locator('.memory-retention-chart').count(),2);
  const savedURL=page.url();await page.locator('.memory-stage-controls a').last().click();await page.goBack();assert.equal(page.url(),savedURL);
  await page.goForward();assert.ok(page.url().includes('checkpoint=5'));await page.reload();assert.equal(await page.locator('.memory-stage-controls [aria-current="true"]').textContent(),'After task 58–9');
  await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.evaluate(()=>globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches),true);await shot('reduced-motion');
  await page.close();
 }
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 await page.goto(base+'/chess',{waitUntil:'networkidle'});
 const historyLength=await page.evaluate(()=>globalThis.history.length);const currentURL=page.url();
 const title=page.locator('[data-app="welcome"] .window-titlebar');const box=await title.boundingBox();
 await page.mouse.move(box.x+box.width/2,box.y+20);await page.mouse.down();await page.mouse.move(box.x+box.width/2+40,box.y+60);await page.mouse.up();
 assert.equal(page.url(),currentURL);assert.equal(await page.evaluate(()=>globalThis.history.length),historyLength);
 const visibleBefore=await page.locator('.desk-window:visible').evaluateAll(nodes=>nodes.map(node=>node.dataset.app).sort());
 await page.getByRole('button',{name:'Arrange desk',exact:true}).click();assert.deepEqual(await page.locator('.desk-window:visible').evaluateAll(nodes=>nodes.map(node=>node.dataset.app).sort()),visibleBefore);assert.equal(page.url(),currentURL);
 await page.keyboard.press('Tab');assert.ok(await page.evaluate(()=>globalThis.document.activeElement.getBoundingClientRect().width>0),'Keyboard focus must be visible');
 const pdf=await page.request.get(base+'/resume.pdf');assert.equal(pdf.status(),200);assert.ok(pdf.headers()['content-type'].includes('application/pdf'));
 await page.close();assert.deepEqual(errors,[]);
 console.log(`PASS: rendered desktop/tablet/mobile, reduced motion, section persistence, drag/history, arrange, links and keyboard. Screenshots in ${output}. The 720×450 viewport checks the effective layout of a 1440×900 desktop at 200% browser zoom; inspect actual zoom in a normal browser too.`);
}finally{await browser.close();}
