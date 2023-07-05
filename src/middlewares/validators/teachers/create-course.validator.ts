import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { joiValidation } from '../../../utils/helpers/joi.helper';

export const validateCreateCourseRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bodySchema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      chapters: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().required(),
            contentLink: Joi.string().required(),
          })
        )
        .min(1)
        .required(),
    });

    joiValidation(bodySchema, req.body);

    next();
  } catch (error) {
    next(error);
  }
};
