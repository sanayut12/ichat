import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  profile : String
  constructor(
    private route : ActivatedRoute
  ) {
    this.profile = this.route.snapshot.paramMap.get('body')

  }

  ngOnInit() {
  }

  clickShow(){
    console.log(this.profile)
  }

}
