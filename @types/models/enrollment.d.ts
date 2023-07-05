import { ObjectId } from "mongoose";

declare interface IEnrollment {
  studentId: ObjectId;
  courseId: ObjectId;
  completed: boolean;
  disabled: boolean;
  progress: Array<ICourseProgress>;
}

declare interface ICourseProgress {
  _id: false,
  chapterId: string;
  quizScore: number;
  completed: boolean;
}
