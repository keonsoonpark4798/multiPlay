import { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } from '../constants/env.js';

export const config = {
  database: {
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
  },
};
