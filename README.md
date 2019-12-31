This is a proof-of-concept project I am attempting to get working. Any tips whatsoever are welcome. Please feel free to fork and show me how to fix my mistakes!

I have had numberous issues trying to get this working inside lambda.

Key concepts/learnings:
- Run the npm install inside of the lambdaci/lambda docker container to replicate lambda environment and load proper binaries
- babel and wdio are touchy when the lambda runs, still get errors there
- Having the appropriate chromedriver flags is very important
- ...

Commands:

Run wdio
```
./node_modules/.bin/wdio ./configs/wdio.conf.js --spec ./test/**/e2e/specs/**/*.js
```

Run serverless offline
```
./node_modules/.bin/serverless offline
```

NPM Install / Package inside lambdaci/lambda container
```
rm -rf node_modules
docker run -v $PWD:/var/task -w /var/task --entrypoint='sh' lambci/lambda:build-nodejs8.10 package.sh
rm -rf ~/Desktop/sls_tmp
cp -R .serverless/* ~/Desktop/sls_tmp/
serverless deploy --package ~/Desktop/sls_tmp --force --aws-s3-accelerate
```

Lots of time has been spent making small changes. Everything works locally on my macbook.