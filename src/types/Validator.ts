import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

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
