import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // TODO: Mapear DTOs para retorno do Backend
  login(cpf: string, password: string): Observable<any[]> {
    return this.http
      .post<any>(`${environment.API_URL}/auth/login`, {
        cpf,
        password,
      })
      .pipe(retry(1));
  }

  setToken(token: { accessToken: string }): void {
    const { accessToken } = token;

    localStorage.setItem('access_token', accessToken);
    return;
  }

  getToken(): string | null {
    const token = localStorage.getItem('access_token') ?? null;

    return token;
  }

  isLoggedIn(): boolean | null {
    return !!localStorage.getItem('access_token');
  }
}
