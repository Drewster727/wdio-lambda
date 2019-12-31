import shell from 'shelljs'

export const exec = (script) => {
    console.log(`Run script "${script}"`);
    return new Promise((resolve, reject) => {
        const child = shell.exec(script, { async: true, silent: false });
        child.stdout.on('data', (stdout) => {
            const trimmedStdout = stdout.trim().replace(/^Serverless: /, '');
            /**
             * in case stdout is starting with `{` we assume it
             * is the resulrt of serverless.run therefor return
             * json
             */
            if (trimmedStdout.startsWith('{')) {
                return resolve(JSON.parse(trimmedStdout));
            }
            console.log(trimmedStdout);
        });
        // child.stderr.on('data', ::log.error)
        child.on('close', (code) => {
            /**
             * ...otherwise resolve with status code
             */
            if (code === 0) {
                return resolve(code);
            }

            reject(new Error(`script failed with exit code ${code}`));
        });
    });
};