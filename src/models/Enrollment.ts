import { Schema, Document, model } from 'mongoose';
import { COLLECTIONS } from '../utils/enums';
import { ICourseProgress, IEnrollment } from '../../@types/models/enrollment';

interface IEnrollmentDoc extends IEnrollment, Document {}

const progressSchema = new Schema<ICourseProgress>({
  chapterId: { type: String, required: true },
  quizScore: { type: Number, required: true },
  completed: { type: Boolean, required: true },
});

const enrollmentSchema = new Schema<IEnrollmentDoc>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  studentId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: COLLECTIONS.STUDENTS,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: COLLECTIONS.COURSES,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  progress: { type: [progressSchema], default: [] },
});

enrollmentSchema.pre('find', function () {
  this.where({ disabled: false });
});

enrollmentSchema.pre('findOne', function () {
  this.where({ disabled: false });
});

export const EnrollmentModel = model<IEnrollmentDoc>(
  COLLECTIONS.ENROLLMENTS,
  enrollmentSchema
);
