import { startServer, createServer } from '#shared';
import express from 'express';
import { expressCspHeader, NONCE } from 'express-csp-header';

const app = createServer();

/* Simple CSP policy */
app.use(
  expressCspHeader({
    directives: {
      'script-src': ["'self'"],
    },
  })
);

/* Enabling CSP with nonces */
// app.use(expressCspHeader({
//   directives: {
//       "script-src": [NONCE]
//   }
// }));

/* Starting point for the Twitter app */
// app.use(expressCspHeader({
//   directives: {
//       "script-src": ["'self'", "'sha256-FqDlP5rXg5ul6qKEe3fiEnZ1QiZNUUQzh4BoJeR5SkA='"]
//   }
// }));

/* CSP with nonces and 'strict-dynamic' for the Twitter app */
// app.use(expressCspHeader({
//   directives: {
//       "script-src": [NONCE, "'strict-dynamic'"]
//   }
// }));

/* Serve the Twitter app dynamically */
// app.set('view engine', 'ejs');
// app.get("/", (req, res) => {
//     res.render(`${__dirname}/build-twitter-app/index`, { nonce: req.nonce });
// })

//Serve a React app
app.use(express.static('build-simple-app'));
// app.use(express.static("build-twitter-app"));

startServer(app, { name: 'CSP-React-Simple-App' });
