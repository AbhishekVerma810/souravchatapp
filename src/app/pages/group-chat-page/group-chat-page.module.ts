import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupChatPagePageRoutingModule } from './group-chat-page-routing.module';

import { GroupChatPagePage } from './group-chat-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupChatPagePageRoutingModule
  ],
  declarations: [GroupChatPagePage]
})
export class GroupChatPagePageModule {}
