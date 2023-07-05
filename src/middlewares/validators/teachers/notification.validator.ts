import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { joiValidation } from '../../../utils/helpers/joi.helper';

export const validateSendNotificationRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bodySchema = Joi.object({
      notification: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
      }).required(),
      course_id: Joi.string().required(),
    });

    joiValidation(bodySchema, req.body);

    next();
  } catch (error) {
    next(error);
  }
};
