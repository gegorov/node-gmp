import express from 'express';
import userRouter from './routes/user-router';

const port = 3000;
const app = express();

app.use(express.json());

app.use(userRouter);

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => console.log(`Server is running on port ${port}.`));
