import { Router } from 'express';
import auth from '../../middlewares/auth';
import { blogController } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BlogZodSchema } from './blog.validation';

const router = Router();
router.get('/', blogController.getAllBlogs);

router.post(
  '/',
  auth('user'),
  validateRequest(BlogZodSchema),
  blogController.createBlog,
);

router.patch('/:blogId', auth('user'), blogController.updateBlog);

router.delete('/:blogId', auth('user'), blogController.deleteBlog);

export const blogRoutes = router;
