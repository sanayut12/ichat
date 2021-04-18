import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url = "https://ichatserver.herokuapp.com" //"http://localhost:3000"
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

  onPostFeed(ID:String , message:String,image:String){
    return this.http.post(
      this.url+'/postFeed',
      {
        ID:ID,
        message : message,
        image : image
      },
      {
        headers : new HttpHeaders({
          "content-type" : "application/json"
        })
      }
    );
  }

  onFeed(ID:String){
    return this.http.post(
      this.url+'/feed',
      {
        ID:ID
      },
      {
        headers : new HttpHeaders({
          "content-type" : "application/json"
        })
      }
    );
  }

  onchangeImageProfile(ID : String,image : String){
    return this.http.post(
      this.url+'/changeimageProfile',
      {
        ID:ID,
        image : image
      },
      {
        headers : new HttpHeaders({
          "content-type" : "application/json"
        })
      }
    );
  }
  onchangeImageBackground(ID : String,image : String){
    return this.http.post(
      this.url+'/changeimagebacbground',
      {
        ID:ID,
        image : image
      },
      {
        headers : new HttpHeaders({
          "content-type" : "application/json"
        })
      }
    );
  }
}
