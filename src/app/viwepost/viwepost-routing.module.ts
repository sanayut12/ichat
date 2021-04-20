import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViwepostPage } from './viwepost.page';

const routes: Routes = [
  {
    path: '',
    component: ViwepostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViwepostPageRoutingModule {}
