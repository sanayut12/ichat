import { Component, OnInit } from '@angular/core';
import {Plugins} from '@capacitor/core'
const {Storage} = Plugins
@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getProfile = async () => {
   const profile = await Storage.get({key:'profile'})
   console.log(JSON.parse(profile.value))
  }
}
