import { Component, OnInit } from '@angular/core';
import { NavController, ToastController , } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import {HttpService} from '../service/http.service'
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  message = '';
  messagesAll = [];
  currentUser = '';
  messageSend = ""
  messageStatus : Boolean
  //key ที่ใช้ในการสื่อสาร
  key_friend : String

  //ข้อมูลเพื่อน
  url_image_friend : String
  username_friend : String
  ID_friend : String
  //ข้อมูลเรา
  ID_me : String
  username_me : String
  url_image_me : String

  constructor(
    private nav : NavController,
    private route : ActivatedRoute ,
    private socket: Socket, 
    private toastCtrl: ToastController,
    private http : HttpService,
    ) {
      this.key_friend = this.route.snapshot.paramMap.get('key_friend')

      this.url_image_friend = this.route.snapshot.paramMap.get('url_image_friend')
      this.username_friend = this.route.snapshot.paramMap.get('username_friend')
      this.ID_friend = this.route.snapshot.paramMap.get('ID_friend')

      this.ID_me = this.route.snapshot.paramMap.get('ID_me')
      this.username_me = this.route.snapshot.paramMap.get('username_me')
      this.url_image_me = this.route.snapshot.paramMap.get('url_image_me')

     }

  ngOnInit() {
    this.messageStatus = false
    // this.message = ""  ชื่อkey:idผู่ส่ง:ข้อความ 
    this. messageSend = this.key_friend+":"+this.ID_me+":"
    this.socket.connect();
    this.checkMessageBox()   
 
    // this.socket.fromEvent(""+this.key_friend).subscribe(message => {
    //   this.messagesAll.push(message);
    //   console.log(message)
    // });

    this.socket.fromEvent("recieveMessage"+this.key_friend).subscribe(message => {
      message['date'] = new Date(message['date'])
      this.messagesAll.push(message);
      console.log(typeof message)
      console.log(message)
      this.checkMessageBox()
    });
    this.getMessage()
  }

  getMessage(){
    this.http.onGetMessage(this.key_friend).subscribe((res)=>{
      var data = res['list']
      console.log(data.length)

      for (let item of data){
        item['date'] = new Date(item['date'])
        this.messagesAll.push(item);
      }

      if (data.length == 0){
        this.messageStatus = false
      }else{
        this.messageStatus = true
      }
      
    })
  }

  sendMessage() {
    this.socket.emit('sendMessage',this. messageSend+this.message);
    this.message = ""
    // this.socket.emit('send', { text: this.message });
    // this.message = '';
  }
 
  ionViewWillLeave() {
    this.socket.disconnect();
  }

  checkMessageBox(){
    if (this.messagesAll.length == 0){
      this.messageStatus = false
    }else{
      this.messageStatus = true
    }
  }

  // async showToast(msg) {
  //   let toast = await this.toastCtrl.create({
  //     message: msg,
  //     position: 'top',
  //     duration: 2000
  //   });
  //   toast.present();
  // }

  show(){
    console.log(this.key_friend)
    // console.log(this.url_image_friend)
    console.log(this.ID_friend)
    console.log(this.username_friend)
    
    console.log(this.ID_me)
    // console.log(this.url_image_me)
    console.log(this.username_me)
  }


  back(){
    this.nav.back()
  }
}
