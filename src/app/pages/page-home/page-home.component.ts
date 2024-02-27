import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesEnum } from 'src/app/enums/routes.enum';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss'],
})
export class PageHomeComponent implements OnInit {
  constructor(
    private route: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.route.navigateByUrl('/session/list');
    }
  }

  form: FormGroup = new FormGroup({
    identifier: new FormControl('', [
      Validators.required,
      Validators.maxLength(11),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
  });

  login() {
    const { identifier: cpf, password } = this.form.value;

    this.authService.login(cpf, password).subscribe({
      next: (value: any) => {
        this.authService.setToken(value);

        this.route.navigate([RoutesEnum.SESSION_LIST]);
      },
      error: (err: any) => {
        this.toastService.showError(err?.error?.message);
      },
    });
  }

  requiredErrorMessage(fieldName: string): boolean {
    return (
      this.form.controls[fieldName].touched &&
      this.form.controls[fieldName].hasError('required')
    );
  }

  isFormValid(): boolean {
    return !this.form.valid;
  }
}
