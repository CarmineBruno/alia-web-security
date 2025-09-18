import { db } from '#shared/database.js';

import { toValues } from '#shared';

const users = toValues([
  { username: 'rick', password: 'acidgreen' },
  { username: 'morty', password: 'rebeccapurple' },
  { username: 'admin', password: 'raspberry' },
]);

await db.run(
  'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)'
);

await db.run(
  'CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY, username TEXT)'
);

const { count } = await db.get('SELECT COUNT(*) as count FROM users');

if (!count) {
  console.log('Seeding users...');
  await db.run(`INSERT INTO users (username, password) VALUES ${users}`);
}

export default db;
