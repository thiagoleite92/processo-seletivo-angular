import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-secure-area',
  templateUrl: './secure-area.component.html',
  styleUrls: ['./secure-area.component.scss'],
})
export class SecureAreaComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: Router,
    private toastService: ToastService
  ) {}
  loggedUser = 'Usuário logado';

  logout(): void {
    localStorage.clear();
    this.route.navigateByUrl('/home');
  }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.route.navigate(['/home']);
      this.toastService.showError('Faça login para continuar');
    }
  }
}
