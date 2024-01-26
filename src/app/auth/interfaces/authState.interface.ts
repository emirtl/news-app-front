import { IUser } from './user.interface';

export interface IAuthState {
  user: IUser;
  isSubmitting: boolean;
}
