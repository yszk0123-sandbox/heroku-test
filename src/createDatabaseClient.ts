import { Client } from 'pg';
import { config } from './config';

const wasTableCreated = async (client: Client, tableName: string) => {
  const result = await client.query(
    `SELECT exists (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = $1);`,
    [tableName]
  );
  const row = result.rows[0];
  return !!row && row.exists;
};

export const createDatabaseClient = async () => {
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
