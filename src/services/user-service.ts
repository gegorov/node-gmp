import Sequelize, { Op } from 'sequelize';
import colors from 'colors/safe';
import { UserInstance, UserCreationAttributes, SearchUsersResponse } from '../types';

export class UserService {
  constructor(private userModel: Sequelize.ModelCtor<UserInstance>) {
    this.userModel = userModel;
  }

  public getById(id: string): Promise<UserInstance | null> {
    return this.userModel.findByPk(id);
  }

  public create(newUser: UserCreationAttributes): Promise<UserInstance> {
    return this.userModel.create(newUser)
      .then((user) => {
        console.log(colors.green(`user ${user.login} created, id: ${user.id}`));
        return user;
      });
  }

  public update(id: string, newUserData: UserCreationAttributes): Promise<UserInstance | null> {
    return this.getById(id)
      .then((user) => {
        if (!user) {
          return null;
        }

        user.set(newUserData);
        console.log(colors.green(`user ${user.login} with id ${user.id} was updated`));

        return user.save();
      });
  }

  public delete(id: string): Promise<UserInstance | null> {
    return this.getById(id)
      .then((user) => {
        if (!user || user.isDeleted) {
          return null;
        }

        user.set('isDeleted', true);
        console.log(colors.yellow(`user ${user.login} with id ${user.id} was soft deleted`));

        return user.save();
      });
  }

  public search(searchTerm: string, limit: number = 10): Promise<SearchUsersResponse> {
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
}
