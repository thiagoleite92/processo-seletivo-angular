import { ClinicDTO } from './clinic.dto';

export interface FetchClinicsDTO {
  data: ClinicDTO[];
  currentPage: number;
  nextPage: boolean;
  count: number;
  totalPages: number;
  totalItems: number;
}
