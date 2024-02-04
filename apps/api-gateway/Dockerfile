FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock tsconfig.json .

RUN yarn install

COPY ./apps/api-gateway/src .
COPY ./apps/url/src/proto/url.proto ./url/proto/
COPY ./libs ./libs

CMD [ "yarn", "start" ]