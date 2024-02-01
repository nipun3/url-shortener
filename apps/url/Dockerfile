FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock tsconfig.json .

COPY ./apps/url/src .

COPY ./apps/url/src/proto/url.proto ./dist/proto/

COPY ./libs ./libs

COPY ./prisma ./prisma

RUN yarn install

CMD [ "yarn", "start" ]