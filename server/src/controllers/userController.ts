import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import { getAllUsers, getUserByUsername } from '../services/userService';
import { ResponseBuilder } from '../utils/http';
import { HttpError, InternalServerError } from '../errors/http';

export const getAll = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsers();
    const response = new ResponseBuilder()
      .withStatusCode(HttpStatus.OK)
      .withData(users);

    res.status(response.statusCode).send(response.build());
  } catch (error: any) {
    if (error instanceof HttpError) {
      next(error);
    } else {
      next(new InternalServerError(error.message));
    }
  }
};

export const getByUsername = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.params;

  try {
    const user = await getUserByUsername(username);
    const response = new ResponseBuilder()
      .withStatusCode(HttpStatus.OK)
      .withData(user);

    res.status(response.statusCode).send(response.build());
  } catch (error: any) {
    if (error instanceof HttpError) {
      next(error);
    } else {
      next(new InternalServerError(error.message));
    }
  }
};
