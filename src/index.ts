import './config';
import express from 'express';
import { sequelize } from './helpers/database';
import userRouter from './routes/user-router';

const port = process.env.APP_PORT;
const app = express();

app.use(express.json());

app.use(userRouter);

app.use((req, res) => {
  res.sendStatus(404);
});

sequelize
  .sync()
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(port, () => console.log(`Server is running on port ${port}.`));
  })
  .catch((err) => console.error('Unable to connect to the database:', err));
