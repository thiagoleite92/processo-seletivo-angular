import { Pipe, PipeTransform } from '@angular/core';
import { ClinicDTO } from '../dtos/clinic.dto';

@Pipe({ name: 'clinicInfo' })
export class InfoClincPipe implements PipeTransform {
  constructor() {}

  transform(clinicInfo: ClinicDTO): string {
    const formattedCep: string = `${clinicInfo?.address?.cep?.slice(
      0,
      5
    )}-${clinicInfo?.address?.cep?.slice(5)}`;

    return `
            Cep: ${formattedCep}\n
            Cidade: ${clinicInfo?.address?.city}\n
            Endereço: ${clinicInfo?.address?.street}, Nº ${clinicInfo?.address?.number}`;
  }
}
