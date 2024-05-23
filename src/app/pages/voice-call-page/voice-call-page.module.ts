import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoiceCallPagePageRoutingModule } from './voice-call-page-routing.module';

import { VoiceCallPagePage } from './voice-call-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoiceCallPagePageRoutingModule
  ],
  declarations: [VoiceCallPagePage]
})
export class VoiceCallPagePageModule {}
