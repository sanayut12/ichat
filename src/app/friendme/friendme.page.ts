import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { NavController } from '@ionic/angular';
import {HttpService} from './../service/http.service'
const {Storage} = Plugins
@Component({
  selector: 'app-friendme',
  templateUrl: './friendme.page.html',
  styleUrls: ['./friendme.page.scss'],
})
export class FriendmePage implements OnInit {
  friend_list : any
  user_info : Object
  constructor(
    private http: HttpService, 
    private nav : NavController,
    private route : ActivatedRoute
    ) { 
      this.friend_list = this.route.snapshot.paramMap.get('friend_list')
    }

  async ngOnInit() {
    await this.getProfile()
  }

  getProfile = async () =>{
    const profile = await Storage.get({key : 'profile'})
    console.log(JSON.parse(profile.value))
    this.user_info = JSON.parse(profile.value)
    this.getfriendInteractive()
    // await this.getfriendInteractive()
  }


  ckeck(){
      console.log(this.friend_list)
  }
  
  async getfriendInteractive(){
    await this.http.onGetfriendInteractive(this.user_info["ID_user"]).subscribe((res)=>{
      this.friend_list = res
    })
  }

  back(){
    this.nav.back()
  }

}
