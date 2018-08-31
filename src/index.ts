import bodyParser from 'body-parser';
import express from 'express';
import { config } from './config';
import { createDatabaseClient } from './createDatabaseClient';
import { createRouter } from './createRouter';
import { createSession } from './createSession';

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

  app.use(async (error: any, req: any, res: any, next: any) => {
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
