import { Router } from 'express';
import { verifyAuth } from '../../middlewares/validators/auth/verify-auth.middleware';
import { USER_ROLES } from '../../utils/enums';
import { getCourseForStudentsController } from '../../controllers/students/list-courses.controller';
import { studentEnrollmentController } from '../../controllers/students/enroll.controller';
import { validateEnrollmentRequest } from '../../middlewares/validators/students/enrollment.validator';

export const studentRouter = Router();

studentRouter.route('/course').get(getCourseForStudentsController);

studentRouter.use(verifyAuth(USER_ROLES.STUDENT));

studentRouter.route('/enroll/:course_id').post(validateEnrollmentRequest, studentEnrollmentController);
