'use strict';
const {Pool} = require('pg');

const serviceHost = process.env.DATABASE_DB_HOST || 'localhost';
const servicePort = process.env.DATABASE_DB_PORT || '5432';
const user = process.env.DATABASE_DB_USERNAME || 'user';
const password = process.env.DATABASE_DB_PASSWORD || 'password';
const dbName = process.env.DATABASE_DB_NAME || 'my_data';
const connectionString = `postgresql://${user}:${password}@${serviceHost}:${servicePort}/${dbName}`;

const pool = new Pool({
  connectionString
});

// -- Create the products table if not present
const initScript = `CREATE TABLE IF NOT EXISTS products (
  id        SERIAL PRIMARY KEY,
  name      VARCHAR(40) NOT NULL,
  stock     BIGINT
);

-- DELETE FROM products;

-- INSERT INTO products (name, stock) values ('Apple', 10);
-- INSERT INTO products (name, stock) values ('Orange', 10);
-- INSERT INTO products (name, stock) values ('Pear', 10);`;

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  },
  init: () => {
    return pool.query(initScript);
  }
};
