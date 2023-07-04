import { Router } from 'express';
import { userRouter } from './user.routes';
import { verifyAuth } from '../../middlewares/auth/verify-auth.middleware';

export const v1Router = Router();

v1Router.use('/users', userRouter);
v1Router.use(verifyAuth());
