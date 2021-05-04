import Sequelize, { DataTypes } from 'sequelize';

export const userGroupModel = {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.literal('uuid_generate_v4()'),
    allowNull: false,
    primaryKey: true,
  },
};
