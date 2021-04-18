import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { Platform, ActionSheetController } from '@ionic/angular';

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
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  constructor(private http: HttpService, private plt:Platform,private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    this.user_image_profile = ""
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

    await this.http.onchangeImageProfile(this.user_info["ID_user"],image).subscribe((res)=>{
      // return res['image']
      this.user_info["url_image"] = res['image']
      console.log(res['image'])
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

    await this.http.onchangeImageBackground(this.user_info["ID_user"],image).subscribe((res)=>{
      // return res['image']
      this.user_info["url_background"] = res['imagebackground']
      console.log(res['imagebackground'])
      // console.log(this.user_info)
    })
    // console.log(this.user_info)
    
  }
}
