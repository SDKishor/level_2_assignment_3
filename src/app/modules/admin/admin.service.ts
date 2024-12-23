import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import UserModel from '../auth/user.model';
import { IUser } from '../auth/user.interface';

const blockUser = async (id: string, data: Partial<IUser>) => {
  // check if data contains isblocked property

  if (!Object.keys(data).includes('isBlocked')) {
    throw new AppError(
      'isBlocked property is required',
      StatusCodes.BAD_REQUEST,
    );
  }

  //only update user is blocked property

  const user = await UserModel.findOneAndUpdate(
    { _id: id },
    {
      isBlocked: data.isBlocked,
    },
    {
      new: true,
    },
  );

  if (!user) {
    throw new AppError('User not found', StatusCodes.NOT_FOUND);
  }

  return user;
};

const deleteBlog = async (id: string) => {
  const result = await UserModel.findOneAndDelete({ _id: id });

  return result;
};

export const adminService = {
  blockUser,
  deleteBlog,
};
