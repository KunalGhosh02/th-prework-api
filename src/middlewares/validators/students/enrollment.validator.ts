import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { joiValidation } from '../../../utils/helpers/joi.helper';

export const validateEnrollmentRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paramsSchema = Joi.object({
      course_id: Joi.string().required(),
    });

    joiValidation(paramsSchema, req.params);

    next();
  } catch (error) {
    next(error);
  }
};
