import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FriendmePageRoutingModule } from './friendme-routing.module';

import { FriendmePage } from './friendme.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FriendmePageRoutingModule
  ],
  declarations: [FriendmePage]
})
export class FriendmePageModule {}
