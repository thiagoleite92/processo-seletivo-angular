import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClinicDTO } from 'src/app/dtos/clinic.dto';
import { FilterDTO } from 'src/app/dtos/filter.dto';
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
  showModal = false;
  clinicToDeletion = '';
  isFiltered = false;

  currentPage = 1;
  totalPages = 1;
  nextPage = false;
  count = 0;
  totalItems: number = 0;

  form: FormGroup = new FormGroup({
    search: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    page: new FormControl(1, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    perPage: new FormControl(8, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
  });

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
    let filter: FilterDTO = {
      search: this.form.get('search')?.value,
      perPage: this.form.get('perPage')?.value,
      page: this.form.get('page')?.value,
    };

    this.clinicService.getAllClincs(filter).subscribe({
      next: ({
        data,
        count,
        currentPage,
        nextPage,
        totalPages,
        totalItems,
      }) => {
        this.clinics = data?.map((clinic) => ({
          ...clinic,
          address: { ...clinic?.address },
        }));

        this.currentPage = currentPage;
        this.nextPage = nextPage;
        this.count = count;
        this.totalPages = totalPages;
        this.totalItems = totalItems;
      },

      error: (err: any) => {
        this.toastService.showError(`Erro ao resgatar listagem de clínicas`);
      },
    });
  }

  filterSubmit() {
    const filter = this.mountFilter();

    this.clinicService.getAllClincs(filter).subscribe({
      next: ({ data, count, currentPage, nextPage, totalPages }) => {
        this.clinics = data?.map((clinic) => ({
          ...clinic,
          address: { ...clinic?.address },
        }));

        this.currentPage = currentPage;
        this.form.controls['page'].setValue(currentPage);
        this.nextPage = nextPage;
        this.count = count;
        this.totalPages = totalPages;
        this.isFiltered = true;
      },

      error: (err: any) => {
        this.toastService.showError(`Erro ao resgatar listagem de clínicas`);
      },
    });
  }

  mountFilter(): FilterDTO {
    return {
      search: this.form.get('search')?.value,
      perPage: this.form.get('perPage')?.value,
      page: this.form.get('page')?.value,
    };
  }

  clearFilter() {
    let filter: FilterDTO = {
      search: '',
      perPage: 8,
      page: 1,
    };

    this.form.controls['search'].setValue('');

    this.clinicService.getAllClincs(filter).subscribe({
      next: ({ data, count, currentPage, nextPage, totalPages }) => {
        this.clinics = data?.map((clinic) => ({
          ...clinic,
          address: { ...clinic?.address },
        }));

        this.currentPage = currentPage;
        this.form.controls['page'].setValue(currentPage);
        this.nextPage = nextPage;
        this.count = count;
        this.totalPages = totalPages;
        this.isFiltered = false;
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
    this.route.navigate([`${RoutesEnum.SESSION_CLINC_INFO}/${clinicId}`]);
  }

  delete(clinicId: string) {
    this.showModal = true;
    this.clinicToDeletion = clinicId;
  }

  closeModalAndBackToList() {
    this.showModal = false;
    this.clinicToDeletion = '';
  }

  updateClinicList() {
    const clinicDeletedIndex = this.clinics.findIndex(
      (clinic) => clinic?.id === Number(this.clinicToDeletion)
    );

    if (clinicDeletedIndex >= 0) {
      this.clinics.splice(clinicDeletedIndex, 1);
    }
  }

  confirmClinicDeletion() {
    this.clinicService.deleteClinicById(this.clinicToDeletion).subscribe({
      next: () => {
        this.updateClinicList();
        this.showModal = false;
        this.toastService.showSuccess('Clínica removida');
      },
      error: () => {
        this.showModal = false;
        this.toastService.showError(
          'Ocorreu um erro. Tente novamente mais tarde'
        );
      },
    });
  }

  enterSubmit(event: any) {
    console.log(event);
  }

  isFormValid(): boolean {
    return this.form.get('search')?.value?.length >= 3;
  }

  fetchNextPage() {
    if (!this.nextPage) {
      return;
    }

    const filter = this.mountFilter();

    filter.page! += 1;

    this.clinicService.getAllClincs(filter).subscribe({
      next: ({ data, count, currentPage, nextPage, totalPages }) => {
        console.log(data, count, currentPage, nextPage, totalPages);
        this.clinics = data?.map((clinic) => ({
          ...clinic,
          address: { ...clinic?.address },
        }));

        this.isFiltered = false;

        this.currentPage = currentPage;
        this.form.controls['page'].setValue(currentPage);
        this.nextPage = nextPage;
        this.count = count;
        this.totalPages = totalPages;
      },
      error: (err: any) => {
        this.toastService.showError(`Erro ao resgatar listagem de clínicas`);
      },
    });
  }

  fetchPreviousPage() {
    if (this.currentPage === 1) {
      return;
    }

    const filter = this.mountFilter();

    filter.page! -= 1;

    this.clinicService.getAllClincs(filter).subscribe({
      next: ({ data, count, currentPage, nextPage, totalPages }) => {
        this.clinics = data?.map((clinic) => ({
          ...clinic,
          address: { ...clinic?.address },
        }));
        this.isFiltered = false;

        this.currentPage = currentPage;
        this.form.controls['page'].setValue(currentPage);
        this.nextPage = nextPage;
        this.count = count;
        this.totalPages = totalPages;
      },
      error: (err: any) => {
        this.toastService.showError(`Erro ao resgatar listagem de clínicas`);
      },
    });
  }
}
