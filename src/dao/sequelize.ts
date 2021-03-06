import { Sequelize } from 'sequelize';
import { GroupInstance, UserInstance } from '../types';
import { groupModel, userModel, userGroupModel } from '../models';

export const sequelize = new Sequelize(
  process.env.POSTGRES_DB as string,
  process.env.DB_USER as string,
  process.env.POSTGRES_PASSWORD as string, {
    dialect: 'postgres',
    host: process.env.DB_HOST as string,
  },
);

export const User = sequelize.define<UserInstance>('user', userModel, {
  underscored: true,
  timestamps: true,
});

export const Group = sequelize.define<GroupInstance>('group', groupModel, {
  underscored: true,
  timestamps: true,
});

export const UserGroup = sequelize.define('userGroup', userGroupModel, {
  underscored: true,
  timestamps: true,
});

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });
