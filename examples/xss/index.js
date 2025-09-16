import { readFile } from 'fs/promises';
import { startServer, createServer } from '#shared';
// import sanitize from 'sanitize-html';
import db from './database.js';

const app = createServer();

const getComments = async () => {
  return db.all('SELECT content FROM comments');

  // const comments = await db.all('SELECT content FROM comments');

  // comments.forEach((comment) => {
  //   comment.content = sanitize(comment.content);
  // });

  // return comments;
};

app.get('/', async (req, res) => {
  const comments = await getComments();

  res.render('index', {
    comments,
    query: req.query,
    // sanitizeHtml: sanitize
  });
});

app.get('/comments', async (req, res) => {
  res.json(await getComments());
});

app.post('/comment', async (req, res) => {
  const { content } = req.body;
  await db.run('INSERT INTO comments (content) VALUES (?)', content);
  res.redirect('/');
});

startServer(app, { name: 'XSS' });
