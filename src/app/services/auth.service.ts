import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3030';

  constructor(private http: HttpClient) {}

  signUp(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/signUp`, userData);
  }
  // signUp(user: any) {
  //   return this.http.post('http://localhost:3030/signUp', user, {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  //   });
  // }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  // حفظ الـ Token في localStorage
  saveToken(token: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  }

  // جلب الـ Token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // مسح الـ Token عند تسجيل الخروج
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
}
