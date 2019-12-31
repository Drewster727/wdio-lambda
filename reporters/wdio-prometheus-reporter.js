import WDIOReporter from '@wdio/reporter';
// WDIOReporter.reporterName = 'PrometheusReporter';

export default class PrometheusReporter extends WDIOReporter {
    constructor (options) {
        /**
         * make reporter to write to output stream by default
         */
        options = Object.assign(options, { stdout: true });
        super(options);
    }

    onRunnerStart (test) {
        console.log('-----prometheus!----')
        // this.write(`Congratulations! Your test "${test.title}" passed`);
    }
};