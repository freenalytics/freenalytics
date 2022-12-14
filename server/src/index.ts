import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import logger from '@greencoast/logger';
import redisClient from './redis/client';
import apiRouter from './routes';
import { logRequests } from './middleware/logging';
import { handleError } from './middleware/error';
import { HTTP_PORT, MONGODB_URI } from './config';

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

mongoose.connect(MONGODB_URI)
  .then(() => {
    redisClient.connect()
      .then(() => {
        app.listen(HTTP_PORT, () => {
          logger.info(`Server has started on port ${HTTP_PORT}`);
        });
      })
      .catch((error) => {
        logger.error('Something happened when connecting to Redis.');
        logger.error(error);
        process.exit(1);
      });
  })
  .catch((error) => {
    logger.error('Something happened when connecting to MongoDB.');
    logger.error(error);
    process.exit(1);
  });

