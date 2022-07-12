FROM node:fermium-alpine3.14

ARG NODE_ENV

WORKDIR /usr/src/app/

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

CMD yarn docker:start
