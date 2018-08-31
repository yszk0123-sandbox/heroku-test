const { Client } = require('pg');
const { config } = require('./config');

const wasTableCreated = async (client, tableName) => {
  const result = await client.query(
    `SELECT exists (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = $1);`,
    [tableName]
  );
  const row = result.rows[0];
  return !!row && row.exists;
};

const createDatabaseClient = async () => {
  const client = new Client({
    connectionString: config.database.url
  });

  await client.connect();

  if (!(await wasTableCreated(client, 'todos'))) {
    console.log('Table "todos" did not exist, creating...');
    await client.query('CREATE TABLE todos (id int, text text, done bool);');
  }

  return client;
};

module.exports = { createDatabaseClient };
