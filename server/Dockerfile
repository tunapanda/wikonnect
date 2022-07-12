FROM node:fermium-alpine3.14
RUN apk add g++ make py3-pip

ARG NODE_ENV='production'
ARG SERVER_PORT=3000

WORKDIR /usr/src/app/


#On development environment, install nodemon for free livereload on changes
RUN if [ "$NODE_ENV" = "development" ]; then yarn global add nodemon ;fi

COPY package.json yarn.lock ./

#Copy postinstall script
COPY ./scripts/h5p-core-setup.js scripts/h5p-core-setup.js



RUN yarn --frozen-lockfile

COPY . .

HEALTHCHECK --interval=10s --timeout=13s --start-period=30s\
    CMD node scripts/healthcheck.js


CMD if [ "$NODE_ENV" = "production" ]; then yarn db:init && yarn start;\
    elif  [ "$NODE_ENV" = "testing" ]; then yarn db:init && yarn db:seed && yarn start;\
    else yarn db:init && yarn db:seed && yarn start:dev; fi
