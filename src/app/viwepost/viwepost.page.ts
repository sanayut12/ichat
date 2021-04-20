import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { NavController } from '@ionic/angular';
import {HttpService} from './../service/http.service'
const {Storage,Camera} = Plugins
@Component({
  selector: 'app-viwepost',
  templateUrl: './viwepost.page.html',
  styleUrls: ['./viwepost.page.scss'],
})
export class ViwepostPage implements OnInit {
    countLove : Number
    iconlove : String
    status_comment_box : boolean
    message_comment : String
    user_profile : Object
    list_comment : any
    ID_post: String
    ID_user: String
    date: String
    image_profile: String
    message: String
    name:String
    url: String
  constructor(
    private http : HttpService,
    private nav : NavController,
    private route : ActivatedRoute
    ) {
    this.ID_post  = this.route.snapshot.paramMap.get('ID_post')
    this.ID_user = this.route.snapshot.paramMap.get('ID_user')
    this.date = this.route.snapshot.paramMap.get('date')
    this.image_profile = this.route.snapshot.paramMap.get('image_profile')
    this.message = this.route.snapshot.paramMap.get('message')
    this.name = this.route.snapshot.paramMap.get('name')
    this.url = this.route.snapshot.paramMap.get('url')
   }

  async ngOnInit() {
    this.countLove = 0
    this.iconlove = "heart-outline"
    this.status_comment_box = false
    // this.list_comment = []
    this.message_comment = ""
    await this.getProfile()
    this.ongetComment()
  }

  getProfile = async () => {
    const profile = await Storage.get({key:'profile'})
    console.log(JSON.parse(profile.value))
    this.user_profile = JSON.parse(profile.value)
   }

  send_comment(){
    // id_post : req.body.id_post,
    // ID_userComment : req.body.ID_userComment,
    // name : req.body.name,
    // image_profile : req.body.image_profile ,
    // message : req.body.message
    console.log(this.message_comment)
    this.http.onCommentPost(this.ID_post,this.user_profile["ID_user"],this.user_profile["username"],this.user_profile["url_image"],this.message_comment).subscribe((res)=>{
      console.log(res)
    })
    this.message_comment = ""
    this.ongetComment()
  }
  
  ongetComment(){
    this.http.ongetComment(this.ID_post).subscribe((res)=>{
      var data = res['data']
      if (data == null){
        this.status_comment_box = false
      }else{
        // for (let key in data){
          this.list_comment = data
        // }
        // console.log('---------------------')
        console.log(this.list_comment)
        this.status_comment_box = true
      }
      
    })
  }

  lovepost(){
    this.http.onlovepost(this.ID_post,this.user_profile["ID_user"]).subscribe((res)=>{
      console.log(res)
      this.countLove = res['count']
      if (res['userlove']){
        this.iconlove = "heart"
      }else{
        this.iconlove = "heart-outline"
      }
    })
  }

  back(){
    this.nav.back()
  }

}
