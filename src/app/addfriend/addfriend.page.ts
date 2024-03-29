import { Component, OnInit } from '@angular/core';
import {HttpService} from '../service/http.service'
import {Plugins} from '@capacitor/core'
import { stringify } from '@angular/compiler/src/util';
const {Storage} = Plugins
@Component({
  selector: 'app-addfriend',
  templateUrl: './addfriend.page.html',
  styleUrls: ['./addfriend.page.scss'],
})
export class AddfriendPage implements OnInit {
  nameSearch : String
  user_info : Object
  all_user : Object
  keys : any
  all_user_search : Object
  keys_search : any
  showUser : boolean

  userReq : any
  userRes : any

  statusReq : boolean
  statusRes : boolean
  constructor(private http : HttpService) { }

  async ngOnInit() {
    this.statusReq = false
    this.statusRes = false
    this.showUser = false
    this.nameSearch =""
   await this.getProfile()
   this.keys = []
   this.keys_search = []
   if(String(this.all_user_search)==''){
    this.showUser = false
   }else{
    this.showUser = true
   }
  }

  async getUserInteractive(){
    this.userReq = null
    this.userRes = null
    this.statusReq = false
    this.statusRes = false
    this.http.onGetUserInteractive(this.user_info["ID_user"]).subscribe((res)=>{
      console.log(res)
      // var reqlen = 
      this.userReq = res['userReq']
      this.userRes = res['userRes']
      if (this.userReq.length ==0){
        this.statusReq = false
      }else{
        this.statusReq = true
      }

      if (this.userRes.length ==0){
        this.statusRes = false
      }else{
        this.statusRes = true
      }
    })
  }

  change = (event) =>{
    this.search(event.detail.value)
    console.log("name search"+this.nameSearch)
  }

  focus = async () =>{
    console.log('================focus=================')
    await this.getUserforsearch(String(this.user_info["ID_user"]))
  }

  async getUserforsearch(ID){
    console.log('======================get user for search============')
    await this.http.onBeingSearch(ID).subscribe((result)=>{
      console.log(result)
      this.all_user = result
      this.keys = []
      for (let key in result){
        this.keys.push(key)
      }
    })
  }

  getProfile = async () =>{
    const profile = await Storage.get({key : 'profile'})
    this.user_info = JSON.parse(profile.value)
    await this.getUserInteractive()
  }

  search = async (name) =>{
    this.nameSearch = name
    var name = name
    var len = name.length

    this.all_user_search = {}
    this.keys_search = []

    for (let key in this.all_user){
      var lk = "fsffffdfdfef"
      
      console.log(" lk    "+this.all_user[key]["username"])
      if (this.all_user[key]["username"].slice(0,len) == name){
        this.all_user_search[key] = this.all_user[key]
        this.keys_search.push(key)
      }
    }

    if (len ==0){
      this.all_user_search = {}
      this.keys_search = null
    }
    this.showUser = true
    return true
  }

  //____________start friend operator_________________
  async addfriend(ID1,ID2){

    this.showUser = false
    await this.http.onAddfriend(ID1,ID2).subscribe((res)=>{
      console.log(res)
      this.getUserInteractive()
    })
    console.log("name search addf friend"+ this.nameSearch)
    await this.focus()
    await this.search(this.nameSearch)
    this.updateStatus(ID2,"wait")
  }

  async unWaitfriend(ID,ID_friend,status){
    // this.updateStatus(ID_friend,"unfriend")
    this.showUser = false
    await this.http.onUnwait(ID_friend,status).subscribe((res)=>{
      console.log(res)
      this.getUserInteractive()
    })
    await this.focus()
    await this.search(this.nameSearch)
    console.log("id friend"+ID)
    this.updateStatus(ID,"unfriend")
  }
  async unWaitfriendC(ID_friend,status){
    // this.updateStatus(ID_friend,"unfriend")
    this.showUser = false
    await this.http.onUnwait(ID_friend,status).subscribe((res)=>{
      console.log(res)
      this.getUserInteractive()
    })
  }
  async confirmFriend(ID,ID_friend,status){
    this.showUser = false
    await this.http.onConfirmFriend(ID_friend,status).subscribe((res)=>{
      console.log(res)
      this.getUserInteractive()
    })
    await this.focus()
    await this.search(this.nameSearch)
    this.updateStatus(ID,"friend")
    
  }
  async confirmFriendC(ID_friend,status){
    this.showUser = false
    await this.http.onConfirmFriend(ID_friend,status).subscribe((res)=>{
      console.log(res)
      this.getUserInteractive()
    })
  }

  checksearchuser(){
    console.log("all user search =="+JSON.stringify(this.all_user_search))
    console.log("all user=="+JSON.stringify(this.all_user))
  }

  updateStatus(ID,status){ //
    this.all_user_search[ID].status = status
  }

}
