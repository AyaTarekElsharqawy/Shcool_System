import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class TeacherService {
    private apiUrl = 'http://localhost:3030/api/teachers';
  
    constructor(private http: HttpClient) { }
  
    private getHeaders(): HttpHeaders {
    //   const token = localStorage.getItem('token') || '';
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTM0N2RhYjE0MzAzNTZlODAwN2M0ZiIsIm5hbWUiOiJBbGlhYSBIZXNoYW0iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDI5NTU2NDcsImV4cCI6MTc0MzU2MDQ0N30.GRfE0BzQxCLzwPrOBkMn6IaSYewynhGJi7y2C6RZ7NA"
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
    }
  
    getAllTeachers(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/getAllTeachers`, {
          headers: this.getHeaders()
        }).pipe(
          catchError(error => {
            console.error('Error fetching teachers:', error);
            return throwError(() => error);
          })
        );
      }
    addTeacher(teacherData: any, imageFile: File): Observable<any> {
        const formData = new FormData();
        
        formData.append('name', teacherData.name);
        formData.append('age', teacherData.age);
        formData.append('phone', teacherData.phone);
        formData.append('email', teacherData.email);
        formData.append('degree', teacherData.degree);
        formData.append('subject', teacherData.subject);
        
        if (imageFile) {
          formData.append('image', imageFile, imageFile.name);
        }
      
        console.log('FormData :', Array.from(formData.entries()));
        const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTM0N2RhYjE0MzAzNTZlODAwN2M0ZiIsIm5hbWUiOiJBbGlhYSBIZXNoYW0iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDI5NTU2NDcsImV4cCI6MTc0MzU2MDQ0N30.GRfE0BzQxCLzwPrOBkMn6IaSYewynhGJi7y2C6RZ7NA"
        return this.http.post(`${this.apiUrl}/create`, formData, {
            
          headers: new HttpHeaders({
            'Authorization': `Bearer ${token}`
          })
        });
      }

  searchTeachers(query: { name?: string, specialization?: string, subject?: string }): Observable<any> {
    let params: any = {};
    if (query.name) params.name = query.name;
    if (query.specialization) params.specialization = query.specialization;
    if (query.subject) params.subject = query.subject;

    return this.http.get(`${this.apiUrl}/getTeacher`, {
      headers: this.getHeaders(),
      params: params
    });
  }

  updateTeacher(id: string, data: any, imageFile?: File): Observable<any> {
    const formData = new FormData();
    for (const key in data) {
      if (data[key]) formData.append(key, data[key]);
    }
    if (imageFile) formData.append('image', imageFile);
    
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  deleteTeacher(id: string): Observable<any> {
    if (!id) {
      return throwError(() => new Error('معرف المعلم مطلوب'));
    }
  
    return this.http.delete(`${this.apiUrl}/delete/${id}`, {
      headers: this.getHeaders()
    });
  }
  saveTeacher(endpoint: string, formData: FormData): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return endpoint.startsWith('update') 
      ? this.http.put(url, formData)
      : this.http.post(url, formData);
  }

getImageUrl(imagePath: string): string {
    if (imagePath.startsWith('assets/')) {
      return imagePath;
    }
    return `http://localhost:3030${imagePath}`;
  }
}