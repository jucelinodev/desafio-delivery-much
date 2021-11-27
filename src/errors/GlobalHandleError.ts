import { Response, Request, NextFunction } from 'express';
import { CustomError } from './CustomError';

export class GlobalHandleError {
  handle(
    err: Error,
    request: Request,
    response: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: NextFunction,
  ): Response {
    if (err instanceof CustomError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: err.message || 'Internal server error',
    });
  }
}
