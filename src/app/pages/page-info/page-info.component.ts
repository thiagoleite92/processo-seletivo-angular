import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClinicDTO } from 'src/app/dtos/clinic.dto';
import { AddressService } from 'src/app/services/address.service';
import { ToastService } from 'src/app/services/toast.service';

import { ufs } from '../../const/states';

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
    name: new FormControl('', [Validators.required]),
    ownerName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
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
    number: new FormControl('', []),
    complement: new FormControl('', []),
  });

  constructor(
    private activateRoute: ActivatedRoute,
    private addressService: AddressService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const paramRaw = this.activateRoute.snapshot.paramMap.get('id');

    this.clinicId = paramRaw ? parseInt(paramRaw) : null;
    this.buttonLabel = this.clinicId ? 'Salvar' : 'Cadastrar';
  }

  formSubmit() {
    let bodySubmit: ClinicDTO = {
      id: this.clinicId ?? undefined,
      name: this.form.get('name')?.value,
      ownerName: this.form.get('ownerName')?.value,
      phone: this.form.get('phone')?.value,
      cep: this.form.get('cep')?.value,
      uf: this.form.get('uf')?.value,
      city: this.form.get('city')?.value,
      neighborhood: this.form.get('neighborhood')?.value,
      street: this.form.get('street')?.value,
      number: this.form.get('number')?.value,
      complement: this.form.get('complement')?.value,
    };

    console.log(`Informações da clínica para edição: ${bodySubmit.name}`);
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
          this.form.controls['city'].setValue(address?.city);
          this.form.controls['neighborhood'].setValue(address?.district);
          this.form.controls['street'].setValue(address?.address);
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
}
