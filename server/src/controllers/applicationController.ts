import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import { getAllApplicationsForUser } from '../services/applicationService';
import { ResponseBuilder } from '../utils/http';
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
