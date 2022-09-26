import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import { getAllUsers, getUserByUsername, updateUserByUsername } from '../services/userService';
import { ResponseBuilder } from '../utils/http';
import { BadRequestError, HttpError, InternalServerError } from '../errors/http';
import { UserUpdateBody, UserUpdateSchema } from '../schemas/user';
import { validate } from '../utils/schema';
import { UserModel } from '../models/user';

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

const handleGetByUsername = async (username: string, res: Response, next: NextFunction) => {
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

export const getByUsername = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.params;
  await handleGetByUsername(username, res, next);
};

export const getCurrent = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.user as UserModel;
  await handleGetByUsername(username, res, next);
};

export const updateCurrent = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.user as UserModel;
  const updateBody = req.body as UserUpdateBody;

  if (!updateBody) {
    next(new BadRequestError('A JSON body is required.'));
    return;
  }

  try {
    const updatedFields = validate(updateBody, UserUpdateSchema);
    const updatedUser = await updateUserByUsername(username, updatedFields);

    const response = new ResponseBuilder()
      .withStatusCode(HttpStatus.OK)
      .withData(updatedUser);

    res.status(response.statusCode).send(response.build());
  } catch (error: any) {
    if (error instanceof HttpError) {
      next(error);
    } else {
      next(new InternalServerError(error.message));
    }
  }
};
