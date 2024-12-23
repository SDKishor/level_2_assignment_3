import { Router } from 'express';
import { authController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidationSchema } from './user.validation';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/register',
  validateRequest(userValidationSchema),
  authController.createUser,
);

router.post('/login', authController.loginUser);

router.patch('/:userId', auth('admin'), authController.blockUser);

export const userRoutes = router;
