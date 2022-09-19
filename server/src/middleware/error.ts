import { Request, Response, NextFunction } from 'express';
import logger from '@greencoast/logger';

export const handleError = (error: Error, _: Request, res: Response, next: NextFunction) => {
  logger.error(error);
  res.status(500).send({ error: error.message });
  next();
};
