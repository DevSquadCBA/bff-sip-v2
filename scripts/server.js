// @ts-check
const {execSync} = require('child_process');
const fs = require('fs');
const {parse} = require('yaml');
const express= require('express');
const cors = require('cors');

process.env.HOST = "192.168.1.32";
process.env.USER = "root";
process.env.PASS = "1234";
process.env.DB = "piatti";

execSync("sam build -c -p");

const functionsFiles =[];
const folders = fs.readdirSync('./.aws-sam/build/').filter(e=>e!=='template.yaml');
for(const dir of folders){
    const files = fs.readdirSync('./.aws-sam/build/' + dir);
    for(const file of files){
        if(file.endsWith('.js')){
            functionsFiles.push({functionName: dir, file:'../.aws-sam/build/' + dir + '/' + file});
        }
    }
}

const functionImport = functionsFiles.map(funcObj=>`const {Handler:${funcObj.functionName}} = require('${funcObj.file}');`).join('\n');
const exportObject = '\nmodule.exports={\n' + functionsFiles.map(funcObj=>`    ${funcObj.functionName},`).join('\n') + '\n}';
fs.writeFileSync('./scripts/imports.js',functionImport + exportObject);

const imports = require('./imports.js');
const template = parse(fs.readFileSync('template.yaml','utf-8'), {logLevel:'silent'});
const swagger = parse(fs.readFileSync('swagger.yaml','utf-8'), {logLevel:'silent'});
const functions = Object.keys(template.Resources).filter(name=>name.includes('Function'));
const app = express();
app.use(cors());
const router = express.Router();
const _ = require('@colors/colors'); 
const expressToLambda = (req) => {
    return{
        body: req.body,
        headers: req.headers,
        multiValueHeaders: req.headers,
        httpMethod: req.method,
        isBase64Encoded: false,
        queryStringParameters: req.query,
        multiValueQueryStringParameters: req.query,
        pathParameters: req.params,
        stageVariables: null,
        path: req.path,
        resource: req.path
    }
}

const completePath = [];

router.use(async(ctx,next)=>{
    console.log(`recibo [${ctx.method}] ${ctx.url.toString()}`.blue);
    // @ts-ignore
    ctx?.next();
});
const paths = swagger.paths;
for(const path of Object.keys(paths)){
    const methods = paths[path];
    for(const method of Object.keys(methods)){
        const operationId = methods[method].operationId;
        const found = functions.find(func=>func.toLowerCase() === operationId.toLowerCase() + 'function');
        if(!found) continue;
        const handler = imports[found];
        if(!['get','post','put','delete'].includes(method.toLocaleLowerCase())) continue;
        const translatedPath = path.replace(/{([^}]+)}/g, ':$1');
        completePath.push({method,path});
        router[method](translatedPath,async (request, response) => {
            const requestLambda = expressToLambda(request);
            const responseLambda = await handler(requestLambda)
            response.setHeader('Content-Type', 'application/json');
            response.send(responseLambda.body);
        });
    }
}

router.use(cors());;
const methodWithColor = (method)=>{
    if(method === 'get'){
        return `GET`.green;
    }else if(method === 'post'){
        return 'POST'.blue;
    }else if(method === 'put'){
        return 'PUT'.yellow;
    }else if(method === 'delete'){
        return 'DELETE'.magenta;
    }
}

const PORT = 5000;

app.use('/',router);
console.log(`Server running at ` + `http://localhost:${PORT}`.blue);
completePath.map(e=>console.log(`[`.white + `${methodWithColor(e.method)}] http://localhost:${PORT}`.blue +`${e.path.blue}`));
app.listen({ port: PORT }); 