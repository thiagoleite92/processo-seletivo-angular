import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClinicDTO } from 'src/app/dtos/clinic.dto';
import { RoutesEnum } from 'src/app/enums/routes.enum';
import { AuthService } from 'src/app/services/auth.service';
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
    private route: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      return;
    }

    this.clinicService.getAllClincs().subscribe({
      next: (value: any[]) => {
        console.log(value);
        this.clinics = value?.map((clinic) => ({
          ...clinic,
          address: { ...clinic.address },
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

  edit(clinicId: any) {
    console.log(`Id da clínica: ${clinicId}`);
    this.route.navigate([`${RoutesEnum.SESSION_CLINC_INFO}/${clinicId}`]);
  }

  delete(clincId: any) {
    console.log(`Id da clínica: ${clincId} para deletar`);
  }
}
