import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateGroupNamePage } from './create-group-name.page';

const routes: Routes = [
  {
    path: '',
    component: CreateGroupNamePage
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateGroupNamePageRoutingModule {}
