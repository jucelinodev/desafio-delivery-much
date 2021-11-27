import 'express-async-errors';
import dotenv from 'dotenv';
import { app } from './app';

dotenv.config();

const { APP_HOST, APP_PORT } = process.env;

app.listen(APP_PORT, () =>
  console.log(`Server running in http://${APP_HOST}:${APP_PORT}`),
);
