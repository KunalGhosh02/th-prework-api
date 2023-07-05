import { ObjectId } from "mongoose";

declare interface IEnrollment {
  studentId: ObjectId;
  courseId: ObjectId;
  disabled: boolean;
  progress: Array<ICourseProgress>;
}

declare interface ICourseProgress {
  chapterId: string;
  quizScore: number;
  completed: boolean;
}
