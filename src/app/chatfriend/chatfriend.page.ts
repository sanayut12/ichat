import { Component, OnInit } from '@angular/core';
import {HttpService} from '../service/http.service'
import {Plugins} from '@capacitor/core'
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

const {Storage} = Plugins
@Component({
  selector: 'app-chatfriend',
  templateUrl: './chatfriend.page.html',
  styleUrls: ['./chatfriend.page.scss'],
})
export class ChatfriendPage implements OnInit {

  constructor(
    private http : HttpService,
    private nav : NavController,
    private route : ActivatedRoute 
    ) { }
  user_info : Object
  all_user : Object
  keys : any
  friend_info : any
  status_friend_info : Boolean
  user_info_string : String
  friend_info_string : String
  async ngOnInit() {
    this.status_friend_info = false
    this.friend_info = []
    this.user_info = []
    await this.getProfile()
    await this.getfriend()
  }

  getProfile = async () =>{
    const profile = await Storage.get({key : 'profile'})
    this.user_info = JSON.parse(profile.value)
  }

  getfriend = async () =>{
    if (String(this.user_info) != ""){
      this.http.onAllfriendMe(this.user_info['ID_user']).subscribe((res)=>{
        console.log(res)
        this.friend_info = res
        if (this.friend_info.length == 0){
          this.status_friend_info = false
        }else{
          this.status_friend_info = true
        }
      })
    }

  }

  show(){
    console.log(JSON.stringify(this.user_info))
  }

  showfriend(){
    console.log(JSON.stringify(this.friend_info))
  }

  gotoChat(key_friend : String, url_image_friend : String,username_friend : String ,ID_friend :String){
    this.nav.navigateForward(['/chat',{
      key_friend :key_friend,
      url_image_friend :url_image_friend,
      username_friend :username_friend, 
      ID_friend :ID_friend,

      ID_me : this.user_info['ID_user'],
      username_me : this.user_info['username'],
      url_image_me : this.user_info['url_image'],
    }])
  } 

}
