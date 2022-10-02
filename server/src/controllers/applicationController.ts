import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import { getAllApplicationsForUser, createApplicationForUser, getApplicationForUserByDomain } from '../services/applicationService';
import { ResponseBuilder } from '../utils/http';
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
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.user as UserModel;
  const applicationBody = req.body as ApplicationCreateBody;

  try {
    const validatedApplication = validate(applicationBody, ApplicationCreateSchema);
    const createdApplication = await createApplicationForUser(username, validatedApplication);

    const response = new ResponseBuilder()
      .withStatusCode(HttpStatus.CREATED)
      .withData(createdApplication);

    res.status(response.statusCode).send(response.build());
  } catch (error) {
    next(error);
  }
};

export const getByDomain = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.user as UserModel;
  const { domain } = req.params;

  try {
    const application = await getApplicationForUserByDomain(username, domain);
    const response = new ResponseBuilder()
      .withStatusCode(HttpStatus.OK)
      .withData(application);

    res.status(response.statusCode).send(response.build());
  } catch (error) {
    next(error);
  }
};
