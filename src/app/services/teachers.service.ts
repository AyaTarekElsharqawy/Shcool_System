// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { catchError, Observable, throwError } from 'rxjs';

// @Injectable({
//     providedIn: 'root'
//   })
//   export class TeacherService {
//     private apiUrl = 'http://localhost:3030/api/teachers';
  
//     constructor(private http: HttpClient) { }
  
//     private getHeaders(): HttpHeaders {
//       const token = localStorage.getItem('token') || '';
//       return new HttpHeaders({
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       });
//     }
//     getAllTeachers(): Observable<any[]> {
//         return this.http.get<any[]>(`${this.apiUrl}/getAllTeachers`, {
//           headers: this.getHeaders()
//         }).pipe(
//           catchError(error => {
//             console.error('Error fetching teachers:', error);
//             return throwError(() => error);
//           })
//         );
//       }
//     addTeacher(teacherData: any, imageFile: File): Observable<any> {
//         const formData = new FormData();
        
//         formData.append('name', teacherData.name);
//         formData.append('age', teacherData.age);
//         formData.append('phone', teacherData.phone);
//         formData.append('email', teacherData.email);
//         formData.append('degree', teacherData.degree);
//         formData.append('subject', teacherData.subject);
        
//         if (imageFile) {
//           formData.append('image', imageFile, imageFile.name);
//         }
      
//         console.log('FormData :', Array.from(formData.entries()));
//         const token = localStorage.getItem('token') || '';
//         return this.http.post(`${this.apiUrl}/create`, formData, {
            
//           headers: new HttpHeaders({
//             'Authorization': `Bearer ${token}`
//           })
//         });
//       }

//   searchTeachers(query: { name?: string, specialization?: string, subject?: string }): Observable<any> {
//     let params: any = {};
//     if (query.name) params.name = query.name;
//     if (query.specialization) params.specialization = query.specialization;
//     if (query.subject) params.subject = query.subject;

//     return this.http.get(`${this.apiUrl}/getTeacher`, {
//       headers: this.getHeaders(),
//       params: params
//     });
//   }

//   updateTeacher(id: string, data: any, imageFile?: File): Observable<any> {
//     const formData = new FormData();
//     for (const key in data) {
//       if (data[key]) formData.append(key, data[key]);
//     }
//     if (imageFile) formData.append('image', imageFile);
    
//     return this.http.put(`${this.apiUrl}/${id}`, formData);
//   }

//   deleteTeacher(id: string): Observable<any> {
//     if (!id) {
//       return throwError(() => new Error('معرف المعلم مطلوب'));
//     }
  
//     return this.http.delete(`${this.apiUrl}/delete/${id}`, {
//       headers: this.getHeaders()
//     });
//   }
//   saveTeacher(endpoint: string, formData: FormData): Observable<any> {
//     const url = `${this.apiUrl}/${endpoint}`;
//     return endpoint.startsWith('update') 
//       ? this.http.put(url, formData)
//       : this.http.post(url, formData);
//   }

// getImageUrl(imagePath: string): string {
//     if (imagePath.startsWith('assets/')) {
//       return imagePath;
//     }
//     return `http://localhost:3030${imagePath}`;
//   }
// }
//==============================
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class TeacherService {
//   private apiUrl = 'http://localhost:3030/api/teachers';

//   constructor(private http: HttpClient) { }

//   private getAuthHeaders(): HttpHeaders {
//     const token = this.getValidToken();
//     return new HttpHeaders({
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     });
//   }

//   private getValidToken(): string {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       console.error('No token found in localStorage');
//       throw new Error('Authentication token missing');
//     }
//     return token;
//   }

//   private handleError(error: any): Observable<never> {
//     console.error('An error occurred:', error);
//     return throwError(() => error);
//   }

//   getAllTeachers(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/getAllTeachers`, {
//       headers: this.getAuthHeaders()
//     }).pipe(
//       catchError(this.handleError)
//     );
//   }

//   addTeacher(teacherData: any, imageFile?: File): Observable<any> {
//     const formData = new FormData();
    
//     // إضافة البيانات الأساسية
//     Object.keys(teacherData).forEach(key => {
//       if (teacherData[key] !== undefined && teacherData[key] !== null) {
//         formData.append(key, teacherData[key]);
//       }
//     });

//     // إضافة الصورة إذا وجدت
//     if (imageFile) {
//       formData.append('image', imageFile, imageFile.name);
//     }

//     return this.http.post(`${this.apiUrl}/create`, formData, {
//       headers: new HttpHeaders({
//         'Authorization': `Bearer ${this.getValidToken()}`
//       })
//     }).pipe(
//       catchError(this.handleError)
//     );
//   }

//   searchTeachers(query: { name?: string; specialization?: string; subject?: string }): Observable<any> {
//     let params = new HttpParams();
//     if (query.name) params = params.append('name', query.name);
//     if (query.specialization) params = params.append('specialization', query.specialization);
//     if (query.subject) params = params.append('subject', query.subject);

