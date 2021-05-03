import { Request, Response, RequestHandler } from 'express';
import { Op } from 'sequelize';
import { ValidatedRequest, ValidatedRequestWithRawInputsAndFields } from 'express-joi-validation';
import { User } from '../models/user';
import { UserPostRequestSchema, UsersGetRequestSchema } from '../types';

export const getUser:RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

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
    const user = await User.create({ login, password, age });
    console.log(`user ${user.login} created, id: ${user.id}`);

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const deleteUser: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user || user.isDeleted) {
      return res.status(404).send(`User with id: ${id} not found`);
    }

    user.set('isDeleted', true);
    const updated = await user.save();

    return res.json(updated);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const updateUser: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const vreq = req as ValidatedRequestWithRawInputsAndFields<UserPostRequestSchema>;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send(`User with id: ${id} not found`);
    }

    user.set(vreq.body);
    const updatedUser = await user.save();

    return res.json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const searchUsers = async (req: ValidatedRequest<UsersGetRequestSchema>, res: Response) => {
  const { q, limit = 10 } = req.query;

  try {
    const result = await User.findAndCountAll({
      limit,
      where: {
        login: {
          [Op.iLike]: `%${q}%`,
        },
      },
    });

    return res.json({
      total: result.count,
      users: result.rows,
    });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};
