import { Component, OnInit } from '@angular/core';
import {Plugins} from '@capacitor/core'
const {Storage} = Plugins
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile_info : Object
  constructor() { }

  ngOnInit() {
    // this.profile_info = {
    //   ID_user: "4318556440",
    //   background: "none",
    //   email: "sanayut.t@ku.th",
    //   image: "none",
    //   password: "",
    //   url_background: "https://firebasestorage.googleapis.com/v0/b/ichatdatabase.appspot.com/o/background.jpg?alt=media&token=bebfcba0-3988-459f-8b94-5eadfb95bc5a",
    //   url_image: "https://firebasestorage.googleapis.com/v0/b/ichatdatabase.appspot.com/o/person.png?alt=media&token=dde8bc88-68fa-409e-a344-08bc98bb3c89",
    //   username: "art"
    // }
    console.log("Profile")
    this.getProfile()
  }

  getProfile = async () =>{
   const profile = await Storage.get({key : 'profile'})
   console.log(JSON.parse(profile.value))
    this.profile_info = JSON.parse(profile.value)
  }

  showInfo(){
    console.log(this.profile_info)
  }
}
