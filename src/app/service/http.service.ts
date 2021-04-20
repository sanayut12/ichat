import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url =  "http://localhost:3000" //"https://ichatserver.herokuapp.com"
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

  onCommentPost(id_post : String,ID_userComment : String,name : String,image_profile : String,message : String){
    return this.http.post(
      this.url+'/commentpost',
      {
        id_post : id_post,
        ID_userComment : ID_userComment,
        name : name,
        image_profile : image_profile ,
        message : message
      },
      {
        headers : new HttpHeaders({
          "content-type" : "application/json"
        })
      }
    );
  }

  ongetComment(id_post : String){
    return this.http.post(
      this.url+'/getcommentpost',
      {
        id_post : id_post
      },
      {
        headers : new HttpHeaders({
          "content-type" : "application/json"
        })
      }
    );
  }

  onlovepost(id_post : String,ID : String){
    return this.http.post(
      this.url+'/love',
      {
        id_post : id_post,
        ID : ID
      },
      {
        headers : new HttpHeaders({
          "content-type" : "application/json"
        })
      }
    );
  }

  ongetlovepost(id_post : String,ID : String){
    return this.http.post(
      this.url+'/getlove',
      {
        id_post : id_post,
        ID : ID
      },
      {
        headers : new HttpHeaders({
          "content-type" : "application/json"
        })
      }
    );
  }

  ongetPostMe(ID:String){
    return this.http.post(
      this.url+'/get_post_me',
      {
        ID : ID
      },
      {
        headers : new HttpHeaders({
          "content-type" : "application/json"
        })
      }
    );
  }

  onGetfriendInteractive(ID:String){
    return this.http.post(
      this.url+'/firendInteractive',
      {
        ID : ID
      },
      {
        headers : new HttpHeaders({
          "content-type" : "application/json"
        })
      }
    );
  }
}
