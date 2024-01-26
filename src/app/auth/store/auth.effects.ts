import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { authActions } from './auth.actions';
import { catchError, concatMap, EMPTY, map, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.login),
        concatMap((action) =>
          this.authService.login(action.requestLogin).pipe(
            tap((user) => localStorage.setItem('user', JSON.stringify(user))),
            map(({ user }) => {
              this.router.navigate(['/']);
              return authActions.loginSuccess({ user: user });
            }),
            catchError(() => EMPTY),
          ),
        ),
      ),
    { dispatch: true },
  );

  Logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.logout),
        tap(() => localStorage.removeItem('user')),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}
}
