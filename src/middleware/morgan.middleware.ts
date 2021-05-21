import morgan, { StreamOptions } from 'morgan';
import logger from '../logger';

const stream: StreamOptions = {
  write: (message) => logger.http(message.substring(0, message.lastIndexOf('\n'))),
};

export const morganMiddleWare = morgan(
  ':method :url :status :response-time ms - :res[content-length]',
  {
    stream,
  },
);
