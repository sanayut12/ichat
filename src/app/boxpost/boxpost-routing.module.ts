import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoxpostPage } from './boxpost.page';

const routes: Routes = [
  {
    path: '',
    component: BoxpostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoxpostPageRoutingModule {}
