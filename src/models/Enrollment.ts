import { Schema, Document, model } from 'mongoose';
import { COLLECTIONS } from '../utils/enums';
import { ICourseProgress, IEnrollment } from '../../@types/models/enrollment';

interface IEnrollmentDoc extends IEnrollment, Document {}

const progressSchema = new Schema<ICourseProgress>({
  _id: false,
  chapterId: { type: String, required: true },
  quizScore: { type: Number, required: true },
  completed: { type: Boolean, default: false },
});

const enrollmentSchema = new Schema<IEnrollmentDoc>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    studentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: COLLECTIONS.STUDENTS,
      index: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: COLLECTIONS.COURSES,
      index: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    progress: { type: [progressSchema], default: [] },
  },
  {
    timestamps: {
      createdAt: 'enrollment_date',
    },
  }
);

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
