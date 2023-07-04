import { Schema, Document, model } from 'mongoose';
import { COLLECTIONS, USER_ROLES } from '../utils/enums';
import { THTeacher } from '../../@types/models/user';

interface ITeacherDoc extends THTeacher, Document {}

const teacherSchema = new Schema<ITeacherDoc>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  organization: { type: String, required: true },
  disabled: { type: Boolean, default: false },
  role: {
    type: String,
    default: USER_ROLES.TEACHER,
  },
});

teacherSchema.pre('find', function () {
  this.where({ disabled: false });
});

teacherSchema.pre('findOne', function () {
  this.where({ disabled: false });
});

export const TeacherModel = model<ITeacherDoc>(
  COLLECTIONS.TEACHERS,
  teacherSchema
);
