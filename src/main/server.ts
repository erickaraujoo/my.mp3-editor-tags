import { server } from './application';
import { SERVER } from './config/constants';
import knex from './config/database';
import errorLogger from './utils/errorLogger';

(async () => {
  try {
    await knex.raw('SELECT 1');
    server.listen(SERVER.PORT, async () => {
      console.log(`running on port: ${SERVER.PORT}`);
    });
  } catch (error) {
    console.log(error);
    errorLogger(error);
  }
})();