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
  }
}
