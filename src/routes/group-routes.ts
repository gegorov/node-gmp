import express from 'express';
import { createValidator } from 'express-joi-validation';
import { groupController } from '../controllers';
import * as schemas from '../models';

const route = express.Router();
const validator = createValidator({
  statusCode: 400,
});

route.get('/group/:id', validator.params(schemas.paramsSchema), groupController.getGroup);

route.post('/group', validator.body(schemas.postGroupSchema), groupController.postGroup);

export default route;
