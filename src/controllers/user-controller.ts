import { Request, Response, RequestHandler } from 'express';
import { ValidatedRequest, ValidatedRequestWithRawInputsAndFields } from 'express-joi-validation';
import * as helpers from '../helpers/index';
import { User, UserPostRequestSchema, UsersGetRequestSchema } from '../types';

const users: User[] = [];

export const getUser:RequestHandler = (req, res) => {
  const user = users.find((u) => u.id === req.params.id);

  if (!user) {
    res.status(404).send(`User with id: ${req.params.id} not found`);
  }

  return res.json(user);
};

export const postUser:RequestHandler = (req: Request, res: Response) => {
  const vreq = req as ValidatedRequestWithRawInputsAndFields<UserPostRequestSchema>;
  const { login, password, age } = vreq.body;
  const user = helpers.createUser(login, password, age);
  users.push(user);

  return res.json(user);
};

export const deleteUser: RequestHandler = (req: Request, res: Response) => {
  const user = users.find((u) => u.id === req.params.id);

  if (!user) {
    return res.status(404).send(`User with id: ${req.params.id} not found`);
  }

  user.isDeleted = true;

  return res.sendStatus(200);
};

export const updateUser: RequestHandler = (req: Request, res: Response) => {
  const user = users.find((u) => u.id === req.params.id);

  if (!user) {
    return res.status(404).send(`User with id: ${req.params.id} not found`);
  }

  const vreq = req as ValidatedRequestWithRawInputsAndFields<UserPostRequestSchema>;
  const updatedUser = helpers.updateUser(user, vreq.body);
  const userIndex = users.findIndex((u) => u.id === req.params.id);
  users[userIndex] = updatedUser;

  return res.json(updatedUser);
};

export const searchUsers = (req: ValidatedRequest<UsersGetRequestSchema>, res: Response) => {
  const { q, limit = 10 } = req.query;

  const filteredUsers = helpers.getAutoSuggestUsers(users, q, limit);

  return res.json(filteredUsers);
};
