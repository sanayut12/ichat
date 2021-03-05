import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children : [
      {
        path : 'post',
        loadChildren : ()=>import('../post/post.module').then(m=>m.PostPageModule)
      },
      {
        path : 'chatfriend',
        loadChildren : ()=>import('../chatfriend/chatfriend.module').then(m=>m.ChatfriendPageModule)
      },
      {
        path : 'profile',
        loadChildren : ()=>import('../profile/profile.module').then(m=>m.ProfilePageModule)
      },
      {
        path : 'addfriend',
        loadChildren : ()=>import('../addfriend/addfriend.module').then(m=>m.AddfriendPageModule)
      },
      {
        path : 'notification',
        loadChildren : ()=>import('../notification/notification.module').then(m=>m.NotificationPageModule)
      },
      {
        path: '',
        redirectTo: '/main/post',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/main/post',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
