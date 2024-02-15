// @ts-check

import express from "express";
import fs from 'fs';
import {parse} from 'yaml'
const template = parse(fs.readFileSync('template.yaml','utf-8'), {logLevel:'silent'});
const swagger = parse(fs.readFileSync('swagger.yaml','utf-8'), {logLevel:'silent'});
const functions = Object.keys(template.Resources).filter(name=>name.includes('Function'));

const app = express();
const PORT = 3000;
const router = express.Router();


const paths = swagger.paths
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
        const handler = await import(folder + '/' + file.replace('Handler','ts'));
        console.log(handler);
        if(method === 'get'|| method === 'post' || method === 'put'|| method === 'delete'){
            router[method](path,async (request:any, response:any) => {
                response.send(await handler(request));
            })
        }
        
    }
}

router.get('/', (request:any, response:any) => {
    response.send(router.all)
})

app.use(router.route);

console.log(`Server running at http://localhost:${PORT}`);
app.listen({ port: PORT });
