const { Client } = require('pg');

// Database name
const DB_NAME = 'pottery';

const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;

let client;

// Github actions client config
if (process.env.CI) {
  client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres',
  });
} else {
  // local / heroku client config
  client = new Client(DB_URL);
}

// Export
module.exports = client;