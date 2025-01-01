import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authService } from './auth.service';
import config from '../../config';

const createUser = catchAsync(async (req, res) => {
  const result = await authService.createUser(req.body);

  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: 'Failed to create user',
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'user registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await authService.loginUser(req.body.email, req.body.password);
  const { accessToken, refreshToken } = result;

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.env === 'production',
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'user logged in successfully',
    data: { token: accessToken },
  });
});

const blockUser = catchAsync(async (req, res) => {
  const result = await authService.blockUser(req.params.userId, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'user updated successfully',
    data: result,
  });
});

export const authController = {
  createUser,
  loginUser,
  blockUser,
};
