import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = async (_: Request, res: Response) => {
  const users = await User.find({});

  // TODO: Use ResponseBuilder.
  res.json(users);
};
