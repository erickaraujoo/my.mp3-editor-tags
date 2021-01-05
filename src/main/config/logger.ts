import path from 'path';
import morgan from 'morgan';
import { createStream } from 'rotating-file-stream';

const accessLogStream = createStream('access.log', {
  path: path.resolve('log', 'access'),
  interval: '1d',
  maxFiles: 14,
  immutable: true,
});

const logger = morgan('combined', { stream: accessLogStream });

export default logger;