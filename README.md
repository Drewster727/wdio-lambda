This is a proof-of-concept project I am attempting to get working. Any tips whatsoever are welcome. Please feel free to fork and show me how to fix my mistakes!

I have had numberous issues trying to get this working inside lambda.

Key concepts/learnings:
- Run the npm install inside of the lambdaci/lambda docker container to replicate lambda environment and load proper binaries
- babel and wdio are touchy when the lambda runs, still get errors there
- Having the appropriate chromedriver flags is very important
- ...

Lots of time has been spent making small changes. Everything works locally on my macbook.