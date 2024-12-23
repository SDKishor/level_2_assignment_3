import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { adminService } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  const result = await adminService.blockUser(req.params.userId, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'user updated successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const result = await adminService.deleteBlog(req.params.id);

  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: 'Failed to delete blog',
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'blog deleted successfully',
    data: result,
  });
});

export const adminController = {
  blockUser,
  deleteBlog,
};
