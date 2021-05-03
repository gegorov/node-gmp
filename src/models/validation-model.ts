import Joi from 'joi';

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
