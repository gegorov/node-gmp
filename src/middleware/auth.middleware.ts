import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';

const secret = process.env.JWT_SECRET;

export function auth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!secret) {
    throw Error('No secret for authorization');
  }

  const authHeader = req.headers.authorization;

  if (authHeader) {
    jwt.verify(authHeader.split(' ')[1], secret, (err) => {
      if (err) {
        throw createError(403, err.message);
      }
      next();
    });
  } else {
    throw createError(401, 'Unauthorized');
  }
}
