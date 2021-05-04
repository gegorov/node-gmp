import express from 'express';
import { createValidator } from 'express-joi-validation';
import { groupController } from '../controllers';
import * as schemas from '../models';

const route = express.Router();
const validator = createValidator({
  statusCode: 400,
});

route.get('/group/:id', validator.params(schemas.paramsSchema), groupController.getGroup);

route.post(
  '/group/:id',
  validator.params(schemas.paramsSchema),
  validator.body(schemas.postAddUsersToGroup),
  groupController.addUsersToGroup,
);

route.post('/group', validator.body(schemas.postGroupSchema), groupController.postGroup);

route.put(
  '/group/:id',
  validator.params(schemas.paramsSchema),
  validator.body(schemas.postGroupSchema),
  groupController.updateGroup,
);

route.delete('/group/:id', validator.params(schemas.paramsSchema), groupController.deleteGroup);

route.get('/groups', groupController.getAllGroups);

export default route;
