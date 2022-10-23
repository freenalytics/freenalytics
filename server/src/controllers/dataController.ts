import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import { getApplicationSchema, createDataForApplication } from '../services/dataService';
import { ResponseBuilder } from '../utils/http';
import { validateDataWithTemplate } from '../utils/template';

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
