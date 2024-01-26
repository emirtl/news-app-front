import { createFeature, createReducer, on } from '@ngrx/store';
import { IAuthState } from '../interfaces/authState.interface';
import { authActions } from './auth.actions';

export const initialAuthState: IAuthState = {
  user: undefined,
  isSubmitting: false,
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialAuthState,
    on(authActions.loginSuccess, (state, action) => ({
      ...state,
      user: action.user,
      isSubmitting: true,
    })),
    on(authActions.logout, (state) => ({
      ...state,
      user: undefined,
      isSubmitting: false,
    })),
  ),
});
export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectAuthState,
  selectUser,
  selectIsSubmitting,
} = authFeature;
