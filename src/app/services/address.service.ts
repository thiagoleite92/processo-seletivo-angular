import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { AddressDto } from '../dtos/address.dto';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private url = 'https://ws.apicep.com/cep.json?code=';

  constructor(private http: HttpClient) {}

  getAddressByCep(cep: string): Observable<AddressDto> {
    return this.http.get<AddressDto>(`${this.url}${cep}`).pipe(retry(2));
  }
}
