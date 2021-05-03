import { Model, Optional } from 'sequelize';

export interface UserAttributes {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'isDeleted'> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

export interface SearchUsersResponse {
  total: number,
  users: UserInstance[],
}
