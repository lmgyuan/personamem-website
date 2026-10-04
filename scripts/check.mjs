import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const sandbox = {window:{}};
vm.runInNewContext(fs.readFileSync(path.join(dist,'data.js'),'utf8'),sandbox);
const data=sandbox.window.PERSONAMEM_DATA;
assert.deepEqual(Object.keys(data),['v1','v2','v3']);
let total=0;
for(const [id,d] of Object.entries(data)){
  assert(d.rows.length>0,`${id}: missing results`);
  assert(d.settings.some(([key])=>key===d.defaultSetting));
  const identities=new Set();
  for(const row of d.rows){
    const identity=[row.model,row.mode,row.setting].join('|');
    assert(!identities.has(identity),`${id}: duplicate ${identity}`);identities.add(identity);
    assert(d.settings.some(([key])=>key===row.setting),`${id}: invalid setting`);
    for(const [key] of d.columns){assert(Number.isFinite(row[key]),`${id}: missing metric ${key}`);assert(row[key]>=0);if(key!=='input')assert(row[key]<=100);}
    total++;
  }
  for(const key of ['paper','code','data','source'])assert(d[key].startsWith('https://'));
}
// Catch transcription regressions at the protocol boundaries.
assert.equal(data.v1.rows.length,15);
assert.equal(data.v1.rows.filter(r=>r.score===52).length,3);
assert.equal(data.v2.rows.filter(r=>r.setting==='128k').length,6);
assert.equal(data.v2.rows.find(r=>r.mode==='Agentic memory').input,2000);
assert.equal(data.v3.rows.length,8);
assert.equal(Math.max(...data.v3.rows.map(r=>r.score)),53.7);
const html=fs.readFileSync(path.join(dist,'index.html'),'utf8');
const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g)){
 const ref=match[1];
 if(ref.startsWith('#'))assert(ids.has(ref.slice(1)),`Broken section link ${ref}`);
 else if(!/^(https?:|data:)/.test(ref))assert(fs.existsSync(path.join(dist,ref)),`Missing asset ${ref}`);
}
new vm.Script(fs.readFileSync(path.join(dist,'app.js'),'utf8'));
assert(fs.existsSync(path.join(dist,'.nojekyll')));
console.log(`Passed: ${total} source-identified result rows, three benchmark configurations, metric ranges, local assets, section links, and JavaScript syntax.`);
