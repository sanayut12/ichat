import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url = "https://ichatserver.herokuapp.com"
  constructor(
    private http:HttpClient,
    ) { }

  onRegister(body){
    return this.http.post(
      this.url+"/register",
      body,
      {
        headers : new HttpHeaders({
          "content-type" : "application/json"
        })
      }
    )
  }

  onLogin(body){
    return this.http.post(
      this.url+"/login",
      body,
      {
        headers : new HttpHeaders({
          "content-type" : "application/json"
        })
      }
    )
  }

  onBeingSearch(ID){
    return this.http.post(
      this.url+"/forsearch",
      {ID_user : ID}
    )
  }

  onAddfriend(ID1,ID2){
    return this.http.post(
      this.url+"/addfriend",
      {
        ID1 : ID1,
        ID2 : ID2
      }
    )
  }


  //___ start friend operator_____
  onUnwait(ID_friend,status){
    return this.http.post(
      this.url +"/unwait",
      {
        ID_friend : ID_friend,
        status : status
      }
    )
  }

  onUnfriend(){

  }
  onConfirmFriend(ID_friend,status){
    return this.http.post(
      this.url+'/confirmfriend',
      {
        ID_friend : ID_friend,
        status : status
      }
    )
  }
  //___ end friend operator_____

  onAllfriendMe(ID){
    return this.http.post(
      this.url+'/friendMe',
      {ID:ID}
    )
  }


}
