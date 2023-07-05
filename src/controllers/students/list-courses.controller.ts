import { Request, Response, NextFunction } from 'express';
import { CourseModel } from '../../models/Course';
import { StatusCodes } from 'http-status-codes';

export const getCourseForStudentsController = async (
  req: Request<any, any, any, Student.ICourseListQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit } = req.query;
    const courses = await CourseModel.paginate(
      {
        disabled: false,
      },
      {
        customLabels: {
          docs: 'courses',
        },
        populate: {
          path: 'teacher',
          select: {
            _id: 0,
            name: '$name'
          }
        },
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        projection: {
          _id: 0,
          id: '$_id',
          name: 1,
          description: 1,
          chapters: {
            id: 1,
            name: 1,
          },
        },
      }
    );

    return res.status(StatusCodes.OK).json(courses);
  } catch (error) {
    next(error);
  }
};
