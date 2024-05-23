import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CallingPagePageRoutingModule } from './calling-page-routing.module';

import { CallingPagePage } from './calling-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CallingPagePageRoutingModule
  ],
  declarations: [CallingPagePage]
})
export class CallingPagePageModule {}
