import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import User, { UserModel } from '../models/user';
import { UserRegisterBody, UserRegisterSchema } from '../schemas/user';
import { createJwtToken } from '../middleware/auth';
import { ResponseBuilder } from '../utils/http';
import { validate } from '../utils/schema';
import {
  AccountLockedError,
  BadRequestError,
  HttpError,
  InternalServerError,
  WrongCredentialsError
} from '../errors/http';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const registerBody = req.body as UserRegisterBody;
  const createdAt = new Date().toISOString();

  try {
    const { password, ...restOfUser } = validate(registerBody, UserRegisterSchema);
    await User.register(new User({ ...restOfUser, createdAt }), password);

    const response = new ResponseBuilder()
      .withStatusCode(HttpStatus.OK)
      .withData({
        message: 'Account creation successful. Please login to get your access token.'
      });

    res.status(response.statusCode).send(response.build());
  } catch (error: any) {
    if (error instanceof HttpError) {
      next(error);
      return;
    }

    if (error.name === 'MissingPasswordError' || error.name === 'MissingUsernameError' || error.name === 'UserExistsError') {
      next(new BadRequestError(error.message));
    } else if (error.name === 'AttemptTooSoonError' || error.name === 'TooManyAttemptsError') {
      next(new AccountLockedError(error.message));
    } else if (error.name === 'IncorrectPasswordError' || error.name === 'IncorrectUsernameError') {
      next(new WrongCredentialsError(error.message));
    } else {
      next(new InternalServerError(error.message));
    }
  }
};

export const login = (req: Request, res: Response) => {
  const { _id: id, username, locale, createdAt } = req.user as UserModel;
  const response = new ResponseBuilder()
    .withStatusCode(HttpStatus.OK)
    .withData({
      token: createJwtToken({ id, username, locale, createdAt })
    });

  res.status(response.statusCode).send(response.build());
};
