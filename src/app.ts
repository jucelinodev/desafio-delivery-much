import express from 'express';
import { GlobalHandleError } from './errors/GlobalHandleError';
import { router } from './routes';

const app = express();

const globalHandleError = new GlobalHandleError();

app.use(express.json());
app.use('/', router);
app.use(globalHandleError.handle);

export { app };
