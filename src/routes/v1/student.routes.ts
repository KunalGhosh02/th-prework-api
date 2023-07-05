import { Router } from 'express';
import { verifyAuth } from '../../middlewares/validators/auth/verify-auth.middleware';
import { USER_ROLES } from '../../utils/enums';
import { getCourseForStudentsController } from '../../controllers/students/list-courses.controller';
import { studentEnrollmentController } from '../../controllers/students/enroll.controller';
import { validateEnrollmentRequest } from '../../middlewares/validators/students/enrollment.validator';
import { studentProgressController } from '../../controllers/students/progress.controller';
import { studentQuizSubmissionController } from '../../controllers/students/quiz.controller';
import { validateQuizSubmission } from '../../middlewares/validators/students/quiz.validator';
import { validateProgressSubmission } from '../../middlewares/validators/students/progress.validator';
import {
  listNotifications,
  markNotificationAsSeen,
} from '../../controllers/students/notification.controller';
import { validateMarkNotificationSeenRequest } from '../../middlewares/validators/students/notfication.validator';

export const studentRouter = Router();

studentRouter.route('/course').get(getCourseForStudentsController);

studentRouter.use(verifyAuth(USER_ROLES.STUDENT));

studentRouter
  .route('/enroll/:course_id')
  .post(validateEnrollmentRequest, studentEnrollmentController);

studentRouter
  .route('/quiz')
  .post(validateQuizSubmission, studentQuizSubmissionController);

studentRouter
  .route('/progress')
  .post(validateProgressSubmission, studentProgressController);

studentRouter.route('/notification').get(listNotifications);

studentRouter
  .route('/notification/mark-seen')
  .post(validateMarkNotificationSeenRequest, markNotificationAsSeen);
