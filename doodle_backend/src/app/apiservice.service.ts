import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class APIServiceService {
  public URL="http://localhost:3000"

  constructor(private http:HttpClient) { }

  showProductDetails(){
  return this.http.get(this.URL+"/showProductDetail")
  }
  

}
