import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateGroupPagePage } from './create-group-page.page';

const routes: Routes = [
  {
    path: '',
    component: CreateGroupPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateGroupPagePageRoutingModule {}
