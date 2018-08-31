const config = {
  port: process.env.PORT || 3000,
  name: process.env.MY_NAME || 'unknown',
  production: process.env.NODE_ENV === 'production',
  database: {
    url: process.env.DATABASE_URL
  },
  session: {
    secret: process.env.SESSION_SECRET,
    redis: {
      url: process.env.REDIS_URL
    }
  }
};

module.exports = { config };
