import { Request, Response, NextFunction } from 'express';
import { CourseModel } from '../../models/Course';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../../utils/helpers/error.helper';
import { EnrollmentModel } from '../../models/Enrollment';
import { startSession } from 'mongoose';

export const studentProgressController = async (
  req: Request<any, any, Student.IProgressUpdateBody>,
  res: Response,
  next: NextFunction
) => {
  const session = await startSession();
  try {
    const { course_id, chapter_id } = req.body;

    const course = await CourseModel.findOne({
      _id: course_id,
    });

    if (!course) {
      throw new CustomError({
        message: 'Course not found',
        statusCode: StatusCodes.NOT_FOUND,
      });
    }

    const chapter = course.chapters.find(
      (chapter) => chapter.id.toString() === chapter_id
    );

    if (!chapter) {
      throw new CustomError({
        message: 'Chapter not found',
        statusCode: StatusCodes.NOT_FOUND,
      });
    }

    const enrollment = await EnrollmentModel.findOne({
      studentId: req.user!.id,
      courseId: course_id,
    });

    if (!enrollment) {
      throw new CustomError({
        message: 'Student not enrolled in this course.',
        statusCode: StatusCodes.FAILED_DEPENDENCY,
      });
    }

    if (enrollment.completed) {
      throw new CustomError({
        message: 'Course already completed.',
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }

    session.startTransaction();

    const updateResult = await EnrollmentModel.findOneAndUpdate(
      {
        _id: enrollment._id,
        'progress.chapterId': chapter_id,
      },
      {
        $set: {
          'progress.$.completed': true,
        },
      },
      {
        session,
        returnDocument: 'after',
      }
    );

    if (!updateResult) {
      throw new CustomError({
        message: 'Progress not updated.',
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }

    if (updateResult?.progress.length === course.chapters.length) {
      const enrollmentUpdateResult = await EnrollmentModel.updateOne(
        {
          _id: enrollment._id,
        },
        {
          $set: {
            completed: true,
          },
        },
        {
          session,
        }
      );

      if (!enrollmentUpdateResult) {
        throw new CustomError({
          message: 'Progress not updated.',
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        });
      }
    }

    await session.commitTransaction();
    return res.status(StatusCodes.OK).json({
      message: 'Progress updated successfully.',
    });
  } catch (error) {
    next(error);
  } finally {
    await session.endSession();
  }
};
