import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { USER_ROLES } from '../../utils/enums';
import { joiValidation } from '../../utils/helpers/joi.helper';

export const validateLoginRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paramsSchema = Joi.object({
      role: Joi.string()
        .valid(...Object.values(USER_ROLES))
        .required(),
    });
    joiValidation(paramsSchema, req.params);

    const bodySchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    joiValidation(bodySchema, req.body);

    next();
  } catch (error) {
    next(error);
  }
};
