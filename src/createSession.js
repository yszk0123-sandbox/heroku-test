const redis = require('connect-redis');
const session = require('express-session');
const { config } = require('./config');

const RedisStore = redis(session);

const createSession = () => {
  const store = new RedisStore({
    url: config.session.redis.url,
    prefix: 'sid:'
  });

  return session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: true,
    store,
    cookie: {
      maxAge: 3600 * 1000, // Expire in 1 hour
      secure: config.production
    }
  });
};

module.exports = { createSession };
