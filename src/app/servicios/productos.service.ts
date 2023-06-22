import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  url:any ='http://localhost:5000/users';

  constructor(private http:HttpClient) { }

  getproductos(){
    return this.http.get(this.url,
  {headers:{"Content-Type":"application/json"}}).toPromise()
  }
  
  postproductos(productos: any){
    return this.http.post(this.url, productos,
  {headers:{"Content-Type":"application/json"}}).toPromise()
  }
  putproductos(productos: any){
    return this.http.put(this.url, productos,
      {headers:{"Content-Type":"application/json"}}).toPromise()
  }

  deleteproductos(id: string){
    return this.http.delete(this.url+'/'+id,
      {headers:{"Content-Type":"application/json"}}).toPromise()
  }

}
