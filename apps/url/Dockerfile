FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock tsconfig.json .
COPY ./prisma ./prisma

RUN yarn install

COPY ./apps/url/src .
COPY ./apps/url/src/proto/url.proto ./dist/proto/
COPY ./libs ./libs

CMD [ "yarn", "start" ]