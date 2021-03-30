import express from 'express';
import userRouter from './routes/user-router';

const port = 3000;
const app = express();

app.use(express.json());

app.use(userRouter);

app.use((req, res) => {
  res.sendStatus(404);
});

const server = app.listen(port, () => console.log(`Server is running on port ${port}.`));

// Graceful shutdown of server
process.on('SIGINT', () => {
  console.log('\n[server] Shutting down...');
  server.close();
  process.exit();
});

process.on('SIGTERM', () => {
  console.log('\n[server] Shutting down...');
  server.close();
  process.exit();
});

process.on('uncaughtException', () => {
  console.log('\n[server] Shutting down...');
  server.close();
  process.exit();
});
