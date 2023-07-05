import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { joiValidation } from '../../../utils/helpers/joi.helper';

export const validateQuizSubmission = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bodySchema = Joi.object({
      course_id: Joi.string().required(),
      chapter_id: Joi.string().required(),
      answers: Joi.array().items(Joi.number()).min(1).required(),
    });

    joiValidation(bodySchema, req.body);

    next();
  } catch (error) {
    next(error);
  }
};
