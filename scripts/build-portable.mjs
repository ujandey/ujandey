// A Vite/Rollup production build for environments that cannot spawn esbuild.
// Type checking remains a separate required step. Normal `npm run build` uses
// the standard React/Vite configuration; this fallback emits unminified assets.
import { build } from 'vite';
import ts from 'typescript';
await build({
 configFile:false,
 esbuild:false,
 resolve:{preserveSymlinks:true},
 plugins:[{
  name:'typescript-in-process',
  enforce:'pre',
  transform(source,id){
   if(!/\.[cm]?[jt]sx?(?:\?|$)/.test(id))return;
   const productionDefine=context=>{
    const visit=node=>{
     if(ts.isPropertyAccessExpression(node)&&node.getText()==='process.env.NODE_ENV')return context.factory.createStringLiteral('production');
     return ts.visitEachChild(node,visit,context);
    };
    return sourceFile=>ts.visitNode(sourceFile,visit);
   };
   const result=ts.transpileModule(source,{fileName:id.split('?')[0],transformers:{before:[productionDefine]},compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022,sourceMap:true}});
   return {code:result.outputText,map:result.sourceMapText??null};
  },
 }],
 build:{minify:false,cssMinify:false},
});
