import { Router } from 'express';
import { createCourseController } from '../../controllers/teachers/create-course.controller';
import { verifyAuth } from '../../middlewares/validators/auth/verify-auth.middleware';
import { USER_ROLES } from '../../utils/enums';
import { validateCreateCourseRequest } from '../../middlewares/validators/teachers/create-course.validator';
import { deleteCourseController } from '../../controllers/teachers/delete-course.controller';
import { validateDeleteCourseRequest } from '../../middlewares/validators/teachers/delete-course.validator';
import { getCourseForTeacherController } from '../../controllers/teachers/get-course.controller';
import { updateCourseController } from '../../controllers/teachers/update-course.controller';
import { validateUpdateCourseRequest } from '../../middlewares/validators/teachers/update-course.validator';
import { sendNotificationToStudents } from '../../controllers/teachers/notification.controller';
import { validateSendNotificationRequest } from '../../middlewares/validators/teachers/notification.validator';

export const teacherRouter = Router();

teacherRouter.use(verifyAuth(USER_ROLES.TEACHER));

teacherRouter
  .route('/course')
  .get(getCourseForTeacherController)
  .put(validateCreateCourseRequest, createCourseController)
  .delete(validateDeleteCourseRequest, deleteCourseController)
  .patch(validateUpdateCourseRequest, updateCourseController);

teacherRouter.route('/notification').post(validateSendNotificationRequest, sendNotificationToStudents);
