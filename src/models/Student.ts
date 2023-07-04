import { Schema, Document, model } from 'mongoose';
import { COLLECTIONS, USER_ROLES } from '../utils/enums';
import { THStudent } from '../../@types/models/user';

interface IStudentDoc extends THStudent, Document {}

const studentSchema = new Schema<IStudentDoc>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  school: { type: String, required: true },
  disabled: { type: Boolean, default: false },
  role: {
    type: String,
    default: USER_ROLES.STUDENT,
  },
});

studentSchema.pre('find', function () {
  this.where({ disabled: false });
});

studentSchema.pre('findOne', function () {
  this.where({ disabled: false });
});

export const StudentModel = model<IStudentDoc>(
  COLLECTIONS.STUDENTS,
  studentSchema
);
