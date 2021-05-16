import colors from 'colors/safe';
import { sequelize } from '../dao/sequelize';
import {
  GroupCreationAttributes, GroupStatic, GroupInstance, SearchGroupResponse,
} from '../types';

export class GroupService {
  constructor(private groupModel: GroupStatic) {
    this.groupModel = groupModel;
  }

  public getById(id:string): Promise<GroupInstance | null> {
    return this.groupModel.findByPk(id);
  }

  public create(newGroup: GroupCreationAttributes): Promise<GroupInstance> {
    return this.groupModel.create(newGroup)
      .then((group) => {
        console.log(colors.green(`group "${group.name}" created, id: ${group.id}`));
        return group;
      });
  }

  public update(id: string, updatedGroup: GroupCreationAttributes): Promise<GroupInstance | null> {
    return this.getById(id)
      .then((group) => {
        if (!group) {
          return null;
        }

        group.set(updatedGroup);
        console.log(colors.green(`group ${group.name} with id ${group.id} was updated`));

        return group.save();
      });
  }

  public delete(id: string): Promise<void> {
    return this.groupModel.findByPk(id)
      .then((user) => {
        if (!user) {
          throw new Error(`There is no group with id ${id}`);
        }

        return user.destroy();
      })
      .then(() => {
        console.log(colors.red(`group with id ${id} was deleted`));
      });
  }

  public getAll(): Promise<SearchGroupResponse> {
    return this.groupModel.findAndCountAll()
      .then((result) => ({
        total: result.count,
        groups: result.rows,
      }));
  }

  public addUsersToGroup(id:string, users: string[]) {
    return sequelize.transaction()
      .then((transaction) => this.groupModel.findByPk(id)
        .then((group) => {
          if (!group) {
            throw new Error(`There is no group with id ${id}`);
          }

          return Promise.all(users.map((user) => group.addUsers(user, { transaction })));
        })
        .then(() => transaction.commit())
        .catch((error) => {
          console.error(error);
          transaction.rollback();
          throw error;
        }));
  }
}
