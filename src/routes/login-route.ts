import express from 'express';
import { createValidator } from 'express-joi-validation';
import { loginController } from '../controllers';
import * as schemas from '../models';

const route = express.Router();
const validator = createValidator({
  statusCode: 400,
  passError: true,
});

route.post('/login', validator.body(schemas.postLoginSchema), loginController.authenticate);

export default route;
