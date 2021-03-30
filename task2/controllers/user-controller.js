import User from '../models/user-model';
import { getAutoSuggestUsers } from '../helpers/index';

const users = [];

export const getUser = (req, res) => {
  const user = users.find((u) => u.id === req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  return res.json(user);
};

export const postUser = (req, res) => {
  const { login, password, age } = req.body;
  const user = new User(login, password, age);
  users.push(user);

  return res.json(user);
};

export const deleteUser = (req, res) => {
  const user = users.find((u) => u.id === req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  user.delete();

  return res.sendStatus(200);
};

export const updateUser = (req, res) => {
  const user = users.find((u) => u.id === req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  const { login, password, age } = req.body;
  user.update(login, password, age);

  return res.json(user);
};

export const searchUsers = (req, res) => {
  const { q, limit } = req.query;

  if (!q) {
    return res.sendStatus(400);
  }

  const filteredUsers = getAutoSuggestUsers(users, q, parseInt(limit, 10));

  return res.json(filteredUsers);
};
