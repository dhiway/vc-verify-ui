import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
export const { PORT } = process.env;

app.use(bodyParser.json({ limit: '5mb' }));
app.use(express.json());

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5001',
];

const allowedDomains = [
  'localhost',
  'dhiway.com',
  'dway.io',
  'cord.network',
  'amplifyapp.com' /* For supporting quick hosting of UI */,
];

app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200, // For legacy browser support
    credentials: true,
    preflightContinue: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'X-UserId',
      'Accept',
      'Authorization',
      'user-agent',
      'Host',
      'X-Forwarded-For',
      'Upgrade',
      'Connection',
      'X-Content-Type-Options',
      'Content-Security-Policy',
      'X-Frame-Options',
      'Strict-Transport-Security',
    ],
  })
);

// Manually handle OPTIONS requests
app.options('*', (req, res) => {
  const origin = req.headers.origin;
  let tmpOrigin = origin;

  if (origin && origin.slice(-1) === '/') {
    tmpOrigin = origin.substring(0, origin.length - 1);
  }

  // Validate origin
  if (tmpOrigin) {
    const b = tmpOrigin.split('/')[2].split('.');
    const domain = `${b[b.length - 2]}.${b[b.length - 1]}`;
    if (!allowedDomains.includes(domain) && !allowedDomains.includes(tmpOrigin)) {
      return res.status(403).send('CORS policy: Origin not allowed');
    }
  }

  res.set({
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS, HEAD, PATCH',
    'Access-Control-Allow-Headers':
      'Content-Type, X-UserId, Accept, Authorization, user-agent, Host, X-Forwarded-For, Upgrade, Connection, X-Content-Type-Options, Content-Security-Policy, X-Frame-Options, Strict-Transport-Security',
    'Access-Control-Allow-Credentials': 'true',
  });
  res.sendStatus(204); // No content
});

export default app;
