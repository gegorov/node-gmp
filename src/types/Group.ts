import {
  BelongsToManyAddAssociationMixin, BuildOptions, Model, Optional,
} from 'sequelize';
import { UserInstance } from './User';

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface GroupAttributes {
  id: string;
  name: string;
  permissions: Permission[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GroupCreationAttributes extends Optional<GroupAttributes, 'id'> {}

export interface GroupInstance
  extends Model<GroupAttributes, GroupCreationAttributes>, GroupAttributes {
  addUsers: BelongsToManyAddAssociationMixin<UserInstance, string>;
}

export type GroupStatic = typeof Model & {
  new (values?: GroupCreationAttributes, options?: BuildOptions): GroupInstance;
};

export interface SearchGroupResponse {
  total: number,
  groups: GroupInstance[],
}
