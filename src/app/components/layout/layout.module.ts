import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureAreaComponent } from './secure-area/secure-area.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    SecureAreaComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
  ],
  exports: [
    SecureAreaComponent,
  ]
})
export class LayoutModule { }
