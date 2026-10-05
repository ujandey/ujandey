// In-process TSX loading lets DOM checks run without a bundler subprocess.
import { registerHooks } from 'node:module';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

registerHooks({
 resolve(specifier,context,nextResolve){
  if(specifier.startsWith('.')&&context.parentURL?.startsWith('file:')){
   for(const extension of ['', '.tsx', '.ts']){
    const url=new URL(specifier+extension,context.parentURL);
    if(existsSync(fileURLToPath(url)))return {url:url.href,shortCircuit:true};
   }
  }
  return nextResolve(specifier,context);
 },
 load(url,context,nextLoad){
  if(url.endsWith('.css'))return {format:'module',source:'export default {};',shortCircuit:true};
  if(url.endsWith('.json')&&url.includes('/src/'))return {format:'module',source:`export default ${readFileSync(fileURLToPath(url),'utf8')};`,shortCircuit:true};
  if(/\.tsx?$/.test(url)){
   const source=ts.transpileModule(readFileSync(fileURLToPath(url),'utf8'),{
    compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022},
   }).outputText;
   return {format:'module',source,shortCircuit:true};
  }
  return nextLoad(url,context);
 },
});
