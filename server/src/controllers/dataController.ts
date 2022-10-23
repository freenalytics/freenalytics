import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import { getApplicationSchema, createDataForApplication, getDataForApplication } from '../services/dataService';
import { ResponseBuilder } from '../utils/http';
import { validateDataWithTemplate } from '../utils/template';
import { PAGINATION_DEFAULT_START, PAGINATION_DEFAULT_LIMIT } from '../constants/pagination';
import { BadRequestError } from '../errors/http';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { domain } = req.params;

  try {
    const schema = await getApplicationSchema(domain);
    validateDataWithTemplate(req.body, schema);

    const data = await createDataForApplication(domain, req.body);
    const response = new ResponseBuilder()
      .withStatusCode(HttpStatus.CREATED)
      .withData(data);

    res.status(response.statusCode).send(response.build());
  } catch (error) {
    next(error);
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  const { domain } = req.params;

  const start = req.query.start ? parseInt(req.query.start as string, 10) : PAGINATION_DEFAULT_START;
  if (isNaN(start)) {
    return next(new BadRequestError('start query parameter must be a valid number.'));
  }

  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : PAGINATION_DEFAULT_LIMIT;
  if (isNaN(limit)) {
    return next(new BadRequestError('limit query parameter must be a valid number.'));
  }

  try {
    const data = await getDataForApplication(domain, { start, limit });
    const response = new ResponseBuilder()
      .withStatusCode(HttpStatus.OK)
      .withData(data);

    res.status(response.statusCode).send(response.build());
  } catch (error) {
    next(error);
  }
};
