import User, { UserModel } from '../models/user';
import { ResourceNotFoundError } from '../errors/http';

export const getAllUsers = (): Promise<UserModel[]> => {
  return User.find({}).exec();
};

export const getUserById = async (id: string): Promise<UserModel> => {
  const user = await User.findById(id).exec();

  if (!user) {
    throw new ResourceNotFoundError(`User ${id} was not found.`);
  }

  return user;
};
