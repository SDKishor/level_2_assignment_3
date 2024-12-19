import { IUser } from './user.interface';
import UserModel from './user.model';

const createUser = async (user: IUser) => {
  const newUser = await UserModel.create(user);

  return newUser;
};

export const userService = {
  createUser,
};
