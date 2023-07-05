import { Schema, Document, model, PaginateModel } from 'mongoose';
import { COLLECTIONS, USER_ROLES } from '../utils/enums';
import { INotification } from '../../@types/models/notification';
import paginate from 'mongoose-paginate-v2';

interface INotificationDoc extends INotification, Document {}

const notificationSchema = new Schema<INotificationDoc>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  for_course: { type: Schema.Types.ObjectId, ref: COLLECTIONS.COURSES },
  title: { type: String, required: true },
  content: { type: String, required: true },
  student: {
    type: Schema.Types.ObjectId,
    ref: COLLECTIONS.STUDENTS,
    index: true,
  },
  seen: {
    type: Boolean,
    default: false,
  },
});

notificationSchema.pre('find', function () {
  this.where({ seen: false });
});

notificationSchema.pre('findOne', function () {
  this.where({ seen: false });
});

notificationSchema.plugin(paginate);

export const NotificationModel = model<
  INotificationDoc,
  PaginateModel<INotificationDoc>
>(COLLECTIONS.NOTIFICATIONS, notificationSchema);
