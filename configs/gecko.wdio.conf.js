const { TimelineService } = require('wdio-timeline-reporter/timeline-service');

var baseConf = require('./wdio.conf.js');
var conf = baseConf.config;
conf.capabilities = [
{
    maxInstances: 5,
    browserName: 'firefox',
    'moz:firefoxOptions': {
        // args: ['-headless']
    },
    acceptInsecureCerts : true,
    // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
    excludeDriverLogs: ['bugreport', 'server'],
}]
conf.services = ['geckodriver', [TimelineService]]
exports.config = conf
