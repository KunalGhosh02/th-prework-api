import { USER_ROLES } from '../src/utils/enums';

declare global {
  declare interface ITokenPayload {
    name: string;
    email: string;
    role: USER_ROLES;
  }
}
