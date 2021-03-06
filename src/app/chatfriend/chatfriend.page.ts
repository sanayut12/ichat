import { Component, OnInit } from '@angular/core';
import {HttpService} from '../service/http.service'
import {Plugins} from '@capacitor/core'
const {Storage} = Plugins
@Component({
  selector: 'app-chatfriend',
  templateUrl: './chatfriend.page.html',
  styleUrls: ['./chatfriend.page.scss'],
})
export class ChatfriendPage implements OnInit {

  constructor(private http : HttpService) { }
  user_info : Object
  all_user : Object
  keys : any
  friend_info : Object

  user_info_string : String
  friend_info_string : String
  async ngOnInit() {
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
      })
    }

  }

  show(){
    console.log(JSON.stringify(this.user_info))
  }

  showfriend(){
    console.log(JSON.stringify(this.friend_info))
  }

}
