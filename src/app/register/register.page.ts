import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {HttpService} from '../service/http.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  body : Object
  statusRegister : Object
  message : String
  urlapi = 'http://192.168.0.103:3000/register'


  constructor(
    private alert:AlertController,
    private httpService : HttpService
    ) {
      this.message = "hello"
     }

  ngOnInit() {
    this.body = {
      username : "",
      email : "",
      password : ""
    }
  }

  async alertPasswordNotMatch(){
    const alert = await this.alert.create({
      header: 'Alert',
      message: 'password not match',
      buttons: ['OK']
    });

    await alert.present();
  }
  async alertAfterRegister(status : any){
      const alert = await this.alert.create({
      header: 'Alert',
      message: status ? "success!" : "user used",
      buttons: ['OK']
    });

    await alert.present();
  }

  async clickRegister(item : any){

    this.body = item
    if(item.password != item.confirmpassword){
      this.alertPasswordNotMatch()
    }else{
      this.httpService.onRegister(item).subscribe(
        (response) =>{
          console.log(response)
          this.message = response['status']
          this.alertAfterRegister(this.message)

        }
      )
    }
  }

}
