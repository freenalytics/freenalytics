import express from 'express';
import cors from 'cors';
import path from 'path';
import apiRouter from './routes';
import { logRequests } from './middleware/logging';
import { handleError } from './middleware/error';

const HTTP_PORT = process.env.PORT || 4000;
const WEB_DASHBOARD_PATH = path.join(__dirname, '../client-build');

const app = express();
app.use(cors());
app.use(logRequests);

app.options('*', cors());

app.use('/api', apiRouter);

app.use(express.static(WEB_DASHBOARD_PATH));
app.get('*', (_, res) => {
  res.sendFile(path.join(WEB_DASHBOARD_PATH, 'index.html'));
});

app.use(handleError);

app.listen(HTTP_PORT, () => {
  console.info(`Server has started on port ${HTTP_PORT}`);
});
