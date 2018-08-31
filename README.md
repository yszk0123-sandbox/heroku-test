# heroku-test

# Requirement

- Docker
- Node.js
- Yarn

# Development

## Local

```sh
$ docker-compose up -d
$ yarn install
$ yarn start
$ yarn post-sample-data
```

## Local (Heroku)

```sh
$ cp env.sample .env
$ docker-compose up -d
$ yarn install
$ yarn build
$ heroku local web
```

# Deploy

```sh
$ heroku git:remote -a YOUR_APP_NAME
$ heroku addons:create heroku-postgresql
$ heroku addons:create heroku-redis
$ heroku config:set REDIS_SECRET=YOUR_REDIS_SECRET
$ git push heroku master
$ heroku open
```
