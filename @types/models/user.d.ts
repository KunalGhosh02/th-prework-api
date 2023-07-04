import { USER_ROLES } from "../../src/utils/enums";

declare interface THUser {
  name: string;
  email: string;
  password: string;
  disabled: boolean;
  role: USER_ROLES;
}

declare interface THStudent extends THUser {
  role: USER_ROLES.STUDENT;
  school: string;
}

declare interface THTeacher extends THUser {
  organization: string;
  role: USER_ROLES.TEACHER;
}