import { Router } from 'express';
import { registerController } from '../../controllers/auth/register.controller';
import { validateRegistrationRequest } from '../../middlewares/validators/auth/register.validator';
import { loginController } from '../../controllers/auth/login.controller';
import { validateLoginRequest } from '../../middlewares/validators/auth/login.validator';

export const authRouter = Router();

authRouter
  .route('/register/:role')
  .post(validateRegistrationRequest, registerController);

authRouter.route('/login/:role').post(validateLoginRequest, loginController);
