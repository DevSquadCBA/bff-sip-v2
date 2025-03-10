import {readFileSync,writeFileSync} from 'fs';
import {parse} from 'yaml'
const template = readFileSync('template.yaml','utf-8');
const parsed = parse(template, {logLevel:'silent'});

const functionsNames = Object.keys(parsed.Resources).filter(name=>name.includes('Function'))
const data = functionsNames.reduce((json,lambda)=>{
    if(!json.hasOwnProperty(lambda)){
        json[lambda] = {
            HOST : '127.0.0.1',
            USER : 'root',
            PASS : '1234',
            DB   : 'piatti',
            PORT : '3307',
            JWT  : 'AstroDev'
        }
    }
    return json;
},{})

writeFileSync('./scripts/env_vars.json',JSON.stringify(data));
