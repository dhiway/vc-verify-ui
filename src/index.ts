import express from 'express';
import { dataSource } from './dbconfig';
import app from './server';
import { verifyId } from './verify';

const { PORT } = process.env;

const verifyRouter = express.Router({ mergeParams: true });

app.get('/verify/:id', async (req, res) => {
  return await verifyId(req, res);
});

app.get('/*', async (req, res) => {
  return res.sendFile("view/verify.html");
});

async function main() {
  try {
    await dataSource.initialize();
  } catch (error) {
    console.log('error: ', error);
    throw new Error('Main error');
  }

  app.listen(PORT, () => {
    console.log(`Verify UI is running at http://localhost:${PORT}`);
  });
}

main().catch((e) => console.log(e));
