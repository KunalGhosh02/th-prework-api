import { USER_ROLES } from '../../src/utils/enums';
import { THUser } from '../models/user';

declare global {
  namespace Express {
    export interface Request {
      user?: ITokenPayload;
    }
  }
}
