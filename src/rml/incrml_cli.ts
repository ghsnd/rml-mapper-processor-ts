import { SimpleStream } from "@ajuvercr/js-runner";
import fs from "fs";
import yargs from "yargs";
import {IncRMLConfig, rml2incrml} from "./incrml";

// Arguments: an incrml config and an mapping file
const args = yargs(process.argv.slice(2))
    .options({
        'config':      {type: 'string', demandOption: true, alias: 'c'},
        'rml-mapping': {type: 'string', demandOption: true, alias: 'm'}
    }).parse();


// Read config & mapping
const configStr = JSON.parse(fs.readFileSync(args['c'], 'utf-8'));
const config = configStr as IncRMLConfig;
const mapping = fs.readFileSync(args['m'], 'utf-8');

const rmlStream = new SimpleStream<string>();
const incrmlStream = new SimpleStream<string>();

// Write output to console
incrmlStream.data(data => {
    console.log(data);
});

await rml2incrml(rmlStream, config, incrmlStream);

// push mapping
await rmlStream.push(mapping);