import AppError from '../../errors/AppError';
import { IUser } from './user.interface';
import UserModel from './user.model';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import config from '../../config';
import jwt from 'jsonwebtoken';

const createUser = async (user: IUser) => {
  const newUser = await UserModel.create([user]);

  if (!newUser.length) {
    throw new AppError('Failed to create student', StatusCodes.BAD_REQUEST);
  }
  return newUser;
};

const loginUser = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new AppError('User not found', StatusCodes.NOT_FOUND);
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new AppError('Invalid password', StatusCodes.UNAUTHORIZED);
  }

  //create token
  const jwtpayload = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accesstoken = jwt.sign(jwtpayload, config.jwt_access_secret as string, {
    expiresIn: '1d',
  });

  const refreshtoken = jwt.sign(
    jwtpayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: '7d',
    },
  );

  return {
    accessToken: accesstoken,
    refreshToken: refreshtoken,
  };
};

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

export const authService = {
  createUser,
  loginUser,
  blockUser,
};
