export interface ClinicDTO {
  id?: number;

  name: string;
  phone: string;
  cnpj: string;

  ownerName: string;

  cep: string;
  uf: string;
  city: string;
  neighborhood: string;
  street: string;
  number?: string;
  complement?: string;
}
