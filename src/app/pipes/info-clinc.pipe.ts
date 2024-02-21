import { Pipe, PipeTransform } from '@angular/core';
import { ClincDTO } from '../dtos/clinc.dto';

@Pipe({ name: 'clincInfo' })
export class InfoClincPipe implements PipeTransform{

    constructor(){}

    transform(clincInfo: ClincDTO) : string {
        const formattedCep: string = `${clincInfo.cep.slice(0, 5)}-${clincInfo.cep.slice(5)}`;
        
        return `
            Cep: ${formattedCep}\n
            Cidade: ${clincInfo.city}\n
            Endereço: ${clincInfo.street}, Nº ${clincInfo.number}`;
    }
}