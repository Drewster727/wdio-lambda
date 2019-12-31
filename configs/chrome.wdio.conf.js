const { TimelineService } = require('wdio-timeline-reporter/timeline-service');

var baseConf = require('./wdio.conf.js');
var conf = baseConf.config;
conf.capabilities = [
    {
        maxInstances: 5,
        browserName: 'chrome',
    }],
conf.services = ['chromedriver', [TimelineService]]
exports.config = conf