import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { joiValidation } from '../../../utils/helpers/joi.helper';

export const validateUpdateCourseRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bodySchema = Joi.object({
      id: Joi.string().required(),

      add_chapter: Joi.boolean().optional().default(false),
      field_to_update: Joi.alternatives().conditional('add_chapter', {
        is: true,
        then: Joi.forbidden(),
        otherwise:  Joi.string().valid('name', 'description', 'chapters').required(),
      }),

      chapter_field: Joi.alternatives().conditional('field_to_update', {
        is: 'chapters',
        then: Joi.string().valid('name', 'contentLink').required(),
        otherwise: Joi.forbidden(),
      }),

      chapter_id: Joi.alternatives().conditional('field_to_update', {
        is: 'chapters',
        then: Joi.string().required(),
        otherwise: Joi.forbidden(),
      }),

      chapter_payload: Joi.alternatives().conditional('add_chapter', {
        is: true,
        then: Joi.object({
          name: Joi.string().required(),
          contentLink: Joi.string().required(),
        }),
        otherwise: Joi.forbidden(),
      }),

      new_value: Joi.alternatives().conditional('add_chapter', {
        is: true,
        then: Joi.forbidden(),
        otherwise: Joi.string().required(),
      }),
    });

    joiValidation(bodySchema, req.body);
    next();
  } catch (error) {
    next(error);
  }
};
