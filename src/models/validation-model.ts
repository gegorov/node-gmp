import Joi from 'joi';
import { Permission } from '../types/Group';

export const postUserSchema = Joi.object({
  login: Joi.string().min(2).required(),
  password: Joi.string().min(6).alphanum().required(),
  age: Joi.number().min(4).max(130).required(),
});

export const getUsersSchema = Joi.object({
  q: Joi.string().required(),
  limit: Joi.number(),
});

export const paramsSchema = Joi.object({
  id: Joi.string().length(36).required(),
});

const validPermissions: Permission[] = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'];

export const postGroupSchema = Joi.object({
  name: Joi.string().min(2).required(),
  permissions: Joi.array().items(Joi.string().valid(...validPermissions).required()).required(),
});

export const postAddUsersToGroup = Joi.object({
  users: Joi.array().items(Joi.string().length(36)).unique().min(1),
});
