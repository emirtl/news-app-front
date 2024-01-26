import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { OnlyOneErrorPipe } from './shared/pipes/only-one-error-pipe';
import { Store } from '@ngrx/store';
import { IAuthState } from './auth/interfaces/authState.interface';
import { Observable } from 'rxjs';
import { authActions } from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    HomeComponent,
    OnlyOneErrorPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  auth$: Observable<IAuthState>;
  constructor(
    // private store: Store<IAuthState>,
    @Inject(Store) private store: Store<IAuthState>,
    @Inject(DOCUMENT) private document: Document,
  ) {
    const localStorage = document.defaultView?.localStorage;
    if (localStorage) {
      const user = localStorage.getItem('user');
      if (user) {
        this.store.dispatch(
          authActions.loginSuccess({ user: JSON.parse(user) }),
        );
      }
    }
  }
  ngOnInit(): void {}
}
