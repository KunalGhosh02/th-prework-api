import { Request, Response, NextFunction } from 'express';
import { CourseModel } from '../../models/Course';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../../utils/helpers/error.helper';
import { EnrollmentModel } from '../../models/Enrollment';
import { NotificationModel } from '../../models/Notification';

export const sendNotificationToStudents = async (
  req: Request<any, any, Teacher.INotificationCreateRequest>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { course_id, notification } = req.body;

    const course = await CourseModel.findOne({
      _id: course_id,
      teacher: req.user!.id,
    });

    if (!course) {
      throw new CustomError({
        message: 'Course not found',
        statusCode: StatusCodes.NOT_FOUND,
      });
    }

    const studentsIds = await EnrollmentModel.find({
      courseId: course_id,
    }).distinct('studentId');

    await Promise.all(
      studentsIds.map((id) =>
        NotificationModel.create({
          for_course: course_id,
          title: notification.title,
          content: notification.content,
          student: id,
          teacher: req.user!.id,
        })
      )
    );

    return res.status(StatusCodes.OK).json({
      message: 'Notification sent successfully',
      notification_count: studentsIds.length,
    });
  } catch (error) {
    next(error);
  }
};
