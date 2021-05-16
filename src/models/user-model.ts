import Sequelize, { DataTypes } from 'sequelize';

export const userModel = {

  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Sequelize.literal('uuid_generate_v4()'),
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
};
