import {readFileSync,writeFileSync} from 'fs';
import {parse} from 'yaml'
const template = readFileSync('template.yaml','utf-8');
const parsed = parse(template, {logLevel:'silent'});

const functionsNames = Object.keys(parsed.Resources).filter(name=>name.includes('Function'))
const data = functionsNames.reduce((json,lambda)=>{
    if(!json.hasOwnProperty(lambda)){
        json[lambda] = {
            // "HOST": "piatti.cz6s6su6miey.us-east-1.rds.amazonaws.com",
            // "USER": "admin",
            // "PASS": "4Lf59De2b2!U84N",
            // "DB": "piatti",
            // "DEBUG": "true"
            HOST : '127.0.0.1',
            USER : 'root',
            PASS : '1234',
            DB   : 'piatti',
            PORT : '3307',
        }
    }
    return json;
},{})

writeFileSync('./scripts/env_vars.json',JSON.stringify(data));
