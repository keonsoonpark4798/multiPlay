import { config } from '../config/config.js';
import mysql from 'mysql2/promise';
import { formatDate } from '../utils/dateFormatter.js';

const createPool = (dbConfig) => {
  const pool = mysql.createPool({
    ...config.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  const originalQuery = pool.query; // 쿼리 로그
  pool.query = (sql, params) => {
    const date = new Date();
    console.log(
      `[${formatDate(date)}] Excuting query: ${sql} ${params ? `${JSON.stringify(params)}` : ``}`,
    );
    return originalQuery.call(pool, sql, params);
  };
  return pool;
};

const dbPool = createPool();

export default dbPool;