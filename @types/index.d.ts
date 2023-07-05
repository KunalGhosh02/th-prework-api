import { USER_ROLES } from '../src/utils/enums';
import { THCourse, IChapter } from './models/course';

declare global {
  declare interface ITokenPayload {
    id: string;
    name: string;
    email: string;
    role: USER_ROLES;
  }

  namespace Student {
    export interface ICourseListQuery {
      page?: string;
      limit?: string;
    }

    export interface IEnrollRequest {
      course_id: string;
    }

    export interface IProgressUpdateBody {
      course_id: string;
      chapter_id: string;
    }

    export interface IQuizSubmitBody {
      course_id: string;
      chapter_id: string;
      answers: number[];
    }
  }

  namespace Teacher {
    export interface ICourseCreateRequest extends THCourse {}

    export interface ICourseDeleteRequest {
      id: string;
    }

    export interface ICourseListQuery {
      page?: string;
      limit?: string;
    }

    export interface ICourseUpdateRequest {
      add_chapter?: boolean;
      id: string;
      new_value: string;
      field_to_update: keyof Teacher.ICourseCreateRequest;
      chapter_id?: string;
      chapter_field?: keyof Pick<IChapter, 'name' | 'contentLink'>;
      chapter_payload?: Pick<IChapter, 'name' | 'contentLink'>;
    }

    export interface INotificationCreateRequest {
      notification: {
        title: string;
        content: string;
      };
      course_id: string;
    }

    export interface IMarkNotificationAsSeenRequest {
      notification_ids: Array<string>;
    }
  }
}
