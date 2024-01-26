import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { IRequestLogin } from '../interfaces/request.login';

@Injectable({ providedIn: 'root' })
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

  login(requestLogin: IRequestLogin): Observable<{ user: IUser }> {
    return this.http.post<{ user: IUser }>(
      `${this.BACKEND_URL}/login`,
      requestLogin,
    );
  }
}
