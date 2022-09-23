import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import { getAllUsers } from '../services/userService';
import { ResponseBuilder } from '../utils/http';
import { InternalServerError } from '../errors/http';

export const getUsers = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getAllUsers();
    const response = new ResponseBuilder()
      .withStatusCode(HttpStatus.OK)
      .withData(users);

    res.status(response.statusCode).send(response.build());
  } catch (error: any) {
    next(new InternalServerError(error.message));
  }
};
