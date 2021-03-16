FROM node:fermium-alpine3.12

ARG NODE_ENV

WORKDIR /usr/src/app/

COPY package.json yarn.lock ./

RUN yarn

COPY . .

CMD yarn docker:start
