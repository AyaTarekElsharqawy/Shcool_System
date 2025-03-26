import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:3030/api/students'; 

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getValidToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
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

  getAllStudents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllStudents`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  addStudent(studentData: any, imageFile?: File): Observable<any> {
    const formData = new FormData();
    
    formData.append('name', studentData.name || '');
    formData.append('age', studentData.age?.toString() || '');
    formData.append('studentClass', studentData.studentClass || '');
    formData.append('guardianPhone', studentData.guardianPhone || '');
    formData.append('whatsapp', studentData.whatsapp || '');
  
    if (imageFile) {
      formData.append('image', imageFile, imageFile.name);
    }
  
    return this.http.post(`${this.apiUrl}/create`, formData, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.getValidToken()}`
      })
    }).pipe(
      catchError(error => {
        console.error('Error details:', error.error);
        return throwError(() => error);
      })
    );
  }
  updateStudent(id: string, data: any, imageFile?: File): Observable<any> {
    const formData = new FormData();
    
    if (data.name) formData.append('name', data.name);
    if (data.age) formData.append('age', data.age.toString());
    if (data.whatsapp) formData.append('whatsapp', data.whatsapp);
    if (data.studentClass) formData.append('studentClass', data.studentClass);
    
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

  deleteStudent(id: string): Observable<any> {
    if (!id) {
      return throwError(() => new Error('Student ID is required'));
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
    return `${this.apiUrl.replace('/api/students', '')}${imagePath}`;
  }
}