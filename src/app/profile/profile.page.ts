import { Component, OnInit } from '@angular/core';
import {Plugins} from '@capacitor/core'
const {Storage} = Plugins
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user_info : Object
  constructor() { }

  ngOnInit() {
    console.log("Profile")
    this.getProfile()
  }

  getProfile = async () =>{
   const profile = await Storage.get({key : 'profile'})
   console.log(JSON.parse(profile.value))
    this.user_info = JSON.parse(profile.value)
  }

  showInfo(){
    console.log(this.user_info)
  }
}
