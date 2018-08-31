import redis from 'connect-redis';
import session from 'express-session';
import { config } from './config';

const RedisStore = redis(session);

export const createSession = () => {
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
