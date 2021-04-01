import express from 'express';
import { createValidator } from 'express-joi-validation';
import * as userController from '../controllers/user-controller';
import * as schemas from '../models/validation';

const route = express.Router();
const validator = createValidator({
  statusCode: 400,
});

route.get('/user/:id', validator.params(schemas.paramsSchema), userController.getUser);

route.post('/user', validator.body(schemas.postUserSchema), userController.postUser);

route.put(
  '/user/:id',
  validator.params(schemas.paramsSchema),
  validator.body(schemas.postUserSchema),
  userController.updateUser,
);

route.delete('/user/:id', validator.params(schemas.paramsSchema), userController.deleteUser);

route.get('/users', validator.query(schemas.getUsersSchema), userController.searchUsers);

export default route;