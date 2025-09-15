import { db, toParamsAndValues } from '#shared/database.js';

const users = [
  { id: 1, username: 'therealneo', password: 'redpill', balance: 1000 },
  { id: 2, username: 'trinity', password: 'midnightblue', balance: 500 },
  { id: 3, username: 'morpheus', password: 'electricviolet', balance: 200 },
  { id: 4, username: 'smith', password: 'smokyblack', balance: 100 },
];

const { params, values } = toParamsAndValues(users, true);

await db.run(
  'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, balance INTEGER)'
);

// Create sessions table
await db.run(
  'CREATE TABLE IF NOT EXISTS sessions (sessionId TEXT PRIMARY KEY, userId INTEGER, token TEXT)'
);

await db.run(`INSERT OR IGNORE INTO users ${params} VALUES ${values}`);

export { db };
