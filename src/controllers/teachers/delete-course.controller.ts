import { Request, Response, NextFunction } from 'express';
import { CourseModel } from '../../models/Course';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../../utils/helpers/error.helper';

export const deleteCourseController = async (
  req: Request<any, any, Teacher.ICourseDeleteRequest>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;

    const course = await CourseModel.findOne({
      _id: id,
      teacher: req.user!.id,
    });

    if (!course) {
      throw new CustomError({
        message: 'Course not found.',
        statusCode: StatusCodes.NOT_FOUND,
      });
    }

    const updateResult = await CourseModel.updateOne(
      { _id: id },
      {
        disabled: true,
      }
    );

    if (!updateResult.modifiedCount) {
      throw new CustomError({
        message: 'Failed to delete course.',
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
    res.status(StatusCodes.OK).json({
      message: 'Course deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
