FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json tsconfig.json .

COPY ./apps/shortening-service/src .

COPY ./apps/shortening-service/src/proto/shortening-service.proto ./dist/proto/

COPY ./libs ./libs

RUN yarn install

# RUN yarn build

EXPOSE 5000

CMD [ "yarn", "start" ]