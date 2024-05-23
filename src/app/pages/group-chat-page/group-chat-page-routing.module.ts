import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupChatPagePage } from './group-chat-page.page';

const routes: Routes = [
  {
    path: '',
    component: GroupChatPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupChatPagePageRoutingModule {}
