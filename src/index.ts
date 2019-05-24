#!/usr/bin/env node
import program from 'commander'
import Fuse from 'fuse.js'
import { format } from "date-fns";
import ora from 'ora'

import { foursquareService } from './services'
import { CheckinModel } from './models';


let token = '';
let searchString = '';
const spinner = ora('Searching API')

program
    .version('0.0.1')
    .description('Find what you eat by using foursquare API 🌮')
    .arguments('<token> <searchString>')
    .action((tokenValue, searchStringValue) => {
        token = tokenValue;
        searchString = searchStringValue;
    })
    .parse(process.argv)

if (!token || !searchString) {
    console.error('missing token or searchString')
    process.exit(1)
}

const getResult = async () => {
    spinner.start();
    const result = await foursquareService.getCheckins(token);
    const options: Fuse.FuseOptions<CheckinModel> = {
        keys: ['shout'],
    };
    const fuse = new Fuse(result, options)
    const fuzzySearchResults = fuse.search(searchString)
    spinner.stop()
    if (fuzzySearchResults) {
        const lastCheckin = fuzzySearchResults[0]
        console.log(`Last time you eat ${searchString} was ${format(new Date(lastCheckin.createdAt * 1000), 'DD/MM/YYYY')} at ${lastCheckin.venue.name}`)
    } else {
        console.log('Sorry cannot find anything')
    }
}

getResult();
