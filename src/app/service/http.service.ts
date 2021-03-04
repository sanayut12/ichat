import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url = "http://localhost:3000"
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
}
