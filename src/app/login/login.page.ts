import { Component, OnInit } from '@angular/core';
import {AlertController, NavController} from '@ionic/angular'
import { Plugins } from '@capacitor/core';
import {HttpService} from '../service/http.service'
const {Storage} = Plugins
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  status : object
  constructor(
    private alert:AlertController,
    private http: HttpService,
    private navCtrl : NavController
  ) { }

  ngOnInit() {
    this.status = {}
  }

  clickLogin(item:any){
    console.log(item)
    this.http.onLogin(item).subscribe((response)=>{
      this.status = response
      if (response["status"] == false){
        console.log('user not currect')
        this.alertAfterLogin()
      }else{
        this.goToMain(response["body"])
      }
    })

  }


  async alertAfterLogin(){
    const alert = await this.alert.create({
      header : 'Alert',
      message : 'username or passwort incorrect',
      buttons : ['OK']
    })

    await alert.present();
  }

  goToMain(body){
    console.log(body)
    this.setProfileInLocal(JSON.stringify(body))
    this.navCtrl.navigateForward("/main")
  }

  setProfileInLocal = async (body) =>{
    await Storage.set({
      key : 'profile',
      value : body
    })
  }

}
