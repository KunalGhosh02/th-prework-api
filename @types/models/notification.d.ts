import { ObjectId } from 'mongoose';

declare interface INotification {
  for_course: ObjectId;
  student: ObjectId;
  teacher: ObjectId;
  seen: boolean;
  title: string;
  content: string;
}
