export interface ClincDTO {
    
    id?: number;
    
    name: string;
    phone: string;

    ownerName: string;

    cep: string;
    uf: string;
    city: string;
    neighborhood: string;
    street: string;
    number?: string;
    complement?: string;


}