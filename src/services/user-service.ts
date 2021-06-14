import createError from 'http-errors';
import { Op } from 'sequelize';
import logger from '../logger';
import { User } from '../dao/sequelize';
import { searchMapper } from '../helpers';
import {
  UserInstance, UserCreationAttributes, SearchUsersResponse,
} from '../types';

function log(message: string, methodName?: string): void {
  logger.info(`[UserService] - [${methodName || ' '}] - ${message}`);
}

export function getById(id: string): Promise<UserInstance> {
  log(`id: ${id}`, 'getById');

  return User.findByPk(id)
    .then((user) => {
      if (!user) {
        throw createError(404, `User with id: ${id} not found`);
      }

      return user;
    });
}

export function create(newUser: UserCreationAttributes): Promise<UserInstance> {
  log(`login: ${newUser.login}, password: ${newUser.password}, age: ${newUser.age}`, 'create');

  return User.create(newUser)
    .then((user) => {
      log(`user ${user.login} created, id: ${user.id}, 'create`);

      return user;
    });
}

export function update(id: string, newUserData: UserCreationAttributes): Promise<UserInstance> {
  log(`id: ${id}, login: ${newUserData.login}, password: ${newUserData.password}, age: ${newUserData.age}`, 'update');

  return getById(id)
    .then((user) => {
      if (!user) {
        throw createError(404, `User with id: ${id} not found`);
      }

      user.set(newUserData);

      return user.save();
    })
    .then((user) => {
      log(`user ${user.login} with id ${user.id} was updated`, 'update');

      return user;
    });
}

export function deleteUser(id: string): Promise<UserInstance> {
  log(`id: ${id}`, 'delete');

  return getById(id)
    .then((user) => {
      if (!user || user.isDeleted) {
        throw createError(404, `User with id: ${id} not found`);
      }

      user.set('isDeleted', true);

      return user.save();
    })
    .then((user) => {
      log(`user ${user.login} with id ${user.id} was soft deleted`, 'delete');
      return user;
    });
}

export function search(searchTerm: string, limit: number = 10): Promise<SearchUsersResponse> {
  log(`searchTerm: ${searchTerm}, limit: ${limit}`, 'search');

  return User.findAndCountAll({
    limit,
    where: {
      login: {
        [Op.iLike]: `%${searchTerm}%`,
      },
    },
  })
    .then(({ rows, count }) => ({
      total: count,
      users: rows,
    }));
}

export function getAll(): Promise<SearchUsersResponse> {
  log(' ', 'getAll');

  return User.findAndCountAll()
    .then(searchMapper);
}

export function loginUser({
  login,
  password,
}: { login: string, password: string }): Promise<UserInstance> {
  log(`login: ${login}, password: ${password}`, 'login');

  return User.findOne({ where: { login, password } })
    .then((user) => {
      if (!user) {
        throw createError(401, 'Wrong username/password');
      }
      return user;
    });
}
