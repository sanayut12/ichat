import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViwepostPageRoutingModule } from './viwepost-routing.module';

import { ViwepostPage } from './viwepost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViwepostPageRoutingModule
  ],
  declarations: [ViwepostPage]
})
export class ViwepostPageModule {}
