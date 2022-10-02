import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../errors/http';

export const jsonBodyRequired = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.body || Object.keys(req.body).length < 1) {
    next(new BadRequestError('A JSON body is required.'));
    return;
  }

  next();
};
