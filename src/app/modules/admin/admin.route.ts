import { Router } from 'express';
import auth from '../../middlewares/auth';
import { adminController } from './admin.controller';

const router = Router();
router.patch('/users/:userId/block', auth('admin'), adminController.blockUser);

router.delete('/blogs/:id', auth('admin'), adminController.deleteBlog);

export const adminRoutes = router;
