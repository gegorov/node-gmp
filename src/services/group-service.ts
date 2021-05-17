import { Logger } from 'winston';
import createError from 'http-errors';
import { sequelize } from '../dao/sequelize';
import {
  GroupCreationAttributes, GroupStatic, GroupInstance, SearchGroupResponse,
} from '../types';

export class GroupService {
  constructor(private groupModel: GroupStatic, private logger: Logger) {
    this.groupModel = groupModel;
  }

  private log(message: string, methodName?: string): void {
    this.logger.info(`[GroupService] - [${methodName || ' '}] - ${message}`);
  }

  public getById(id:string): Promise<GroupInstance> {
    this.log(`id: ${id}`, 'getById');

    return this.groupModel.findByPk(id)
      .then((group) => {
        if (!group) {
          throw createError(404, `Group with id: ${id} not found`);
        }

        return group;
      });
  }

  public create(newGroup: GroupCreationAttributes): Promise<GroupInstance> {
    this.log(`group name: ${newGroup.name}, permissions: [${newGroup.permissions.join(',')}]`, 'create');

    return this.groupModel.create(newGroup)
      .then((group) => {
        this.log(`group "${group.name}" created, id: ${group.id}`, 'create');

        return group;
      });
  }

  public update(id: string, updatedGroup: GroupCreationAttributes): Promise<GroupInstance> {
    this.log(`group id: ${id}, name: ${updatedGroup.name}, permissions: [${updatedGroup.permissions.join(',')}]`, 'update');

    return this.getById(id)
      .then((group) => {
        if (!group) {
          throw createError(404, `Group with id: ${id} not found`);
        }
        throw new Error('oh no');
        group.set(updatedGroup);

        return group.save();
      }).then((group) => {
        this.log(`group ${group.name} with id ${group.id} was updated`, 'update');

        return group;
      });
  }

  public delete(id: string): Promise<void> {
    this.log(`group id: ${id}`, 'delete');

    return this.groupModel.findByPk(id)
      .then((user) => {
        if (!user) {
          throw createError(404, `Group with id: ${id} not found`);
        }

        return user.destroy();
      })
      .then(() => {
        this.log(`group with id ${id} was deleted`, 'delete');
      });
  }

  public getAll(): Promise<SearchGroupResponse> {
    this.log(' ', 'getAll');

    return this.groupModel.findAndCountAll()
      .then((result) => ({
        total: result.count,
        groups: result.rows,
      }));
  }

  public addUsersToGroup(id:string, users: string[]): Promise<void> {
    this.log(`group: ${id}, users: [${users.join(',')}]`, 'addUsersToGroup');

    return sequelize.transaction()
      .then((transaction) => this.groupModel.findByPk(id)
        .then((group) => {
          if (!group) {
            throw createError(404, `Group with id: ${id} not found`);
          }

          return Promise.all(users.map((user) => group.addUsers(user, { transaction })));
        })
        .then(() => transaction.commit())
        .then(() => {
          this.log(`users [${users.join(',')}] were added to group ${id}`, 'addUsersToGroup');
        })
        .catch((error) => {
          transaction.rollback();
          throw error;
        }));
  }
}
