import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoxpostPageRoutingModule } from './boxpost-routing.module';

import { BoxpostPage } from './boxpost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoxpostPageRoutingModule
  ],
  declarations: [BoxpostPage]
})
export class BoxpostPageModule {}
