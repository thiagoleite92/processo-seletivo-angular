import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClinicDTO } from 'src/app/dtos/clinic.dto';
import { AddressService } from 'src/app/services/address.service';
import { ToastService } from 'src/app/services/toast.service';

import { ufs } from '../../const/states';
import { CustomValidators } from 'src/app/utils/CustomValidators';
import { ClinicService } from 'src/app/services/clinic.service';

@Component({
  selector: 'app-page-info',
  templateUrl: './page-info.component.html',
  styleUrls: ['./page-info.component.scss'],
})
export class PageInfoComponent implements OnInit {
  CEP_LENGTH = 8;

  states = ufs;

  clinicId: number | null = null;
  buttonLabel: string = 'Cadastrar';

  form: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    ownerName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    cnpj: new FormControl('', [
      Validators.required,
      Validators.maxLength(14),
      CustomValidators.isValidCnpj(),
    ]),
    phone: new FormControl('', [
      Validators.required,
      CustomValidators.isValidPhone(),
    ]),
    cep: new FormControl('', [Validators.required]),
    uf: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(2),
    ]),
    city: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    neighborhood: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    street: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    number: new FormControl('', [Validators.maxLength(10)]),
    complement: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
  });

  constructor(
    private activateRoute: ActivatedRoute,
    private addressService: AddressService,
    private toastService: ToastService,
    private clinicService: ClinicService
  ) {}

  ngOnInit(): void {
    const paramRaw = this.activateRoute.snapshot.paramMap.get('id');

    this.clinicId = paramRaw ? parseInt(paramRaw) : null;
    this.buttonLabel = this.clinicId ? 'Salvar' : 'Cadastrar';
  }

  formSubmit() {
    console.log('oi');

    let bodySubmit: ClinicDTO = {
      id: this.clinicId ?? undefined,
      name: this.form.get('name')?.value,
      ownerName: this.form.get('ownerName')?.value,
      cnpj: this.form.get('cnpj')?.value,
      phone: this.form.get('phone')?.value,
      address: {
        cep: this.form.get('cep')?.value,
        uf: this.form.get('uf')?.value,
        city: this.form.get('city')?.value,
        neighborhood: this.form.get('neighborhood')?.value,
        street: this.form.get('street')?.value,
        number: this.form.get('number')?.value,
        complement: this.form.get('complement')?.value,
      },
    };

    this.clinicService.createClinic(bodySubmit).subscribe({
      next: (value: any) => {},
      error: (err: any) => {
        this.toastService.showError(err?.error?.message);
      },
    });
  }

  fetchAddressByCep() {
    const cepNumber = this.form.get('cep')?.value;

    if (cepNumber?.length === this.CEP_LENGTH) {
      this.addressService.getAddressByCep(cepNumber).subscribe((address) => {
        if (!address?.message) {
          this.form.controls['uf'].disable();
          this.form.controls['city'].disable();
          this.form.controls['neighborhood'].disable();
          this.form.controls['street'].disable();
          this.form.controls['uf'].setValue(address?.state);
          this.form.controls['uf'].setErrors(null);

          this.form.controls['city'].setValue(address?.city);
          this.form.controls['city'].setErrors(null);
          this.form.controls['neighborhood'].setValue(address?.district);
          this.form.controls['neighborhood'].setErrors(null);
          this.form.controls['street'].setValue(address?.address);
          this.form.controls['street'].setErrors(null);
        } else {
          this.form.controls['uf'].enable();
          this.form.controls['city'].enable();
          this.form.controls['neighborhood'].enable();
          this.form.controls['street'].enable();
          this.toastService.showError(address?.message!);
        }
      });
    }
  }

  isFormValid(): boolean {
    return !this.form.valid;
  }

  requiredErrorMessage(fieldName: string): boolean {
    return (
      this.form.controls[fieldName]?.touched &&
      this.form.controls[fieldName].hasError('required')
    );
  }

  minLengthErrorMessage(fieldName: string): boolean {
    return (
      this.form.controls[fieldName]?.touched &&
      this.form.controls[fieldName]?.hasError('minLength')
    );
  }

  maxLengthErrorMessage(fieldName: string): boolean {
    return (
      this.form.controls[fieldName]?.touched &&
      this.form.controls[fieldName]?.hasError('maxLength')
    );
  }

  invalidCnpjErrorMessage(): boolean {
    return (
      this.form.controls['cnpj']?.touched &&
      this.form.controls['cnpj']?.hasError('invalidCnpj')
    );
  }

  invalidPhoneErrorMessage(): boolean {
    return (
      this.form.controls['phone']?.touched &&
      this.form.controls['phone']?.hasError('invalidPhone')
    );
  }
}
