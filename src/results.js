import fs from 'fs';
import glob from 'glob';
import client from 'prom-client';
import AWS from 'aws-sdk';
import df from 'dateformat';

const s3 = new AWS.S3({
    accessKeyId: '', // process.env.AWS_ACCESS_KEY,
    secretAccessKey: '' //process.env.AWS_SECRET_ACCESS_KEY
  });

export const report = (project, test, region, archiveResults) => {
    // let gateway = new client.Pushgateway('http://ch-ops-prom01-p:9091');
    // gateway.pushAdd({ jobName: `synthetics`, groupings: { project: `${project}`, test:`${test}`, region: `${region}` } }, function(err,resp,body) {
    //     console.log(err);
    // });

    if (archiveResults)
        archive(project, test, region);
};

export const archive = (project, test, region) => {
    var globOpts = {
        realpath: false,
        nodir: true
    }

    glob("/tmp/output/**/*", globOpts, function (er, files) {

        var now = new Date();
        var path = `${project}/${test}/${df(now, 'isoDate')}/${region}/${df(now, "isoTime", true)}`

        files.forEach(file => {
            var x = 0;

            fs.readFile(file, (err, data) => {
                console.log(file);
                if (err) throw err;
                const params = {
                    Bucket: 'bucket-name-here',
                    Key: `${path}/${file}`,
                    Body: data
                };
                s3.upload(params, function(s3Err, data) {
                    if (s3Err) throw s3Err
                    console.log(`File uploaded successfully at ${data.Location}`)
                });
            });
        });
    });
}

