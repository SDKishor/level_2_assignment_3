import { StatusCodes } from 'http-status-codes';
import AppError from '../errors/AppError';
import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import { TRole } from '../modules/auth/user.interface';

const auth = (role: TRole) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Unauthorized', StatusCodes.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    if (decoded.role !== role) {
      throw new AppError('Unauthorized', StatusCodes.UNAUTHORIZED);
    }

    if (decoded.isBlocked === false) {
      throw new AppError('This user is blocked ! !', StatusCodes.UNAUTHORIZED);
    }

    req.user = decoded;

    next();
  });
};

export default auth;
