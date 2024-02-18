// @ts-check
import express from "express";
import {parse} from 'yaml'
import fs from 'fs';
process.env.HOST = "192.168.1.32";
process.env.USER = "root";
process.env.PASS = "1234";
process.env.DB = "piatti";

const functionsFiles =[];

const folders = fs.readdirSync('./.aws-sam/build/');
for(const dir of folders){
    const files = fs.readdirSync('./.aws-sam/build/' + dir);
    for(const file of files){
        if(file.endsWith('.js')){
            functionsFiles.push({functionName: dir, file:'./.aws-sam/build/' + dir + '/' + file});
        }
    }
}
//funcObj.file.replace('.js','').replace(/.*(?:\/)(\w*$)/,'$1')
fs.writeFileSync('./imports.ts',functionsFiles.map(funcObj=>`export {Handler as ${funcObj.functionName}} from '${funcObj.file.replace('.js','')}';`).join('\n'));

// import * as imports from './imports';
// console.log(imports);


// const template = parse(fs.readFileSync('template.yaml','utf-8'), {logLevel:'silent'});
// const swagger = parse(fs.readFileSync('swagger.yaml','utf-8'), {logLevel:'silent'});
// const functions = Object.keys(template.Resources).filter(name=>name.includes('Function'));
// const app = express();
// const PORT = 3000;
// const router = express.Router();


// const paths = swagger.paths
// let promises =[];
// for(const path of Object.keys(paths)){
//     const methods = paths[path];
//     //console.log(path, Object.keys(methods));
//     for(const method of Object.keys(methods)){
//         const operationId = methods[method].operationId;
//         const found = functions.find(func=>func.toLowerCase() === operationId.toLowerCase() + 'function');
//         if(!found) continue;
//         const folder = template.Resources[found].Properties.CodeUri;
//         const file = template.Resources[found].Properties.Handler;
//         console.log(folder + '/' + file);
//         if(method === 'get'|| method === 'post' || method === 'put'|| method === 'delete'){
//             promises = [...promises, import(folder + '/' + file.replace('.Handler','')).then(handler=>{
//                 console.log(handler);
//                 router[method](path,async (request, response) => {
//                     response.send(await handler(request));
//                 })
//             })]
//         }
        
//     }
// }
// Promise.all(promises).then(()=>{
//     router.get('/', (request, response) => {
//         response.send(router.all)
//     })
//     app.use(router.route);
//     console.log(`Server running at http://localhost:${PORT}`);
//     app.listen({ port: PORT }); 
// })
