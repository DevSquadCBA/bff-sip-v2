// @ts-check
import express from "express";
import {parse} from 'yaml'
process.env.HOST = "192.168.1.32";
process.env.USER = "root";
process.env.PASS = "1234";
process.env.DB = "piatti";
const functionsFiles =[];
const folders = Deno.readdirSync('../src/functions');
for(const dir of folders){
    const files = Deno.readdirSync('../src/functions/' + dir);
    for(const file of files){
        if(file.endsWith('.ts')){
            functionsFiles.push('../src/functions/' + dir + '/' + file);
        }
    }
}
Deno.writeFileSync('./imports.ts',functionsFiles.map(file=>`export {Handler as ${file.replace('.ts','').replace(/.*(?:\/)(\w*$)/,'$1')}} from '${file.replace('.ts','')}';`).join('\n'));

import * as imports from './imports';
console.log(imports);


const template = parse(Deno.readFileTextSync('template.yaml','utf-8'), {logLevel:'silent'});
const swagger = parse(Deno.readFileTextSync('swagger.yaml','utf-8'), {logLevel:'silent'});
const functions = Object.keys(template.Resources).filter(name=>name.includes('Function'));
const app = express();
const PORT = 3000;
const router = express.Router();


const paths = swagger.paths
let promises:Promise<any>[] =[];
for(const path of Object.keys(paths)){
    const methods = paths[path];
    //console.log(path, Object.keys(methods));
    for(const method of Object.keys(methods)){
        const operationId = methods[method].operationId;
        const found = functions.find(func=>func.toLowerCase() === operationId.toLowerCase() + 'function');
        if(!found) continue;
        const folder = template.Resources[found].Properties.CodeUri;
        const file = template.Resources[found].Properties.Handler;
        console.log(folder + '/' + file);
        if(method === 'get'|| method === 'post' || method === 'put'|| method === 'delete'){
            promises = [...promises, import(folder + '/' + file.replace('.Handler','')).then(handler=>{
                console.log(handler);
                router[method](path,async (request:any, response:any) => {
                    response.send(await handler(request));
                })
            })]
        }
        
    }
}
Promise.all(promises).then(()=>{
    router.get('/', (request:any, response:any) => {
        response.send(router.all)
    })
    
    app.use(router.route);
    
    console.log(`Server running at http://localhost:${PORT}`);
    app.listen({ port: PORT }); 
})
