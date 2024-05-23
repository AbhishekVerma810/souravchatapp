import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home-page',
        loadChildren: () =>
          import('../pages/home-page/home-page.module').then(
            (m) => m.HomePagePageModule
          ),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('../pages/home/home-routing.module').then(
            (m) => m.HomePageRoutingModule
          ),
      },
      {
        path: 'group-page',
        loadChildren: () =>
          import('../pages/group-page/group-page.module').then(
            (m) => m.GroupPagePageModule
          ),
      },
      {
        path: 'calling-page',
        loadChildren: () =>
          import('../pages/calling-page/calling-page.module').then(
            (m) => m.CallingPagePageModule
          ),
      },
      {
        path: 'group-chat-page',
        loadChildren: () =>
          import('../pages/group-chat-page/group-chat-page.module').then(
            (m) => m.GroupChatPagePageModule
          ),
      },
      {
        path: 'user-profile',
        loadChildren: () =>
          import('../pages/user-profile/user-profile.module').then(
            (m) => m.UserProfilePageModule
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo:'apptabs/tabs/home',
    pathMatch:'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}