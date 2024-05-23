import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoCallPagePageRoutingModule } from './video-call-page-routing.module';

import { VideoCallPagePage } from './video-call-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoCallPagePageRoutingModule
  ],
  declarations: [VideoCallPagePage]
})
export class VideoCallPagePageModule {}
