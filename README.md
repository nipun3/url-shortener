## Description

  

Backend for a url shortening service built on NestJS. Uses MongoDb as the database, Redis for caching & rate limiting, Prisma for ORM & gRPC for inter-microservice communication.

System Design Document can be found [here.](https://flashy-bugle-5a4.notion.site/URL-Shortening-Service-Backend-b9115b28f56f4508afff840dfa283264?pvs=4)

  

## Installation

Ensure `127.0.0.1  host.docker.internal` is added to your `etc/hosts` file

```bash

$  yarn  install

```

  

## Running the app

  

```bash
# runs mongo, redis, api-gateway & url services along with 
# nginx load balancers. Also, scales the services to 4 instances each
$ docker compose up --build --scale api-gateway=4 --scale url=4

# wait for all the images to build & the services to boot up

# pushes mongo db schema changes from .prisma file to the db server (needs be done once, the first time)
$ npx prisma db push
```


## Curl Requests

1. User Registration

```bash
curl --location 'http://localhost:8080/url-shortener/registerUser' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "John Doe",
    "email": "john.doe@gmail.com"
}'
```
2. Shorten Url
 ```bash
curl --location 'http://localhost:8080/url-shortener/shortenUrl' \
--header 'Content-Type: application/json' \
--data-raw '{
    "url": "https://www.reddit.com/",
    "apiKey": {received via /registerUser endpoint},
    "email": "john.doe@gmail.com"
}'
```
