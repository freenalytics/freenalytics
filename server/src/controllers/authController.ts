import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import User, { UserModel } from '../models/user';
import { createJwtToken } from '../middleware/auth';
import { ResponseBuilder } from '../utils/http';

export type RegisterBody = {
  username: string,
  password: string,
  locale: string
}

export const register = async (req: Request, res: Response) => {
  const { username, password, locale } = req.body as RegisterBody;
  const createdAt = new Date().toISOString();

  try {
    await User.register(new User({ username, locale, createdAt }), password);
    const response = new ResponseBuilder()
      .withStatusCode(HttpStatus.OK)
      .withData({
        message: 'Account creation successful. Please login to get your access token.'
      });

    res.status(response.statusCode).send(response.build());
  } catch (error) {
    // TODO: Rethrow correct error.
    throw error;
  }
};

export const login = async (req: Request, res: Response) => {
  const { _id: id, username, locale, createdAt } = req.user as UserModel;
  const response = new ResponseBuilder()
    .withStatusCode(HttpStatus.OK)
    .withData({
      token: createJwtToken({ id, username, locale, createdAt })
    });

  res.status(response.statusCode).send(response.build());
};
