import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {mnemaBenchmarks,mnemaTaskReplay} from '../src/data/mnema.ts';
test('the published task replay agrees with the final aggregate scores',()=>{
 for(const method of mnemaTaskReplay.methods){
  assert.equal(method.retention.length,5);
  for(const row of method.retention){assert.equal(row.length,5);assert.ok(row.every(value=>value>=0&&value<=1));}
  const mean=method.retention[4].reduce((sum,value)=>sum+value,0)/5*100;
  assert.equal(Number(mean.toFixed(2)),mnemaBenchmarks.find(row=>row.method===method.name).accuracy);
 }
 const mnema=mnemaBenchmarks.find(row=>row.method==='MNEMA'),der=mnemaBenchmarks.find(row=>row.method==='DER++-300');
 assert.equal((mnema.residentBytes/der.residentBytes).toFixed(2),'4.14');
});
test('CV and trace artifacts are unchanged across source and public copies',()=>{
 const cv=fs.readFileSync('public/resume.pdf');assert.deepEqual(cv,fs.readFileSync('Ujandey_cv.pdf'));
 assert.equal(createHash('sha256').update(cv).digest('hex'),'2ae9b41b8afad9b2e1edc5cc707aaf0189223a50370136d3f5a82a553cd7dfb7');
 const traces=JSON.parse(fs.readFileSync('public/evidence/chess-traces.json'));assert.deepEqual(traces,JSON.parse(fs.readFileSync('src/data/chess-traces.json')));
 assert.equal(traces.sourceRevision,'ab9bdec8b42fcbbfd6b84ef30416a53325918146');
 for(const trace of traces.traces){assert.ok(trace.rootBoardRestored);assert.equal(trace.principalVariation[0],trace.selectedMove);assert.equal(trace.completedDepth,trace.depthRecords.at(-1).depth);assert.ok(trace.nodes>0);assert.ok(trace.elapsedSeconds>0);}
});
