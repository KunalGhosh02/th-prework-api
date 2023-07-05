import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../../utils/helpers/jwt.helper';
import { CustomError } from '../../../utils/helpers/error.helper';
import { StatusCodes } from 'http-status-codes';
import { USER_ROLES } from '../../../utils/enums';

export const verifyAuth = (role?: USER_ROLES) => (req: Request, _: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      throw new CustomError({
        message: 'No token provided.',
        statusCode: StatusCodes.UNAUTHORIZED,
      });
    }
    const decodedToken: any = verifyToken(token);
    req.user = decodedToken;
    if (role && decodedToken.role !== role) {
      throw new CustomError({
        message: `Unauthorized. Only a ${role} can access this resource.`,
        statusCode: StatusCodes.UNAUTHORIZED,
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
