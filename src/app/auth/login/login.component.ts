import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { NgIf } from '@angular/common';
import { OnlyOneErrorPipe } from '../../shared/pipes/only-one-error-pipe';
import { PaginatorModule } from 'primeng/paginator';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Message, SharedModule } from 'primeng/api';
import { createPasswordStrengthValidator } from '../password-strength.validator';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    MessagesModule,
    NgIf,
    OnlyOneErrorPipe,
    PaginatorModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  messages: Message[] | undefined;
  isShow = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authservice: AuthService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['tlemir55@gmail.com', [Validators.required, Validators.email]],
      password: [
        'Narawa@@@@001',
        [
          Validators.required,
          createPasswordStrengthValidator(),
          Validators.minLength(8),
        ],
      ],
    });
  }

  get password() {
    return this.form.controls['password'];
  }

  get email() {
    return this.form.controls['email'];
  }

  onBackToRegisterPage() {
    this.router.navigate(['/auth/register']);
  }

  onLogin() {
    const login = {
      ...this.form.value,
    };
    this.authservice.login(login.email, login.password).subscribe({
      next: (token) => {
        this.form.reset();
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        this.isShow = true;
        this.messages = [
          {
            severity: 'error',
            summary: 'Error',
            detail: err.error.error,
          },
        ];
      },
    });
  }
}
