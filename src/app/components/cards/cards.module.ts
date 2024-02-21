import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultCardComponent } from './default-card/default-card.component';



@NgModule({
  declarations: [
    DefaultCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DefaultCardComponent
  ]
})
export class CardsModule { }
