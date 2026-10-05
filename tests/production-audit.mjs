import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const base=process.env.SITE_URL??'http://127.0.0.1:4173';
for(const path of ['/','/memory?section=Experiments&checkpoint=3','/prediction?section=Evaluation','/chess?section=Recorded+search&trace=scotch','/agent?section=Example+replay&step=2','/about','/contact','/notebook','/archive']){
 const response=await fetch(base+path);assert.equal(response.status,200,path);assert.match(await response.text(),/id="root"/,path);
}
const cv=await fetch(base+'/resume.pdf');assert.equal(cv.status,200);assert.match(cv.headers.get('content-type'),/application\/pdf/);
const bytes=Buffer.from(await cv.arrayBuffer());assert.equal(bytes.subarray(0,5).toString(),'%PDF-');assert.deepEqual(bytes,await fs.readFile('Ujandey_cv.pdf'));
assert.equal(createHash('sha256').update(bytes).digest('hex'),'2ae9b41b8afad9b2e1edc5cc707aaf0189223a50370136d3f5a82a553cd7dfb7');
for(const [path,type] of [['/archive/noted.png',/image\/png/],['/evidence/chess-traces.json',/application\/json/],['/wallpapers/ujan-flow.svg',/image\/svg/]]){
 const response=await fetch(base+path);assert.equal(response.status,200,path);assert.match(response.headers.get('content-type'),type,path);
}
const config=JSON.parse(await fs.readFile('vercel.json','utf8'));const rewrite=new RegExp('^'+config.rewrites[0].source+'$');
for(const path of ['/resume.pdf','/archive/noted.png','/evidence/chess-traces.json','/wallpapers/ujan-flow.svg','/favicon.svg','/social.png'])assert.equal(rewrite.test(path),false,path+' must stay a public file');
for(const path of ['/memory','/chess','/prediction','/about','/contact'])assert.equal(rewrite.test(path),true,path+' requires SPA fallback');
const html=await(await fetch(base)).text();
for(const asset of [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map(x=>x[1]))assert.equal((await fetch(base+asset)).status,200,asset);
console.log('PASS: production deep-link documents, bundle assets, unchanged CV bytes/PDF MIME, screenshot/trace MIME, and Vercel public-path exclusions.');
