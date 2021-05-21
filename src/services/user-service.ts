import createError from 'http-errors';
import { Op } from 'sequelize';
import { Logger } from 'winston';
import { searchMapper } from '../helpers';
import {
  UserInstance, UserCreationAttributes, SearchUsersResponse, UserStatic,
} from '../types';

export class UserService {
  constructor(private userModel: UserStatic, private logger: Logger) {
    this.userModel = userModel;
  }

  private log(message: string, methodName?: string): void {
    this.logger.info(`[UserService] - [${methodName || ' '}] - ${message}`);
  }

  public getById(id: string): Promise<UserInstance> {
    this.log(`id: ${id}`, 'getById');

    return this.userModel.findByPk(id)
      .then((user) => {
        if (!user) {
          throw createError(404, `User with id: ${id} not found`);
        }

        return user;
      });
  }

  public create(newUser: UserCreationAttributes): Promise<UserInstance> {
    this.log(`login: ${newUser.login}, password: ${newUser.password}, age: ${newUser.age}`, 'create');

    return this.userModel.create(newUser)
      .then((user) => {
        this.log(`user ${user.login} created, id: ${user.id}, 'create`);

        return user;
      });
  }

  public update(id: string, newUserData: UserCreationAttributes): Promise<UserInstance> {
    this.log(`id: ${id}, login: ${newUserData.login}, password: ${newUserData.password}, age: ${newUserData.age}`, 'update');

    return this.getById(id)
      .then((user) => {
        if (!user) {
          throw createError(404, `User with id: ${id} not found`);
        }

        user.set(newUserData);

        return user.save();
      })
      .then((user) => {
        this.log(`user ${user.login} with id ${user.id} was updated`, 'update');

        return user;
      });
  }

  public delete(id: string): Promise<UserInstance> {
    this.log(`id: ${id}`, 'delete');

    return this.getById(id)
      .then((user) => {
        if (!user || user.isDeleted) {
          throw createError(404, `User with id: ${id} not found`);
        }

        user.set('isDeleted', true);

        return user.save();
      })
      .then((user) => {
        this.log(`user ${user.login} with id ${user.id} was soft deleted`, 'delete');
        return user;
      });
  }

  public search(searchTerm: string, limit: number = 10): Promise<SearchUsersResponse> {
    this.log(`searchTerm: ${searchTerm}, limit: ${limit}`, 'search');

    return this.userModel.findAndCountAll({
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

  public getAll(): Promise<SearchUsersResponse> {
    this.log(' ', 'getAll');

    return this.userModel.findAndCountAll()
      .then(searchMapper);
  }
}
