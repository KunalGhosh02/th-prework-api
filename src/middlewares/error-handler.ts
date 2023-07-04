import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utils/helpers/error.helper';
import { writeLog } from '../utils/helpers/log.helper';
import { LOG_LEVEL } from '../utils/enums';

export const handleError = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  writeLog(LOG_LEVEL.ERROR, err);
  
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: err.message,
  });
};
