import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import {
  getApplicationSchema,
  createDataForApplication,
  getDataForApplication,
  getDataForApplicationAsCsv
} from '../services/dataService';
import { ResponseBuilder } from '../utils/http';
import { validateDataWithTemplate } from '../utils/template';
import { addAttachment } from '../utils/response';
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
  if (isNaN(start) || start < 0) {
    return next(new BadRequestError('start query parameter must be a valid positive number.'));
  }

  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : PAGINATION_DEFAULT_LIMIT;
  if (isNaN(limit) || limit < 1) {
    return next(new BadRequestError('limit query parameter must be a valid positive number greater than 1.'));
  }

  try {
    await getApplicationSchema(domain);
    const data = await getDataForApplication(domain, { start, limit });
    const response = new ResponseBuilder()
      .withStatusCode(HttpStatus.OK)
      .withData(data);

    res.status(response.statusCode).send(response.build());
  } catch (error) {
    next(error);
  }
};

export const exportAsCsv = async (req: Request, res: Response, next: NextFunction) => {
  const { domain } = req.params;

  try {
    const csv = await getDataForApplicationAsCsv(domain);
    const filename = `${domain}-data.csv`;

    addAttachment(res, filename);
    res.status(HttpStatus.OK).send(csv);
  } catch (error) {
    next(error);
  }
};
