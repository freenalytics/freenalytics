import { Request, Response, NextFunction } from 'express';
import logger from '@greencoast/logger';
import HttpStatus from 'http-status-codes';
import { HttpError, InternalServerError } from '../errors/http';
import { ResponseBuilder } from '../utils/http';

export const handleError = (error: Error, _: Request, res: Response, next: NextFunction) => {
  const httpError: HttpError = error instanceof HttpError ? error : new InternalServerError(error.message);

  if (httpError.statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
    logger.error(error);
  }

  const response = new ResponseBuilder().withError(httpError);
  res.status(response.statusCode).send(response.build());

  next();
};
