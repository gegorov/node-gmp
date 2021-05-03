import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  process.env.POSTGRES_DB as string,
  process.env.DB_USER as string,
  process.env.POSTGRES_PASSWORD as string, {
    dialect: 'postgres',
    host: process.env.DB_HOST as string,
  },
);
