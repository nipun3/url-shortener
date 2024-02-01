FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json tsconfig.json .

COPY ./apps/api-gateway/src .

COPY ./apps/url/src/proto/url.proto ./url/proto/

COPY ./libs ./libs

RUN yarn install

CMD [ "yarn", "start" ]