import { ObjectId } from 'mongoose';

declare interface THCourse {
  name: string;
  description: string;
  chapters: Array<IChapter>;
  teacher: ObjectId;
  disabled: boolean;
}

declare interface IChapter {
  _id: false;
  id: string;
  name: string;
  contentLink: string;
}
