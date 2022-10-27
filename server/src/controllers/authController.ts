/* eslint-disable max-statements */
import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import User, { UserModel } from '../models/user';
import { UserRegisterBody, UserRegisterSchema, UserChangePasswordBody, UserChangePasswordSchema } from '../schemas/user';
import { getUserByUsername } from '../services/userService';
import { validate } from '../utils/schema';
import { createJwtToken } from '../middleware/auth';
import { ResponseBuilder } from '../utils/http';
import {
  AccountLockedError,
  BadRequestError,
  ForbiddenRequestError,
  HttpError,
  InternalServerError,
  WrongCredentialsError
} from '../errors/http';
import { REGISTRATION_OPEN } from '../config';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  if (!REGISTRATION_OPEN) {
    next(new ForbiddenRequestError('Account registration is not enabled.'));
    return;
  }

  const registerBody = req.body as UserRegisterBody;

  try {
    const { password, ...restOfUser } = validate(registerBody, UserRegisterSchema);
    await User.register(new User({ ...restOfUser }), password);

    const response = new ResponseBuilder()
      .withStatusCode(HttpStatus.CREATED)
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
  const { _id: id, username, locale } = req.user as UserModel;
  const response = new ResponseBuilder()
    .withStatusCode(HttpStatus.OK)
    .withData({
      token: createJwtToken({ id, username, locale })
    });

  res.status(response.statusCode).send(response.build());
};

export const registrationOpen = (_: Request, res: Response) => {
  const response = new ResponseBuilder()
    .withStatusCode(HttpStatus.OK)
    .withData({
      open: REGISTRATION_OPEN
    });

  res.status(response.statusCode).send(response.build());
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.user as UserModel;
  const changePasswordBody = req.body as UserChangePasswordBody;

  try {
    const { old_password, new_password } = validate(changePasswordBody, UserChangePasswordSchema);
    const storedUser = await getUserByUsername(username);
    await storedUser.changePassword(old_password, new_password);

    const response = new ResponseBuilder()
      .withStatusCode(HttpStatus.OK)
      .withData({
        message: 'Password has been changed successfully.'
      });

    res.status(response.statusCode).send(response.build());
  } catch (error: any) {
    if (error instanceof HttpError) {
      next(error);
      return;
    }

    if (error.name === 'IncorrectPasswordError') {
      next(new WrongCredentialsError(error.message));
    } else {
      next(new InternalServerError(error.message));
    }
  }
};
