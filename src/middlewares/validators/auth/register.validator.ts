import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { USER_ROLES } from '../../../utils/enums';
import { joiValidation } from '../../../utils/helpers/joi.helper';

export const validateRegistrationRequest = (
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
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      school: Joi.string().custom((value, helpers) => {
        if (req.params.role === USER_ROLES.STUDENT) {
          return value;
        }
        return helpers.error('any.invalid');
      }),
      organization: Joi.string().custom((value, helpers) => {
        if (req.params.role === USER_ROLES.TEACHER) {
          return value;
        }
        return helpers.error('any.invalid');
      }),
    });
    joiValidation(bodySchema, req.body);
    
    next();
  } catch (error) {
    next(error);
  }
};
