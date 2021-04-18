import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {AnimationOptions} from 'ngx-lottie'
@Component({
  selector: 'app-first',
  templateUrl: './first.page.html',
  styleUrls: ['./first.page.scss'],
})
export class FirstPage implements OnInit {
  options : AnimationOptions = {
    path :"./assets/phone.json"
  }
  constructor(private navCtrl:NavController) { } //,private lottieSplashScreen: LottieSplashScreen

  ngOnInit() {
    // this.lottieSplashScreen.show('www/lottie/animation.json', false, 1024, 768)
  }

  clickLogin(){
    this.navCtrl.navigateForward('/login')
  }

  clickRegister(){
    this.navCtrl.navigateForward('/register')
  }
}
