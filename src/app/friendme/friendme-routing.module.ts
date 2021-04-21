import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FriendmePage } from './friendme.page';

const routes: Routes = [
  {
    path: '',
    component: FriendmePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendmePageRoutingModule {}
