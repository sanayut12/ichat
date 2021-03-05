import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatfriendPage } from './chatfriend.page';

const routes: Routes = [
  {
    path: '',
    component: ChatfriendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatfriendPageRoutingModule {}
