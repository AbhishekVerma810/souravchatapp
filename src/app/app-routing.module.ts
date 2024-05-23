import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: 'user-profile',
    loadChildren: () =>
      import('./pages/user-profile/user-profile.module').then(
        (m) => m.UserProfilePageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./pages/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  {
    path: 'create-group-page',
    loadChildren: () =>
      import('./pages/create-group-page/create-group-page.module').then(
        (m) => m.CreateGroupPagePageModule
      ),
  },
  {
    path: 'create-group-name',
    loadChildren: () =>
      import('./pages/create-group-name/create-group-name.module').then(
        (m) => m.CreateGroupNamePageModule
      ),
  },
  {
    path: 'chat-page',
    loadChildren: () =>
      import('./pages/chat-page/chat-page.module').then(
        (m) => m.ChatPagePageModule
      ),
  },
  {
    path: 'voice-call-page',
    loadChildren: () =>
      import('./pages/voice-call-page/voice-call-page.module').then(
        (m) => m.VoiceCallPagePageModule
      ),
  },
  {
    path: 'video-call-page',
    loadChildren: () =>
      import('./pages/video-call-page/video-call-page.module').then(
        (m) => m.VideoCallPagePageModule
      ),
  },
  {
    path: 'apptabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'group-chat-page',
    loadChildren: () =>
      import('./pages/group-chat-page/group-chat-page.module').then(
        (m) => m.GroupChatPagePageModule
      ),
  },
  {
    path: '',
    redirectTo: 'apptabs',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}