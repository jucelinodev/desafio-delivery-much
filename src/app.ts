import express from 'express';
import { GlobalHandleError } from './errors/GlobalHandleError';

const app = express();
const globalHandleError = new GlobalHandleError();

app.use(express.json());
app.use(globalHandleError.handle);

export { app };
