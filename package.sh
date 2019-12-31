npm i npm@latest -g
npm cache clean --force
rm -rf ./package-lock.json
npm i -D
./node_modules/serverless/bin/serverless package
# npm install -g node-gyp
# node ./node_modules/fibers_node_v8/build