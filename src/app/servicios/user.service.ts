import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:any ='http://localhost:3000/user';
  
  constructor(private http:HttpClient) { }

  getuser(id: any){
    return this.http.post(this.url+"2",id,
  {headers:{"Content-Type":"application/json"}}).toPromise()
  }
  
  postuser(user: any){
    return this.http.post(this.url, user,
  {headers:{"Content-Type":"application/json"}}).toPromise()
  }

}
