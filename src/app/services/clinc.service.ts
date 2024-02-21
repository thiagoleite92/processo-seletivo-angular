import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClincService {

  constructor(private http: HttpClient) { }

  // TODO: Mapear DTOs para retorno do Backend
  getAllClincs(): Observable<any[]> {
    return this.http.get<any>(`${environment.API_URL}/clinc`).pipe((retry(1)));
  }

}
