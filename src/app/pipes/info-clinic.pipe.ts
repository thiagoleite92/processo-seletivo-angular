import { Pipe, PipeTransform } from '@angular/core';
import { ClinicDTO } from '../dtos/clinic.dto';

@Pipe({ name: 'clinicInfo' })
export class InfoClincPipe implements PipeTransform {
  constructor() {}

  transform(clinicInfo: ClinicDTO): string {
    const formattedCep: string = `${clinicInfo?.cep?.slice(
      0,
      5
    )}-${clinicInfo?.cep?.slice(5)}`;

    return `
            Cep: ${formattedCep}\n
            Cidade: ${clinicInfo?.city}\n
            Endereço: ${clinicInfo?.street}, Nº ${clinicInfo?.number}`;
  }
}
