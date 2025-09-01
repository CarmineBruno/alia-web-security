import { startServer, createServer } from '#shared';

const app = createServer();

app.get('/', async (req, res) => {
  res.render('view');
});

startServer(app, { name: 'XSS-Generic-TT' });
