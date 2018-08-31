const express = require('express');
const bodyParser = require('body-parser');
const { config } = require('./config');
const { createSession } = require('./createSession');
const { createDatabaseClient } = require('./createDatabaseClient');
const { createRouter } = require('./createRouter');

const createApp = async () => {
  const app = express();
  const client = await createDatabaseClient();

  if (config.production) {
    // cf. https://github.com/expressjs/session/tree/v1.15.6#cookiesecure
    app.set('trust proxy', 1);
  }

  app.use((req, res, next) => {
    req.client = client;
    next();
  });

  app.use(bodyParser.json());

  app.use(createSession());

  app.use(createRouter());

  app.use(async (error, req, res, next) => {
    if (!error) {
      next(error);
      return;
    }

    console.error(error);
    if (client) {
      await client.end();
    }
    process.exit(1);
  });

  app.listen(config.port, () =>
    console.log(`Example app listening on port ${config.port}!`)
  );
};

createApp()
  .then(console.log)
  .catch(console.error);
