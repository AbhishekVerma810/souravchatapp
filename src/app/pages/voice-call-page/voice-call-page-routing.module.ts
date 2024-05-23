import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoiceCallPagePage } from './voice-call-page.page';

const routes: Routes = [
  {
    path: '',
    component: VoiceCallPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoiceCallPagePageRoutingModule {}
