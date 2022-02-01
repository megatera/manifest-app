const { Pool } = require('pg');
require('dotenv').config();
console.log(process.env);

const PG_URI = process.env.PSQL_CONNECTION;

const pool = new Pool ({
  connectionString: PG_URI
});

// TODO: Add schema details here

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
}
