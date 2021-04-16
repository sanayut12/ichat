import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { Platform, ActionSheetController } from '@ionic/angular';
import {HttpService} from './../service/http.service'
const {Storage,Camera} = Plugins
@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  user_profile : Object
  feeding : Object
  feeding2:any
  index_feeding : any
  message  :String
  postStatus : boolean
  imagePost : String
  convertimage : String
  test_feed : String
  bufferDate : Date
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  constructor(private http: HttpService, private plt:Platform,private actionSheetCtrl: ActionSheetController) { }

  async ngOnInit() {
    // this.bufferDate = ""
    this.test_feed = ""
    this.feeding2 = []
    this.index_feeding = []
    this.message = ""
    this.postStatus = true;
    this.imagePost = ""
    this.convertimage = "https://image.flaticon.com/icons/png/512/12/12313.png"
    await this.getProfile()
    await this.onFeeding()
  }
  poststatusClick(){
    this.postStatus = false;
  }
  poststatusClickCancel(){
    this.postStatus = true;
    this.convertimage = "https://image.flaticon.com/icons/png/512/12/12313.png"
  }

  getProfile = async () => {
   const profile = await Storage.get({key:'profile'})
   console.log(JSON.parse(profile.value))
   this.user_profile = JSON.parse(profile.value)
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
    this.imagePost = image.base64String
    this.convertimage ="data:image/jpeg;base64,"+ this.imagePost
  }

  async onPostFeedConfirm(){
    
    // console.log(this.message)
    // console.log(this.user_profile["ID_user"])
    this.http.onPostFeed(this.user_profile["ID_user"],this.message,this.imagePost).subscribe((res)=>{
      console.log(res)
    })
    this.message = ""
    this.postStatus = true;
    this.convertimage = "https://image.flaticon.com/icons/png/512/12/12313.png"
    await this.onFeeding()
  }

  async onFeeding(){
    this.feeding = null
    await this.http.onFeed(this.user_profile["ID_user"]).subscribe((res) => {
      console.log(res)
      this.feeding = res
      this.test_feed = JSON.stringify(res) 
      this.ontest()
    })
    
    // this.feeding2 = this.feeding
  }

  ontest(){
    this.index_feeding = []
    this.feeding2 = []
    for (let it in this.feeding['message']){
      this.index_feeding.push(it)
      this.bufferDate =  new Date(this.feeding['message'][it]['date'])
      console.log(this.bufferDate)
      this.feeding['message'][it]['date'] = this.bufferDate.getHours().toString() +":"+ this.bufferDate.getMinutes().toString() +"  "+this.bufferDate.getDay().toString()+"/"+this.bufferDate.getMonth().toString()+"/"+this.bufferDate.getFullYear().toString() 
      this.feeding2.push(this.feeding['message'][it])
    }
  }

}
