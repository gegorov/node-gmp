import './config';
import express from 'express';
import createError from 'http-errors';
import cors from 'cors';
import logger from './logger';
import {
  auth, errorHandlerMiddleware, morganMiddleWare, validationErrorhandler,
} from './middleware';
import { sequelize } from './dao/sequelize';
import userRoutes from './routes/user-routes';
import groupRoutes from './routes/group-routes';
import loginRoutes from './routes/login-route';

const port = process.env.APP_PORT;
const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error('No secret found');
}

const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(morganMiddleWare);
app.use(express.json());

app.use(loginRoutes);
app.use(auth, userRoutes);
app.use(auth, groupRoutes);

app.use((req, res, next) => next(createError(404, `404. Not Found. No such url '${req.url}'`)));
app.use(validationErrorhandler);
app.use(errorHandlerMiddleware);

process.on('uncaughtException', (error: Error) => {
  logger.error(`Uncaught exception: ${error.message}`);
  process.exitCode = 1;
});

process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled rejection: ${reason}`);
});

sequelize
  .sync()
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(port, () => console.log(`Server is running on port ${port}.`));
  })
  .catch((err) => {
    logger.error('Unable to connect to the database:', err);
  });
