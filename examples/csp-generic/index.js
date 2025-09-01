import { startServer, createServer } from '#shared';
import { expressCspHeader, NONCE } from 'express-csp-header';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const VIEWS = `${__dirname}/views`;

const app = createServer();

app.get('/', (req, res) => {
  res.send('Nothing to see here, try one of the other endpoints instead');
});

/*********************************
 * Demo: Preventing XSS with CSP *
 *********************************/

app.get('/xss', (req, res) => {
  // res.setHeader('Content-Security-Policy', "script-src 'self'");
  const filePath = join(VIEWS, 'xss.html');
  res.sendFile(filePath);
});

/*******************************
 * Demo: Using hashes with CSP *
 *******************************/

app.get('/hashes', (req, res) => {
  // res.setHeader('Content-Security-Policy', "script-src 'self'");
  const filePath = join(VIEWS, 'hashes.html');
  res.sendFile(filePath);
});

/*******************************
 * Demo: Using nonces with CSP *
 *******************************/
// - Show nonce changes in Httpie

const cspNonces = {
  directives: {
    'script-src': [NONCE],
  },
};
app.get('/nonces', expressCspHeader(cspNonces), (req, res) => {
  res.render('nonces', { nonce: req.nonce });
});

/*****************************
 * Demo: Modern CSP policies *
 *****************************/

const cspNoncesTrust = {
  directives: {
    'script-src': [NONCE],
  },
};
app.get('/nonces-trust', expressCspHeader(cspNoncesTrust), (req, res) => {
  res.render('nonces-trust', { nonce: req.nonce });
});

startServer(app, { name: 'CSP-Generic' });
