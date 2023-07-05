import { Request, Response, NextFunction } from 'express';
import { USER_ROLES } from '../../utils/enums';
import { CustomError } from '../../utils/helpers/error.helper';
import { StatusCodes } from 'http-status-codes';
import { TeacherModel } from '../../models/Teacher';
import { StudentModel } from '../../models/Student';
import { generateToken } from '../../utils/helpers/jwt.helper';
import { comparePassword } from '../../utils/helpers/password.helper';

export const loginController = async (
  req: Request<{ role: string }, any, { email: string; password: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req.params;
    const { email, password } = req.body;
    let token: string;

    switch (role) {
      case USER_ROLES.STUDENT: {
        const existingStudent = await StudentModel.findOne({ email });
        if (!existingStudent) {
          throw new CustomError({
            message: 'Incorrect email or password.',
            statusCode: StatusCodes.UNAUTHORIZED,
          });
        }
        if (!comparePassword(password, existingStudent.password)) {
          throw new CustomError({
            message: 'Incorrect email or password.',
            statusCode: StatusCodes.UNAUTHORIZED,
          });
        }
        token = generateToken({
          id: existingStudent._id,
          name: existingStudent.name,
          email: existingStudent.email,
          role: existingStudent.role,
        });
        break;
      }
      case USER_ROLES.TEACHER: {
        const existingTeacher = await TeacherModel.findOne({ email });
        if (!existingTeacher) {
          throw new CustomError({
            message: 'Incorrect email or password.',
            statusCode: StatusCodes.UNAUTHORIZED,
          });
        }
        if (!comparePassword(password, existingTeacher.password)) {
          throw new CustomError({
            message: 'Incorrect email or password.',
            statusCode: StatusCodes.UNAUTHORIZED,
          });
        }
        token = generateToken({
          id: existingTeacher._id,
          name: existingTeacher.name,
          email: existingTeacher.email,
          role: existingTeacher.role,
        });
        break;
      }
      default: {
        throw new CustomError({
          message: 'Invalid role.',
          statusCode: StatusCodes.BAD_REQUEST,
        });
      }
    }
    return res
      .status(StatusCodes.OK)
      .json({ message: `Logged In as ${role}`, token });
  } catch (error) {
    next(error);
  }
};
