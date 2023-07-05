import { Schema, Document, model, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

import { COLLECTIONS } from '../utils/enums';
import { THCourse, IChapter } from '../../@types/models/course';
import { randomUUID } from 'crypto';

interface ICourseDoc extends THCourse, Document {}

const chapterSchema = new Schema<IChapter>({
  _id: false,
  id: { type: String, required: true, index: true, unique: true },
  name: { type: String, required: true },
  contentLink: { type: String, required: true },
});

const courseSchema = new Schema<ICourseDoc>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  chapters: {
    type: [chapterSchema],
    required: true,
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: COLLECTIONS.TEACHERS,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

courseSchema.plugin(paginate);

courseSchema.pre('find', function () {
  this.where({ disabled: false });
});

courseSchema.pre('findOne', function () {
  this.where({ disabled: false });
});

export const CourseModel = model<ICourseDoc, PaginateModel<ICourseDoc>>(COLLECTIONS.COURSES, courseSchema);

CourseModel.find