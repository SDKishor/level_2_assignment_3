import { Router } from 'express';
import { userRoutes } from '../modules/auth/auth.route';
import { blogRoutes } from '../modules/blog/blog.route';
import { adminRoutes } from '../modules/admin/admin.route';

const router = Router();

const modulesRoutes = [
  {
    path: '/auth',
    route: userRoutes,
  },
  {
    path: '/blogs',
    route: blogRoutes,
  },
  {
    path: '/admin',
    route: adminRoutes,
  },
];

modulesRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
