import {readFileSync,writeFileSync} from 'fs';
import {parse} from 'yaml'
const template = readFileSync('template.yaml','utf-8');
const parsed = parse(template, {logLevel:'silent'});

const functionsNames = Object.keys(parsed.Resources).filter(name=>name.includes('Function'))
const data = functionsNames.reduce((json,lambda)=>{
    if(!json.hasOwnProperty(lambda)){
        json[lambda] = {
            "HOST": "192.168.1.32",
            "USER": "root",
            "PASS": "1234",
            "DB":"piatti",
            "DEBUG": "true"
        }
    }
    return json;
},{})

writeFileSync('./scripts/env_vars.json',JSON.stringify(data));
