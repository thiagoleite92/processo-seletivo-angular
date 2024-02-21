import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesEnum } from 'src/app/enums/routes.enum';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss']
})
export class PageHomeComponent {

  constructor(private toastService: ToastService, private route: Router){}

  form: FormGroup = new FormGroup({
    identifier: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    this.route.navigate([RoutesEnum.SESSION_LIST]);
  }

  teste() {
    this.toastService.showError('Erro');
  }

  openToEdit(id: number) {
    console.log(`ID: ${id}`);
  }

}
