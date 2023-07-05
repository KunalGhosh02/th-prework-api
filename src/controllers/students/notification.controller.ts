import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { EnrollmentModel } from '../../models/Enrollment';
import { NotificationModel } from '../../models/Notification';

export const listNotifications = async (
  req: Request<any, any, Teacher.INotificationCreateRequest>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit } = req.query;

    const enrollments = await EnrollmentModel.find({
      studentId: req.user!.id,
    }).distinct('courseId');

    const notifications = await NotificationModel.paginate(
      {
        for_course: {
          $in: enrollments,
        },
        student: req.user!.id,
        seen: false,
      },
      {
        customLabels: {
          docs: 'notifications',
        },
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        populate: {
          path: 'for_course',
          select: {
            _id: 0,
            name: 1,
          },
        },
        projection: {
          _id: 0,
          id: '$_id',
          title: 1,
          content: 1,
          student: 1,
        },
      }
    );

    return res.status(StatusCodes.OK).json(notifications);
  } catch (error) {
    next(error);
  }
};

export const markNotificationAsSeen = async (
  req: Request<any, any, Teacher.IMarkNotificationAsSeenRequest>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { notification_ids } = req.body;

    const result = await NotificationModel.updateMany(
      {
        _id: {
          $in: notification_ids,
        },
        student: req.user!.id,
        seen: false,
      },
      {
        seen: true,
      }
    );

    if (!result.modifiedCount) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Notification not found',
      });
    }

    return res.status(StatusCodes.OK).json({
      message: 'Notification marked as seen',
    });
  } catch (error) {
    next(error);
  }
};
