FROM node:13.7.0-alpine

RUN apk add --no-cache curl-dev libzip-dev autoconf build-base gmp-dev coreutils python

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm i

EXPOSE 3333
