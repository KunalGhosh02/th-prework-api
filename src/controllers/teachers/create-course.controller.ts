import { Request, Response, NextFunction } from 'express';
import { CourseModel } from '../../models/Course';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../../utils/helpers/error.helper';

export const createCourseController = async (
  req: Request<any, any, Teacher.ICourseCreateRequest>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, chapters } = req.body;

    const existingCourse = await CourseModel.findOne({
      name,
    });

    if (existingCourse) {
      throw new CustomError({
        message: 'Course with given name already exists.',
        statusCode: StatusCodes.CONFLICT,
      });
    }

    const newCourse = await CourseModel.create({
      name,
      description,
      chapters,
      teacher: req.user!.id,
    });
    if (!newCourse) {
      throw new CustomError({
        message: 'Course not created.',
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
    return res.status(StatusCodes.CREATED).json({
      message: 'Course created successfully',
      data: {
        course_name: newCourse.name,
        course_id: newCourse.id,
      },
    });
  } catch (error) {
    next(error);
  }
};
