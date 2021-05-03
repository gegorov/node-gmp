import { Request, Response, RequestHandler } from 'express';
import { ValidatedRequest, ValidatedRequestWithRawInputsAndFields } from 'express-joi-validation';
import { User } from '../models/user';
import { UserPostRequestSchema, UsersGetRequestSchema } from '../types';
import { UserService } from '../services/user-service';

const userService = new UserService(User);

export const getUser:RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.getById(id);

    if (!user) {
      return res.status(404).send(`User with id: ${id} not found`);
    }

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const postUser:RequestHandler = async (req: Request, res: Response) => {
  const vreq = req as ValidatedRequestWithRawInputsAndFields<UserPostRequestSchema>;
  const { login, password, age } = vreq.body;

  try {
    const user = await userService.create({ login, password, age });

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const updateUser: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const vreq = req as ValidatedRequestWithRawInputsAndFields<UserPostRequestSchema>;
    const updatedUser = await userService.update(id, vreq.body);

    if (!updatedUser) {
      return res.status(404).send(`User with id: ${id} not found`);
    }

    return res.json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const deleteUser: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await userService.delete(id);

    if (!user) {
      return res.status(404).send(`User with id: ${id} not found or it is already deleted`);
    }

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const searchUsers = async (req: ValidatedRequest<UsersGetRequestSchema>, res: Response) => {
  const { q, limit } = req.query;

  try {
    const result = await userService.search(q, limit);

    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAll();

    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};
