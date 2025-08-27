import { createServer, startServer } from '#shared';
// import helmet from 'helmet';
import { db } from './database.js';

const app = createServer({
  log: true,
});

// app.use(helmet());

// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: [
//         "'self'",
//         // "'unsafe-inline'"
//       ],
//       // styleSrc: [
//       //   "'self'",
//       //   // "'unsafe-inline",
//       //   'https://fonts.googleapis.com',
//       //   'https://cdn.jsdelivr.net',
//       //   'https://jsdelivr.com',
//       // ],
//       imgSrc: [
//         "'self'",
//         'https://static.frontendmasters.com',
//         'https://fav.farm',
//       ],
//       fontSrc: [
//         "'self'",
//         'https://fonts.googleapis.com',
//         'https://fonts.gstatic.com',
//       ],
//       connectSrc: ["'self'"],
//       objectSrc: ["'none'"],
//       upgradeInsecureRequest: [],
//     },
//   })
// );

app.get('/', (req, res) => {
  res.render('index', { title: 'Content Security Policy' });
});

app.get('/data', async (req, res) => {
  const rows = await db.all('SELECT * FROM data');
  res.json(rows);
});

app.post('/data', async (req, res) => {
  const { value } = req.body;

  const result = await db.run('INSERT INTO data (value) VALUES (?)', [value]);
  res.json({ id: result.lastID });
});

app.all('/echo', (req, res) => {
  res.json(req.body);
});

app.post('/report', async (req, res) => {
  console.log(req.body);

  res.json({ message: 'Report received' });
});

startServer(app, { name: 'CSP' });
