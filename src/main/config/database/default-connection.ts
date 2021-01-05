import Knex from 'knex';
// import { DATABASE } from '../constants';

const knex = Knex({
  client: 'mysql2',
  connection: {
    host: '',
    user: '',
    password: '',
    database: '',
  },
});

export default knex;