FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json tsconfig.json .

COPY ./apps/url/src .

COPY ./apps/url/src/proto/url.proto ./dist/proto/

COPY ./libs ./libs

RUN yarn install


EXPOSE 5000

CMD [ "yarn", "start" ]