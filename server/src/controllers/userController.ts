import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import User from '../models/user';
import { ResponseBuilder } from '../utils/http';

export const getUsers = async (_: Request, res: Response) => {
  const users = await User.find({});
  const response = new ResponseBuilder()
    .withStatusCode(HttpStatus.OK)
    .withData(users);

  res.status(response.statusCode).send(response.build());
};
