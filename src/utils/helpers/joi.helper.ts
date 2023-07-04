import joi from 'joi';
import { CustomError } from './error.helper';
import { StatusCodes } from 'http-status-codes';

export const joiValidation = (schema: joi.ObjectSchema, data: any) => {
  const { error } = schema.validate(data, {
    stripUnknown: true,
    allowUnknown: false,
  });
  if (error) {
    throw new CustomError({
      message: error.message,
      statusCode: StatusCodes.BAD_REQUEST,
    });
  }
};
