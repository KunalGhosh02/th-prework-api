import jwt from 'jsonwebtoken';
import { CustomError } from './error.helper';
import { StatusCodes } from 'http-status-codes';

  
export const generateToken = (payload: ITokenPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '20m',
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    throw new CustomError({
      message: 'Invalid token.',
      statusCode: StatusCodes.UNAUTHORIZED,
    });
  }
};
