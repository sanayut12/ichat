import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { AlertController } from '@ionic/angular';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  body : Object
  statusRegister : Object

  urlapi = 'http://192.168.0.103:3000/register'


  constructor(
    private http:HttpClient,
    private alert:AlertController
    ) { }

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
  async alertAfterRegister(status : boolean){
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
      const res = await this.http.post(
        this.urlapi,
        this.body
        ).pipe(
          tap(res =>{
          console.log("ssssssssssssssss")
          console.log(res)
          return res
        })
      ).subscribe(res=>{
        console.log("subscript"+res)
        return res
      })

      console.log("res = "+res['status'])
      // .subscribe(data=> {
      //   alert(data['status'])
      // })
      //
    }
  }


}

register(){

}
// login(credentials) {
//   return this.http.post(`${this.url}/api/user/login`, credentials)
//     .pipe(
//       tap(res => {
//         this.storage.set(TOKEN_KEY, res['token']);
//         this.user = this.helper.decodeToken(res['token']);
//         this.authenticationState.next(true);
//       }),
//       catchError(e => {
//         if (e.error.msg != undefined)
//         this.showAlert(e.error.msg);
//         else
//         this.showAlert(e.error);
//         throw new Error(e);
//       })
//     );
//   }

