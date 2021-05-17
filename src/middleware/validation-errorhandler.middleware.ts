import { NextFunction, Request, Response } from 'express';
import { ExpressJoiError } from 'express-joi-validation';
import createError from 'http-errors';
import logger from '../logger';

export function validationErrorhandler(
  err: ExpressJoiError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err.error?.isJoi) {
    logger.error(`400 , ${err.error.message}`);
    next(createError(400, err.error.message));
  } else {
    next(err);
  }
}
