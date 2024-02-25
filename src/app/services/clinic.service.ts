import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, retry } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ClinicService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  // TODO: Mapear DTOs para retorno do Backend
  getAllClincs(): Observable<any[]> {
    return this.http
      .get<any>(`${environment.API_URL}/clinic`, {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()} `,
        },
      })
      .pipe(retry(1));
  }
}
