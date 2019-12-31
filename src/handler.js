import path from 'path';
import Launcher from '@wdio/cli';
import { reqs } from './requirements';
import { report } from './results';

export const runTest = async (event, context, callback) => {
    console.log('starting');

    var wdioConfPath = path.resolve('configs/wdio.conf.js');
    const wdio = new Launcher(`${wdioConfPath}`, {
        specs: ['./test/**/e2e/specs/**/*.js']
    });

    console.log(wdioConfPath);

    await wdio.run().then((code) => {
        console.log('wdio done');
        //process.exit(code);
    }, (error) => {
        console.error('Launcher failed to start the test', error.stacktrace);
        //process.exit(1);
    });

    // report(event.pathParameters.project, event.pathParameters.name, 'us-east-2', true);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Test Initiated Successfully" })
    };
};