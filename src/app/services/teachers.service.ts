import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private apiUrl = 'http://localhost:3030/api/teachers';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getValidToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }

  private getValidToken(): string {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      throw new Error('Authentication token missing');
    }
    return token;
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }
  getTeacherById(id: string): Observable<any> {
    if (!id) {
      return throwError(() => new Error('Teacher ID is required'));
    }
  
    return this.http.get<any>(`${this.apiUrl}/getTeacher/${id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }
  getAllTeachers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllTeachers`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  addTeacher(teacherData: any, imageFile?: File): Observable<any> {
    const formData = new FormData();
    
    formData.append('name', teacherData.name || '');
    formData.append('email', teacherData.email || '');
    formData.append('subject', teacherData.subject || '');
    formData.append('age', teacherData.age ? teacherData.age.toString() : '');
    formData.append('phone', teacherData.phone || '');
    formData.append('degree', teacherData.degree || '');
  
    if (imageFile) {
      formData.append('image', imageFile, imageFile.name);
    }
  
    formData.forEach((value, key) => {
      console.log(`FormData Key: ${key}, Value:`, value);
    });
  
    return this.http.post(`${this.apiUrl}/create`, formData, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.getValidToken()}`,
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

updateTeacher(id: string, data: any, imageFile?: File): Observable<any> {
  const formData = new FormData();
  
  if (data.name) formData.append('name', data.name);
  if (data.age) formData.append('age', data.age.toString());
  if (data.subject) formData.append('subject', data.subject);
  if (data.degree) formData.append('degree', data.degree);
  if (imageFile) {
    formData.append('image', imageFile);
  }

  return this.http.put(`${this.apiUrl}/update/${id}`, formData, {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.getValidToken()}`
    })
  }).pipe(
    catchError(error => {
      console.error('Update error:', error);
      return throwError(() => error.error);
    })
  );
}
  deleteTeacher(id: string): Observable<any> {
    if (!id) {
      return throwError(() => new Error('Teacher ID is required'));
    }

    return this.http.delete(`${this.apiUrl}/delete/${id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  getImageUrl(imagePath: string): string {
    if (!imagePath) return 'assets/default-avatar.png';
    
    if (imagePath.startsWith('assets/') || imagePath.startsWith('http')) {
      return imagePath;
    }
    return `${this.apiUrl.replace('/api/teachers', '')}${imagePath}`;
  }
}