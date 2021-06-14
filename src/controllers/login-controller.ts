import {
  Request, Response, NextFunction,
} from 'express';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import { ValidatedRequestWithRawInputsAndFields } from 'express-joi-validation';
import logger from '../logger';
import { LoginPostRequestSchema } from '../types';
import * as userService from '../services/user-service';

const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRE || 30;

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const vreq = req as ValidatedRequestWithRawInputsAndFields<LoginPostRequestSchema>;
  const { login, password } = vreq.body;

  try {
    const user = await userService.loginUser({ login, password });
    if (!secret) {
      throw createError(500, 'Internal Server Error');
    }
    const token = jwt.sign(
      { user: user.login },
      secret,
      {
        algorithm: 'HS256',
        expiresIn,
      },
    );

    res.json({ token });
  } catch (error) {
    logger.error(`Error in Login Controller, method authenticate, user: {${login}, ${password}}. ${error.message}`);
    next(error);
  }
};
