import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { Platform, ActionSheetController, NavController } from '@ionic/angular';

import {HttpService} from './../service/http.service'
const {Storage,Camera} = Plugins

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user_image_profile : String
  user_image_background : String
  user_info : Object
  status : boolean
  feeding : any
  countPost : Number
  friend_list : any
  countFriend : Number

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  constructor(
    private http: HttpService, 
    private plt:Platform,
    private actionSheetCtrl: ActionSheetController,
    private nav : NavController
    ) { }


  ngOnInit() {
    this.countPost = 0
    this.countFriend = 0
    this.status = false
    this.user_image_profile = ""
    console.log("Profile")
    this.getProfile()
  }

  async getfriendInteractive(){
    await this.http.onGetfriendInteractive(this.user_info["ID_user"]).subscribe((res)=>{
      this.friend_list = res
      this.countFriend = this.friend_list.length
    })
  }

  getProfile = async () =>{
    const profile = await Storage.get({key : 'profile'})
    console.log(JSON.parse(profile.value))
    this.user_info = JSON.parse(profile.value)
    await this.ongetPost()
    await this.getfriendInteractive()
  }

  
  setProfileInLocal = async () =>{
    console.log("update local storage")
    var body = JSON.stringify(this.user_info)
    console.log(body)
    await Storage.set({
      key : 'profile',
      value : body
    })
  }


  showInfo(){
    console.log(this.user_info)
  }

  async selectImageSource() {
    const buttons = [
      {
        text: 'Take Photo',
        icon: 'camera',
        handler: () => {
          this.addImage(CameraSource.Camera);
        }
      },
      {
        text: 'Choose From Photos Photo',
        icon: 'image',
        handler: () => {
          this.addImage(CameraSource.Photos);
        }
      }
    ];
 
    // Only allow file selection inside a browser
    if (!this.plt.is('hybrid')) {
      buttons.push({
        text: 'Choose a File',
        icon: 'attach',
        handler: () => {
          this.fileInput.nativeElement.click();
        }
      });
    }
 
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      buttons
    });
    await actionSheet.present();
  }

  async addImage(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source
    });
    console.log(typeof image.base64String)
    this.user_image_profile = image.base64String
    await this.onchange_image_profile(this.user_image_profile)
    // this.convertimage ="data:image/jpeg;base64,"+ this.imagePost
  }

  async onchange_image_profile(image) {

    await this.http.onchangeImageProfile(this.user_info["ID_user"],image).subscribe(async (res)=>{
      // return res['image']
      this.user_info["url_image"] = res['image']
      console.log(res['image'])
      await this.setProfileInLocal()
      // console.log(this.user_info)
    })
    // console.log(this.user_info)
    
  }

  async selectImageSource2() {
    const buttons = [
      {
        text: 'Take Photo',
        icon: 'camera',
        handler: () => {
          this.addImage2(CameraSource.Camera);
        }
      },
      {
        text: 'Choose From Photos Photo',
        icon: 'image',
        handler: () => {
          this.addImage2(CameraSource.Photos);
        }
      }
    ];
 
    // Only allow file selection inside a browser
    if (!this.plt.is('hybrid')) {
      buttons.push({
        text: 'Choose a File',
        icon: 'attach',
        handler: () => {
          this.fileInput.nativeElement.click();
        }
      });
    }
 
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      buttons
    });
    await actionSheet.present();
  }

  async addImage2(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source
    });
    console.log(typeof image.base64String)
    this.user_image_background = image.base64String
    await this.onchange_image_background(this.user_image_background)
    // this.convertimage ="data:image/jpeg;base64,"+ this.imagePost
  }

  async onchange_image_background(image) {

    await this.http.onchangeImageBackground(this.user_info["ID_user"],image).subscribe(async (res)=>{
      // return res['image']
      this.user_info["url_background"] = res['imagebackground']
      console.log(res['imagebackground'])
      await this.setProfileInLocal()
      // console.log(this.user_info)
    })
    
    // console.log(this.user_info)
    
  }

  async ongetPost(){
    await this.http.ongetPostMe(this.user_info["ID_user"]).subscribe((res)=>{
      this.feeding = res
      if (res == null){
        this.status = false
        this.countPost = 0
      }else{
        this.status = true
        this.countPost = this.feeding.length
      }
      console.log(this.feeding) 
      // for (let i in this.feeding){
      //   console.log(this.feeding[i])
      // }
    })
  }

  openOnePost(item){
    console.log(item)
    this.nav.navigateForward(['/viwepost',{
      ID_post: item['ID_post'],
      ID_user: this.user_info['ID_user'],
      date: item['date'],
      image_profile: this.user_info['url_image'],
      message: item['message'],
      name:this.user_info['username'],
      url: item['url']
    }])
  }

  viewAllFriend(){
    this.nav.navigateForward('/friendme')
  }


}
