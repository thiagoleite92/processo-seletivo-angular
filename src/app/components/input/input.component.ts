import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() public name = '';
  @Input() public label = '';
  @Input() public placeholder = '';
  @Input() public type = 'text';
  @Input() public fieldReference?: AbstractControl;
  @Input() public errorMessage? = '';
  @Input() public required = false;
  @Input() public mask? = '';
  @Input() public isText: boolean = false;
  @Input() public isSelect: boolean = false;
  @Input() public id: string = '';
  @Input() public options?: Array<string> = [];
  @Output() public fetchCepAddress: EventEmitter<boolean> = new EventEmitter();
  @Input() public isDisabled: boolean = false;

  isInvalid(reference: AbstractControl): boolean {
    return reference?.invalid && (reference?.touched || reference?.dirty);
  }

  onChange(event: any) {
    this.fieldReference?.setValue(event);
    this.fieldReference?.markAsDirty();
    if (this.label === 'CEP' && this.fieldReference?.value?.length === 8) {
      this.fetchCepAddress.emit();
    }
  }
}
