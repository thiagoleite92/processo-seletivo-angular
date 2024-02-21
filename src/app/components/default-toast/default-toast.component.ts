import { Component, TemplateRef } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'default-toast',
	templateUrl: './default-toast.component.html',
	styleUrls: ['./default-toast.component.scss'],
	host: { '[class.ngb-toasts]': 'true',  }
})
export class DefaultToastComponent {
	constructor(public toastService: ToastService) { }

	isTemplate(toast: any) { return toast.textOrTpl instanceof TemplateRef; }
}