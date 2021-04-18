import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstPageRoutingModule } from './first-routing.module';

import { FirstPage } from './first.page';
import {LottieModule} from 'ngx-lottie'
import player from 'lottie-web'
export function playerFactory(){
  return player
}
@NgModule({
  imports: [
    LottieModule.forRoot({player:playerFactory}),
    CommonModule,
    FormsModule,
    IonicModule,
    FirstPageRoutingModule
  ],
  declarations: [FirstPage]
})
export class FirstPageModule {}
