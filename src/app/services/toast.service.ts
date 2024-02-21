import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  showError(text: string) {
    this.show(`${text}`, {
      classname: 'bg-danger text-light',
      delay: 2000 ,
      autohide: true
    });
  }

  showSuccess(text: string) {
    this.show(`${text}`, {
      classname: 'bg-success text-light',
      delay: 2000 ,
      autohide: true
    });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts = [];
  }

}