import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { blogService } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const result = await blogService.createBlog(req.body);

  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: 'Failed to create blog',
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'blog created successfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await blogService.getAllBlogs(req.query);

  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: 'Failed to get all blogs',
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'blogs fetched successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const result = await blogService.updateBlog(req.params.blogId, req.body);

  if (!result) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: 'Failed to update blog',
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'blog updated successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const result = await blogService.deleteBlog(req.params.blogId, req.user.id);

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

export const blogController = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};
