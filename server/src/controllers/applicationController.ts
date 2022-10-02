import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import { getAllApplicationsForUser, createApplicationForUser } from '../services/applicationService';
import { ResponseBuilder } from '../utils/http';
import { BadRequestError } from '../errors/http';
import { ApplicationCreateBody, ApplicationCreateSchema } from '../schemas/application';
import { validate } from '../utils/schema';
import { UserModel } from '../models/user';

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.user as UserModel;
  try {
    const apps = await getAllApplicationsForUser(username);
    const response = new ResponseBuilder()
      .withStatusCode(HttpStatus.OK)
      .withData(apps);

    res.status(response.statusCode).send(response.build());
  } catch (error: any) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.user as UserModel;
  const applicationBody = req.body as ApplicationCreateBody;

  if (!applicationBody) {
    next(new BadRequestError('A JSON body is required.'));
    return;
  }

  try {
    const validatedApplication = validate(applicationBody, ApplicationCreateSchema);
    const createdApplication = await createApplicationForUser(username, validatedApplication);

    const response = new ResponseBuilder()
      .withStatusCode(HttpStatus.CREATED)
      .withData(createdApplication);

    res.status(response.statusCode).send(response.build());
  } catch (error: any) {
    next(error);
  }
};
