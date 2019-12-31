const { TimelineService } = require('wdio-timeline-reporter/timeline-service');
// const puppeteer = require('puppeteer');
const fsExtra = require('fs-extra')

exports.config = {
    runner: 'local',
    port: 4444,
    path: '/',
    specs: [
        './test/brandgeek/e2e/specs/**/*.js',
        './test/v5/e2e/specs/**/*.js'
    ],
    exclude: [],
    maxInstances: 1,
    capabilities: [
        {
        maxInstances: 5,
        browserName: 'chrome',
        chromeOptions: {
            // binary: puppeteer.executablePath(),
            // binary: './headless-chromium',
            args: [
                '--headless'
                ,'--port=4444'
                ,'--no-sandbox'
                ,'--disable-gpu'
                ,'--disable-logging'
                ,'--disable-plugins'
                ,'--disable-extensions'
                ,'--disable-dev-shm-usage'
                ,'--hide-scrollbars'
                ,'--homedir=/tmp/chrome'
                ,'--disk-cache-dir=/tmp/chrome/cache-dir'
                ,'--remote-debugging-port=9222'
                ,'--window-size=1680,2400'
                ,'verbose'
                ,'log-path=./tmp/chromedriver.log'
            ],
        },
    }],
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'debug',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: ['chromedriver', [TimelineService]],
    chromeDriverLogs: '/tmp/chromedriver',
    framework: 'mocha',
    reporters: [
        // 'dot'
        'spec'
        ,['mochawesome',{
            outputDir: '/tmp/output/mochawesome',
            outputFileFormat: function(opts) { 
                return `results-${opts.cid}.json`
            }
        }]
        ,['json',{
            outputDir: '/tmp/output/json',
            outputFileFormat: function(opts) { 
                return `results-${opts.cid}.json`
            }
        }]
        ,['timeline', { 
            outputDir: '/tmp/output/timeline', 
            fileName: 'report.html', 
            embedImages: true, 
            images: { 
                quality:40, 
                resize: true, 
                reductionRatio: 2 
            } 
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        // compilers: ['js:@babel/register'],
        require: ['@babel/register'],
        timeout: 60000,
    },
    mochawesomeOpts: {
        includeScreenshots:false,
        screenshotUseRelativePath:false
    },
    onPrepare: function (config, capabilities) {
        // fsExtra.emptyDirSync('./output');
        // fsExtra.emptyDirSync('/tmp/output');
        fsExtra.ensureDirSync('/tmp/output/steps');
        fsExtra.ensureDirSync('/tmp/output/timeline');
        fsExtra.ensureDirSync('/tmp/output/mochawesome');
        fsExtra.ensureDirSync('/tmp/output/json');
    },
    before() {
        require('@babel/register');
        browser.setWindowSize(1680, 2400);
        browser.setTimeout({ 'pageLoad': 30000 });
    },
    onComplete: function (exitCode, config, capabilities, results) {
        console.log("complete");
    },
}
