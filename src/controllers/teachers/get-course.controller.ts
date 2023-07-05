import { Request, Response, NextFunction } from 'express';
import { CourseModel } from '../../models/Course';
import { StatusCodes } from 'http-status-codes';

export const getCourseForTeacherController = async (
  req: Request<any, any, any, Teacher.ICourseListQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit } = req.query;
    const courses = await CourseModel.paginate(
      {
        teacher: req.user!.id,
        disabled: false,
      },
      {
        customLabels: {
          docs: 'courses',
        },
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        projection: {
          _id: 0,
          id: '$_id',
          name: 1,
          description: 1,
          chapters: 1,
        },
      }
    );

    return res.status(StatusCodes.OK).json(courses);
  } catch (error) {
    next(error);
  }
};
