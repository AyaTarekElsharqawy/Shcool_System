import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }


  signUp(userData:any):Observable<any>{
    return this.http.post('http://localhost:3030/signUp',userData);
  }
  login(credentials:any):Observable<any>{
    return this.http.post('http://localhost:3030/login',credentials);
  }
}
