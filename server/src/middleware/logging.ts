import { Request, Response, NextFunction } from 'express';
import logger from '@greencoast/logger';
import onFinished from 'on-finished';

export const logRequests = (req: Request, res: Response, next: NextFunction) => {
  onFinished(res, (error, res) => {
    if (error) {
      logger.error(error);
      return;
    }

    logger.info(`${req.method}:${req.originalUrl} ${res.statusCode} (${req.ip})`);
  });

  next();
};
