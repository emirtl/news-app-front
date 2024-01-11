import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class AuthService {
  private BACKEND_URL = 'http://localhost:9000/api/v1/auth';

  constructor(private http: HttpClient) {}

  register(
    username: string,
    email: string,
    password: string,
  ): Observable<IUser> {
    return this.http.post<IUser>(`${this.BACKEND_URL}/register`, {
      username,
      email,
      password,
    });
  }

  login(email: string, password: String): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.BACKEND_URL}/login`, {
      email,
      password,
    });
  }
}
