import User, { UserModel } from '../models/user';
import { ResourceNotFoundError } from '../errors/http';
import { UserUpdateBody } from '../schemas/user';

export const getAllUsers = (): Promise<UserModel[]> => {
  return User.find({}, { _id: 0, __v: 0 }).exec();
};

// Do not project out _id and __v because this function is used by the JWT authenticator.
export const getUserById = async (id: string): Promise<UserModel> => {
  const user = await User.findById(id).exec();

  if (!user) {
    throw new ResourceNotFoundError(`User ${id} was not found.`);
  }

  return user;
};

export const getUserByUsername = async (username: string): Promise<UserModel> => {
  const user = await User.findOne({ username }, { _id: 0, __v: 0 }).exec();

  if (!user) {
    throw new ResourceNotFoundError(`User ${username} was not found.`);
  }

  return user;
};

export const updateUserByUsername = async (username: string, updatedFields: UserUpdateBody): Promise<UserModel> => {
  const updatedUser = await User.findOneAndUpdate({ username }, { $set: updatedFields }, {
    returnDocument: 'after',
    upsert: false,
    projection: { _id: 0, __v: 0 }
  });

  if (!updatedUser) {
    throw new ResourceNotFoundError(`User ${username} was not found.`);
  }

  return updatedUser;
};
