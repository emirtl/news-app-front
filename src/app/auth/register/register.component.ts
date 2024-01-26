import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { OnlyOneErrorPipe } from '../../shared/pipes/only-one-error-pipe';
import { createPasswordStrengthValidator } from '../password-strength.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    PasswordModule,
    DividerModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    MessagesModule,
    CommonModule,
    OnlyOneErrorPipe,
  ],
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  messages: Message[] | undefined;
  isShow = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSerice: AuthService,
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['tlemir55', [Validators.required, Validators.minLength(6)]],
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

  get username() {
    return this.form.controls['username'];
  }
  onRegister() {
    if (this.form.invalid) {
      return;
    }
    const registerOps = {
      ...this.form.value,
    };

    this.authSerice
      .register(registerOps.username, registerOps.email, registerOps.password)
      .subscribe({
        next: () => {
          this.form.reset();
          this.isShow = true;
          this.messages = [
            {
              severity: 'success',
              summary: 'Success',
              detail: 'your registration was successfull',
            },
          ];
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

  onBackToLoginPage() {
    this.router.navigate(['/auth/login']);
  }
}
