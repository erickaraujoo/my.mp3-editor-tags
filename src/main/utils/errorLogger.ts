import fs from 'fs';
import path from 'path';
import { getFullDate } from '.';

export default function errorLogger(error: { name: string; message: string; stack: string; }) {
  const date = getFullDate();

  const pathError = path.resolve(__dirname, '..', '..', '..', 'log', 'error', 'error.log');

  const stringError = `------------------------------------------------
    Date: ${date}
    Error: ${error.name}: ${error.message} at ${error.stack}
  `;

  fs.appendFile(pathError, stringError, (errorLog) => {
    if (errorLog) throw errorLog;
  });
}