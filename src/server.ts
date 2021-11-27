import 'express-async-errors';
import 'dotenv/config';

import { app } from './app';
import { mongooseConnection } from './database/connection';
import { stockConsume } from './amqp/stockConsume';

const { APP_HOST, APP_PORT } = process.env;

mongooseConnection.then(() => {
  app.listen(APP_PORT, () =>
    console.log(`--- Server running in http://${APP_HOST}:${APP_PORT} ---`),
  );
  stockConsume();
});
