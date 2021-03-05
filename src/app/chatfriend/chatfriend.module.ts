import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatfriendPageRoutingModule } from './chatfriend-routing.module';

import { ChatfriendPage } from './chatfriend.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatfriendPageRoutingModule
  ],
  declarations: [ChatfriendPage]
})
export class ChatfriendPageModule {}
