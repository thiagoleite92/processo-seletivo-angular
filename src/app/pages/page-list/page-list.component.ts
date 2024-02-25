import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClinicDTO } from 'src/app/dtos/clinic.dto';
import { RoutesEnum } from 'src/app/enums/routes.enum';
import { ClinicService } from 'src/app/services/clinic.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
})
export class PageListComponent implements OnInit {
  clinics: ClinicDTO[] = [];

  constructor(
    private clinicService: ClinicService,
    private toastService: ToastService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.clinicService.getAllClincs().subscribe({
      next: (value: any[]) => {
        this.clinics = value?.map((clinic) => ({
          ...clinic,
          ...clinic.address,
        }));
      },
      error: (err: any) => {
        this.toastService.showError(`Erro ao resgatar listagem de clínicas`);
      },
    });
  }

  redirectNewClinc() {
    this.route.navigate([RoutesEnum.SESSION_NEW_CLINC]);
  }

  edit(clincId: any) {
    console.log(`Id da clínica: ${clincId}`);
    this.route.navigate([`${RoutesEnum.SESSION_CLINC_INFO}/${clincId}`]);
  }

  delete(clincId: any) {
    console.log(`Id da clínica: ${clincId} para deletar`);
  }
}
