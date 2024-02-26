import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, retry } from 'rxjs';
import { AuthService } from './auth.service';
import { ClinicDTO } from '../dtos/clinic.dto';

@Injectable({
  providedIn: 'root',
})
export class ClinicService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllClincs(): Observable<ClinicDTO[]> {
    return this.http
      .get<ClinicDTO[]>(`${environment.API_URL}/clinic`, {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()} `,
        },
      })
      .pipe(retry(1));
  }

  createClinic(createClinicDTO: ClinicDTO): Observable<void> {
    return this.http
      .post<void>(`${environment.API_URL}/clinic`, createClinicDTO, {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()} `,
        },
      })
      .pipe(retry(1));
  }

  updateClinic(clinicId: number, updateClinicDTO: ClinicDTO): Observable<void> {
    return this.http
      .put<void>(`${environment.API_URL}/clinic/${clinicId}`, updateClinicDTO, {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()} `,
        },
      })
      .pipe(retry(1));
  }

  getClinicById(clinicId: number): Observable<ClinicDTO> {
    return this.http
      .get<ClinicDTO>(`${environment.API_URL}/clinic/${clinicId}`, {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()} `,
        },
      })
      .pipe(retry(1));
  }

  deleteClinicById(clinicId: string): Observable<void> {
    return this.http
      .delete<void>(`${environment.API_URL}/clinic/${clinicId}`, {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()} `,
        },
      })
      .pipe(retry(1));
  }
}
