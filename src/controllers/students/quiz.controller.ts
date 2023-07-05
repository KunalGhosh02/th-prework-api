import { Request, Response, NextFunction } from 'express';
import { CourseModel } from '../../models/Course';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../../utils/helpers/error.helper';
import { EnrollmentModel } from '../../models/Enrollment';
import { UpdateWriteOpResult, startSession } from 'mongoose';

export const studentQuizSubmissionController = async (
  req: Request<any, any, Student.IQuizSubmitBody>,
  res: Response,
  next: NextFunction
) => {
  const session = await startSession();
  try {
    const { course_id, chapter_id, answers } = req.body;

    const course = await CourseModel.findOne({ _id: course_id });

    if (!course) {
      throw new CustomError({
        message: 'Course not found',
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

    const chapter = course.chapters.find(
      (chapter) => chapter.id.toString() === chapter_id
    );

    if (!chapter) {
      throw new CustomError({
        message: 'Chapter not found',
        statusCode: StatusCodes.NOT_FOUND,
      });
    }

    const chapterProgress = enrollment.progress.find(
      (progress) => progress.chapterId.toString() === chapter_id
    );

    if (chapterProgress?.completed) {
      throw new CustomError({
        message: 'Chapter already completed',
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }

    // Mocking the quiz score calculation: it will checking for answers from other quiz collection where teachers can put the answers in real implementation

    const score = Math.floor(Math.random() * 100);

    let updateResult: UpdateWriteOpResult;

    session.startTransaction();

    if (chapterProgress) {
      updateResult = await EnrollmentModel.updateOne(
        {
          _id: enrollment._id,
          'progress.chapterId': chapter_id,
        },
        {
          $set: {
            'progress.$.quizScore': score,
          },
        },
        {
          session,
        }
      );
    } else {
      updateResult = await EnrollmentModel.updateOne(
        {
          _id: enrollment._id,
        },
        {
          $push: {
            progress: {
              chapterId: chapter_id,
              quizScore: score,
            },
          },
        },
        {
          session,
        }
      );
    }

    if (!updateResult) {
      throw new CustomError({
        message: 'Something went wrong.',
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }

    await session.commitTransaction();

    return res.status(StatusCodes.OK).json({
      message: 'Progress updated successfully.',
      score: score,
    });
  } catch (error) {
    next(error);
  } finally {
    await session.endSession();
  }
};
