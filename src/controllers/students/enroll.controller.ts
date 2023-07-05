import { Request, Response, NextFunction } from 'express';
import { CourseModel } from '../../models/Course';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../../utils/helpers/error.helper';
import { EnrollmentModel } from '../../models/Enrollment';

export const studentEnrollmentController = async (
  req: Request<Student.IEnrollRequest>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { course_id } = req.params;

    const course = await CourseModel.findOne({
      _id: course_id,
    });

    if (!course) {
      throw new CustomError({
        message: 'Course with given ID not found.',
        statusCode: StatusCodes.NOT_FOUND,
      });
    }

    const existingEnrollment = await EnrollmentModel.findOne({
      studentId: req.user!.id,
      courseId: course_id,
    });

    if (existingEnrollment) {
      throw new CustomError({
        message: 'Student already enrolled in this course.',
        statusCode: StatusCodes.CONFLICT,
      });
    }

    const enrollment = await EnrollmentModel.create({
        studentId: req.user!.id,
        courseId: course_id,
    })

    if (!enrollment) {
      throw new CustomError({
        message: 'Something went wrong.',
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }

    return res.status(StatusCodes.OK).json({
        message: 'Enrolled successfully.',
        enrollment_id: enrollment._id,
    });
  } catch (error) {
    next(error);
  }
};
