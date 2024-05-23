import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CallingPagePage } from './calling-page.page';

const routes: Routes = [
  {
    path: '',
    component: CallingPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CallingPagePageRoutingModule {}
