import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'default-card',
  templateUrl: './default-card.component.html',
  styleUrls: ['./default-card.component.scss']
})
export class DefaultCardComponent {

  @Input() title: string = '';
  @Input() subtitle: string = '';

  @Input() info: string = '';

  @Input() leftButtonLabel: string | null = null;
  @Input() leftButtonDisabled: boolean = false;
  @Output() onClickLeftButton: EventEmitter<any> = new EventEmitter<any>();

  @Input() rightButtonLabel: string | null = null;
  @Input() rightButtonDisabled: boolean = false;
  @Output() onClickRightButton: EventEmitter<any> = new EventEmitter<any>();

}