//     return this.http.get(`${this.apiUrl}/getTeacher`, {
//       headers: this.getAuthHeaders(),
//       params: params
//     }).pipe(
//       catchError(this.handleError)
//     );
//   }

//   updateTeacher(id: string, data: any, imageFile?: File): Observable<any> {
//     const formData = new FormData();
    
//     // إضافة البيانات
//     Object.keys(data).forEach(key => {
//       if (data[key] !== undefined && data[key] !== null) {
//         formData.append(key, data[key]);
//       }
//     });

//     // إضافة الصورة الجديدة إذا وجدت
//     if (imageFile) {
//       formData.append('image', imageFile, imageFile.name);
//     }

//     return this.http.put(`${this.apiUrl}/update/${id}`, formData, {
//       headers: new HttpHeaders({
//         'Authorization': `Bearer ${this.getValidToken()}`
//       })
//     }).pipe(
//       catchError(this.handleError)
//     );
//   }

//   deleteTeacher(id: string): Observable<any> {
//     if (!id) {
//       return throwError(() => new Error('Teacher ID is required'));
//     }

//     return this.http.delete(`${this.apiUrl}/delete/${id}`, {
//       headers: this.getAuthHeaders()
//     }).pipe(
//       catchError(this.handleError)
//     );
//   }

//   getImageUrl(imagePath: string): string {
//     if (!imagePath) return 'assets/images/default-profile.png';
    
//     if (imagePath.startsWith('assets/')) {
//       return imagePath;
//     }
//     return `${this.apiUrl.replace('/api/teachers', '')}${imagePath}`;
//   }
// }
//============================

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
      'Content-Type': 'multipart/form-data'
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

//   updateTeacher(id: string, data: any, imageFile?: File): Observable<any> {
//     const formData = new FormData();
    
//     // Append all fields using backend field names
//     formData.append('name', data.name || '');
//     formData.append('email', data.email || '');
//     formData.append('subject', data.subject || '');
//     formData.append('age', data.age?.toString() || '');
//     formData.append('phone', data.phone || '');
//     formData.append('degree', data.degree || data.specialization || ''); // Handle both cases
    
//     if (imageFile) {
//         formData.append('image', imageFile);
//     }

//     return this.http.put(`${this.apiUrl}/update/${id}`, formData, {
//         headers: this.getAuthHeaders()
//     }).pipe(
//         catchError(error => {
//             if (error.status === 400) {
//                 const backendError = error.error;
//                 return throwError(() => ({
//                     message: backendError?.message || 'Validation failed',
//                     errors: backendError?.errors || {},
//                     duplicatePhone: backendError?.message?.includes('Phone number already exists'),
//                     duplicateEmail: backendError?.message?.includes('Email already exists')
//                 }));
//             }
//             return throwError(() => error);
//         })
//     );
// }
// updateTeacher(id: string, data: any, imageFile?: File): Observable<any> {
//   const formData = new FormData();
  
//   // Append all fields - ensure field names match backend exactly
//   formData.append('name', data.name || '');
//   formData.append('email', data.email || '');
//   formData.append('subject', data.subject || '');
//   formData.append('age', data.age?.toString() || '');
//   formData.append('phone', data.phone || '');
//   formData.append('degree', data.degree || data.specialization || ''); // Handle both cases
  
//   if (imageFile) {
//     formData.append('image', imageFile);
//   }

//   // Debugging: Log FormData contents
//   formData.forEach((value, key) => {
//     console.log(`FormData Key: ${key}, Value:`, value);
//   });

//   // Create headers without Content-Type
//   const headers = new HttpHeaders({
//     'Authorization': `Bearer ${this.getValidToken()}`
//   });

//   return this.http.put(`${this.apiUrl}/update/${id}`, formData, { headers })
//     .pipe(
//       catchError(error => {
//         console.error('Full error response:', error);
//         if (error.error) {
//           console.error('Server error details:', error.error);
//         }
//         return throwError(() => error);
//       })
//     );
// }
updateTeacher(id: string, data: any, imageFile?: File): Observable<any> {
  const formData = new FormData();

  // Append only the fields that have values
  if (data.name) formData.append('name', data.name);
  if (data.email) formData.append('email', data.email);
  if (data.subject) formData.append('subject', data.subject);
  if (data.age) formData.append('age', data.age.toString());
  if (data.phone) formData.append('phone', data.phone);
  if (data.degree) formData.append('degree', data.degree);
  
  // Handle image file if provided
  if (imageFile) {
    formData.append('image', imageFile);
  }

  // Debugging: Log what's being sent
  console.log('Sending update for teacher ID:', id);
  formData.forEach((value, key) => {
    console.log(`Field: ${key}, Value:`, value);
  });

  return this.http.put(`${this.apiUrl}/update/${id}`, formData, {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.getValidToken()}`
    })
  }).pipe(
    catchError(error => {
      console.error('Update error:', error);
      return throwError(() => ({
        message: error.error?.message || 'Update failed',
        status: error.status,
        details: error.error
      }));
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