import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { joiValidation } from '../../../utils/helpers/joi.helper';

export const validateMarkNotificationSeenRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bodySchema = Joi.object({
        notification_ids: Joi.array().items(Joi.string()).required(),
    });

    joiValidation(bodySchema, req.body);

    next();
  } catch (error) {
    next(error);
  }
};
