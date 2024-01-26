import { Component, OnInit } from '@angular/core';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { Store } from '@ngrx/store';
import { IAuthState } from '../../auth/interfaces/authState.interface';
import { authActions } from '../../auth/store/auth.actions';
import { Observable } from 'rxjs';
import { IUser } from '../../auth/interfaces/user.interface';
import { selectUser } from '../../auth/store/auth.reducer';
import { AsyncPipe, NgIf } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    SplitButtonModule,
    ToolbarModule,
    InputTextModule,
    MenubarModule,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  user$: Observable<IUser>;
  constructor(private store: Store<IAuthState>) {}
  ngOnInit() {
    this.user$ = this.store.select(selectUser);
  }

  logout() {
    this.store.dispatch(authActions.logout());
  }
}
