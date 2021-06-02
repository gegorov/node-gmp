import { Response, Request, NextFunction } from 'express';
import { HttpError } from 'http-errors';
import logger from '../logger';

export function errorHandlerMiddleware(
  err: HttpError | Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof HttpError && err.statusCode === 400) {
    logger.error(`ERROR 400 message: ${err.message}`);

    return res.status(err.statusCode).json(err.message);
  }

  if (err instanceof HttpError && err.statusCode === 401) {
    logger.error(`ERROR 401 message: ${err.message}`);

    return res.status(err.statusCode).json('Unauthorized');
  }

  if (err instanceof HttpError && err.statusCode === 403) {
    logger.error(`ERROR 403 message: ${err.message}`);

    return res.status(err.statusCode).json('Forbidden');
  }

  if (err instanceof HttpError && err.statusCode === 404) {
    logger.error(`ERROR 400 message: ${err.message}`);

    return res.status(err.statusCode).json(err.message);
  }
  logger.error(`ERROR 500, message: ${err.message || 'Internal Server Error'}`);

  return res.status(500).json('Internal Server Error');
}
