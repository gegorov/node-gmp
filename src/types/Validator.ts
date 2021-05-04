import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';
import { Permission } from './Group';

export interface UserPostRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Fields]: {
    login: string,
    password: string,
    age: number,
  }
}

export interface UsersGetRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    q: string,
    limit?: number,
  }
}

export interface GroupPostRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Fields]: {
    name: string,
    Permission: Permission[],
  }
}
