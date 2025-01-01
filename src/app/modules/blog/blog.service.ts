import AppError from '../../errors/AppError';

import { StatusCodes } from 'http-status-codes';
import { IBlog } from './blog.interface';
import BlogModel from './blog.model';
import QueryBuilder from '../../builder/QueryBuilder';
import UserModel from '../auth/user.model';

const createBlog = async (blog: IBlog) => {
  const newblog = await BlogModel.create([blog]);

  if (!newblog.length) {
    throw new AppError('Failed to create blog', StatusCodes.BAD_REQUEST);
  }

  const author = await UserModel.findById(newblog[0].author).select(
    '_id name email',
  );

  const result = {
    _id: newblog[0]._id,
    title: newblog[0].title,
    content: newblog[0].content,
    author: author,
  };

  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllBlogs = async (query: any) => {
  const blogQuery = new QueryBuilder(BlogModel.find(), query, BlogModel);

  const result = await blogQuery
    .search(['title', 'content'])
    .filter()
    .sortBy()
    .fields(['_id', 'title', 'content', 'author'])
    .modelQuery.populate('author', '_id name email');

  return result;
};

const updateBlog = async (id: string, blog: Partial<IBlog>) => {
  const result = await BlogModel.findOneAndUpdate({ _id: id }, blog, {
    new: true,
  })
    .select('_id title content author')
    .populate('author', '_id name email');

  return result;
};

const deleteBlog = async (id: string, authorId: string) => {
  const blog = await BlogModel.findOne({ _id: id });

  if (!blog) {
    throw new AppError('Blog not found', StatusCodes.NOT_FOUND);
  }

  if (blog.author.toString() !== authorId) {
    throw new AppError(
      'You are not authorized to delete this blog',
      StatusCodes.UNAUTHORIZED,
    );
  }

  const result = await BlogModel.findOneAndDelete({ _id: id });

  return result;
};

export const blogService = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};
