import { startServer, createServer } from '#shared';
import sanitize from 'sanitize-html';

const app = createServer();

let reviews = [
  {
    review:
      "The restaurant is right in the center of town. It has top food en it's a very nice place with a friendly and professional staff",
    name: 'Philippe',
  },
  // {
  //     review: "This is really dangerous! <script>alert('danger!')</script>",
  //     name: "Evil Chef"
  // }
];

app.get('/', async (req, res) => {
  res.render('reviews', { reviews: reviews });
  //   res.render('reviews', { sanitizeHtml: sanitize, reviews: reviews });
});

app.get('/add', (req, res) => {
  res.render('form');
});

app.post('/add', (req, res) => {
  reviews.push({ review: req.body.review, name: req.body.name });
  res.redirect('/');
});

startServer(app, { name: 'XSS-Generic' });
