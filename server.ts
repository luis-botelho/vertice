import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT ?? 4173);
const host = process.env.HOST ?? '0.0.0.0';
const distPath = path.join(__dirname, 'dist');

app.disable('x-powered-by');
app.get('/healthz', (_request, response) => {
  response.status(200).json({status: 'ok'});
});

app.use(express.static(distPath, {index: 'index.html'}));
app.get('*', (_request, response) => {
  response.sendFile(path.join(distPath, 'index.html'), (error) => {
    if (error) {
      response.status(500).send('Frontend build not found. Run "npm run build" first.');
    }
  });
});

app.listen(port, host, () => {
  console.log(`Vértice listening on http://${host}:${port}`);
});
