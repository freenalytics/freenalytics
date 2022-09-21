import { Request, Response } from 'express';
import User, { UserModel } from '../models/user';
import { createJwtToken } from '../middleware/auth';

export type RegisterBody = {
  username: string,
  password: string
}

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body as RegisterBody;

  try {
    await User.register(new User({ username }), password);

    // TODO: Use a ResponseBuilder.
    res.json({
      message: 'Success'
    });
  } catch (error) {
    // TODO: Rethrow correct error.
    throw error;
  }
};

export const login = async (req: Request, res: Response) => {
  const { _id: id, username } = req.user as UserModel;
  const payload = { id, username };

  // TODO: Use ResponseBuilder.
  res.json({ token: createJwtToken(payload) });
};
