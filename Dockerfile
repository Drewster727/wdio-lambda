# FROM ubuntu:18.04

# # Install machine dependencies
# RUN apt update \
#   && apt install -y unzip curl wget git make build-essential g++ openjdk-8-jdk \
#   && curl -sL https://deb.nodesource.com/setup_8.x | bash - \
#   && apt update \
#   && apt-get install -y nodejs \
#   && echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | tee /etc/apt/sources.list.d/google-chrome.list \
#   && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
#   && apt update \
#   && apt install -y google-chrome-stable firefox

# # Working directory
# RUN mkdir -p /workdir/output
# WORKDIR /workdir

# # Install dependencies if any change
# COPY package.json package-lock.json ./
# RUN npm install

# # Copy tests
# COPY . ./

# # Execute tests
# ENTRYPOINT ["npm", "test"]

# FROM mhart/alpine-node:8.10
# ENV PS1 "\u@\h:\w\\$ " 
# RUN apk update && \
#   apk upgrade && \
#   apk add --no-cache --update bash py-pip ca-certificates && \
#   update-ca-certificates && \
#   rm -rf /var/cache/apk/* && \
#   pip install --upgrade pip && \
#   pip install --no-cache-dir awscli && \
#   npm install -g npm && \
#   npm cache clean --force

# RUN mkdir -p /app
# WORKDIR /app

# COPY . .
# RUN npm i

FROM ubuntu:latest

ENV LC_ALL=C
ENV DEBIAN_FRONTEND=noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN=true

RUN groupadd --gid 1000 node \
  && useradd --uid 1000 --gid node --shell /bin/bash --create-home node


RUN apt-get -qqy update
RUN apt-get -qqy install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
RUN curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list
RUN echo "deb http://archive.ubuntu.com/ubuntu xenial main universe\n" > /etc/apt/sources.list \
  && echo "deb http://archive.ubuntu.com/ubuntu xenial-updates main universe\n" >> /etc/apt/sources.list \
  && echo "deb http://security.ubuntu.com/ubuntu xenial-security main universe\n" >> /etc/apt/sources.list
RUN apt-get -qqy update

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get -qqy --no-install-recommends install \
  nodejs \
  firefox \
  google-chrome-stable \
  openjdk-8-jre-headless \
  x11vnc \
  xvfb \
  xfonts-100dpi \
  xfonts-75dpi \
  xfonts-scalable \
  xfonts-cyrillic


RUN export DISPLAY=:99.0
RUN Xvfb :99 -shmem -screen 0 1366x768x16 &

WORKDIR /home/node
ADD . .
RUN chown node:node -R .
RUN chmod 777 -R .

RUN google-chrome --version
RUN firefox --version
RUN node --version
RUN npm --version

USER node
RUN npm install

ENTRYPOINT ["/home/node/node_modules/.bin/wdio", "./configs/wdio.conf.js", "--spec", "./test/brandgeek/e2e/specs/**/cfa*.js"]