import { Request, Response, NextFunction } from 'express';
import { USER_ROLES } from '../../utils/enums';
import { THStudent, THTeacher } from '../../../@types/models/user';
import { StudentModel } from '../../models/Student';
import { CustomError } from '../../utils/helpers/error.helper';
import { StatusCodes } from 'http-status-codes';
import { hashPassword } from '../../utils/helpers/password.helper';
import { TeacherModel } from '../../models/Teacher';
import { generateToken } from '../../utils/helpers/jwt.helper';

export const registerController = async (
  req: Request<{ role: string }, any, THStudent & THTeacher>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req.params;
    const { name, email, password, school, organization } = req.body;
    let token: string;

    switch (role) {
      case USER_ROLES.STUDENT: {
        const existingStudent = await StudentModel.findOne({ email });
        if (existingStudent) {
          throw new CustomError({
            message: 'Student already exists.',
            statusCode: StatusCodes.CONFLICT,
          });
        }
        const hashedPassword = hashPassword(password);
        const newStudent = await StudentModel.create({
          name,
          email,
          password: hashedPassword,
          school,
        });
        if (!newStudent) {
          throw new CustomError({
            message: 'Student not created.',
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          });
        }
         token = generateToken({
          id: newStudent._id,
          name: newStudent.name,
          email: newStudent.email,
          role: newStudent.role,
        })
        break;
      }
      case USER_ROLES.TEACHER: {
        const existingTeacher = await TeacherModel.findOne({ email });
        if (existingTeacher) {
          throw new CustomError({
            message: 'Teacher already exists.',
            statusCode: StatusCodes.CONFLICT,
          });
        }
        const hashedPassword = hashPassword(password);
        const newTeacher = await TeacherModel.create({
          name,
          email,
          password: hashedPassword,
          organization,
        });
        if (!newTeacher) {
          throw new CustomError({
            message: 'Student not created.',
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          });
        }
        token = generateToken({
          id: newTeacher._id,
          name: newTeacher.name,
          email: newTeacher.email,
          role: newTeacher.role,
        })
        break;
      }
      default: {
        throw new CustomError({
          message: 'Invalid role.',
          statusCode: StatusCodes.BAD_REQUEST,
        });
      }
    }

    
    return res.status(StatusCodes.CREATED).json({
      message: 'User created successfully.',
      token
    });
  } catch (error: any) {
    next(error);
  }
};
