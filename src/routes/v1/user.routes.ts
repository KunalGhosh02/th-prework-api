import { Router } from 'express';
import { registerController } from '../../controllers/users/register.controller';
import { validateRegistrationRequest } from '../../middlewares/validators/register.validator';
import { loginController } from '../../controllers/users/login.controller';
import { validateLoginRequest } from '../../middlewares/validators/login.validator';

export const userRouter = Router();

userRouter
  .route('/register/:role')
  .post(validateRegistrationRequest, registerController);

userRouter.route('/login/:role').post(validateLoginRequest, loginController);
