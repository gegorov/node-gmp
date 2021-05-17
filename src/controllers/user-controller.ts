import {
  Request, Response, RequestHandler, NextFunction,
} from 'express';
import { ValidatedRequest, ValidatedRequestWithRawInputsAndFields } from 'express-joi-validation';
import { User } from '../dao/sequelize';
import logger from '../logger';
import { UserPostRequestSchema, UsersGetRequestSchema } from '../types';
import { UserService } from '../services/user-service';

const userService = new UserService(User, logger);

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const user = await userService.getById(id);
    res.json(user);
  } catch (error) {
    logger.error(`Error in User Controller, method getUser, id: ${id}. ${error.message}`);
    next(error);
  }
};

export const postUser:RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const vreq = req as ValidatedRequestWithRawInputsAndFields<UserPostRequestSchema>;
  const { login, password, age } = vreq.body;

  try {
    const user = await userService.create({ login, password, age });
    res.json(user);
  } catch (error) {
    logger.error(`Error in User Controller, method postUser, user: {${login}, ${password}, ${age}}. ${error.message}`);
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const vreq = req as ValidatedRequestWithRawInputsAndFields<UserPostRequestSchema>;
    const updatedUser = await userService.update(id, vreq.body);
    res.json(updatedUser);
  } catch (error) {
    const { login, password, age } = req.body;
    logger.error(`Error in User Controller, method updateUser, user: {${id},${login}, ${password}, ${age}}. ${error.message}`);
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const user = await userService.delete(id);
    res.json(user);
  } catch (error) {
    logger.error(`Error in User Controller, method deleteUser, user id: ${id}. ${error.message}`);
    next(error);
  }
};

export const searchUsers = async (
  req: ValidatedRequest<UsersGetRequestSchema>,
  res: Response,
  next: NextFunction,
) => {
  const { q, limit } = req.query;

  try {
    const result = await userService.search(q, limit);
    res.json(result);
  } catch (error) {
    logger.error(`Error in User Controller, method searchUsers, searchQuery ${q}, limit: ${limit}. ${error.message}`);
    next(error);
  }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.getAll();
    res.json(result);
  } catch (error) {
    logger.error('Error in User Controller, method getAllUsers');
    next(error);
  }
};
