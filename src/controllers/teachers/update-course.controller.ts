import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IChapter } from '../../../@types/models/course';
import { CourseModel } from '../../models/Course';
import { CustomError } from '../../utils/helpers/error.helper';
import { writeLog } from '../../utils/helpers/log.helper';
import { LOG_LEVEL } from '../../utils/enums';

export const updateCourseController = async (
  req: Request<any, any, Teacher.ICourseUpdateRequest>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      field_to_update,
      id,
      chapter_id,
      new_value,
      chapter_field,
      add_chapter,
      chapter_payload,
    } = req.body;

    const existingCourse = await CourseModel.findOne({
      _id: id,
      teacher: req.user!.id,
    });

    if (!existingCourse) {
      throw new CustomError({
        message: 'Course not found',
        statusCode: StatusCodes.NOT_FOUND,
      });
    }

    let updatePayload: {
      filter: any;
      update: any;
      options?: any;
    };

    if (add_chapter) {
      updatePayload = {
        filter: { _id: id },
        update: { $push: { chapters: chapter_payload } },
      };
    } else {
      switch (field_to_update) {
        case 'chapters':
          if (!chapter_field || !chapter_id) {
            return res
              .status(StatusCodes.BAD_REQUEST)
              .json({ message: 'Incomplete request.' });
          }

          switch (chapter_field) {
            case 'name': {
              updatePayload = {
                filter: { _id: id, 'chapters.id': chapter_id },
                update: { $set: { 'chapters.$.name': new_value } },
              };
              break;
            }
            case 'contentLink': {
              updatePayload = {
                filter: { _id: id, 'chapters.id': chapter_id },
                update: { $set: { 'chapters.$.contentLink': new_value } },
              };
              break;
            }
            default: {
              throw new CustomError({
                message: 'chapter_fields is invalid',
                statusCode: StatusCodes.BAD_REQUEST,
              });
            }
          }
          break;
        case 'description':
          updatePayload = {
            filter: { _id: id },
            update: { $set: { description: new_value } },
          };
          break;
        case 'name':
          const existingCourseWithName = await CourseModel.findOne({
            name: new_value,
          });
          if (existingCourseWithName) {
            throw new CustomError({
              message: 'Course name already exists',
              statusCode: StatusCodes.CONFLICT,
            });
          }
          updatePayload = {
            filter: { _id: id },
            update: { $set: { name: new_value } },
          };
          break;
        default:
          throw new CustomError({
            message: 'field_to_update is invalid',
            statusCode: StatusCodes.BAD_REQUEST,
          });
      }
    }

    writeLog(
      LOG_LEVEL.INFO,
      `updateCourseController, updatePayload: ${JSON.stringify(updatePayload)}`
    );
    const updateResult = await CourseModel.updateOne(
      updatePayload.filter,
      updatePayload.update,
      {
        returnDocument: 'after',
      }
    );

    if (!updateResult.matchedCount) {
      throw new CustomError({
        message: 'Something went wrong.',
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
    return res.status(StatusCodes.OK).json({
      message: 'Course updated successfully',
    });
  } catch (error) {
    next(error);
  }
};
