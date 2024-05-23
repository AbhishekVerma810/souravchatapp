import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateGroupPagePageRoutingModule } from './create-group-page-routing.module';

import { CreateGroupPagePage } from './create-group-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateGroupPagePageRoutingModule
  ],
  declarations: [CreateGroupPagePage]
})
export class CreateGroupPagePageModule {}
