import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoCallPagePage } from './video-call-page.page';

const routes: Routes = [
  {
    path: '',
    component: VideoCallPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoCallPagePageRoutingModule {}
