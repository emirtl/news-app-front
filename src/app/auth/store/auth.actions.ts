import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IRequestLogin } from '../interfaces/request.login';
import { IUser } from '../interfaces/user.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    login: props<{ requestLogin: IRequestLogin }>(),
    LoginSuccess: props<{ user: IUser }>(),
    Logout: emptyProps(),
  },
});
