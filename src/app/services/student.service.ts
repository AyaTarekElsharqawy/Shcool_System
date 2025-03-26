// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// interface Student {
//   _id?: string;
//   name: string;
//   age: number;
//   classroom: string;
//   guardianPhone: string;
//   whatsapp: string;
//   image: string;
//   studentid?: string; // أضفنا studentid عشان يطابق الـ students array
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class StudentService {
//   private apiUrl = 'http://localhost:3030/students';

//   constructor(private http: HttpClient) {}

//   getStudents(): Observable<Student[]> {
//     return this.http.get<Student[]>(`${this.apiUrl}/getStudents`);
//   }
//   addStudent(student: Student): Observable<{ message: string; student: Student }> {
//     return this.http.post<{ message: string; student: Student }>(this.apiUrl, student);
//   }

//   getStudentById(id: string): Observable<Student> {
//     return this.http.get<Student>(`${this.apiUrl}/${id}`);
//   }

//   updateStudent(id: string, student: Student): Observable<{ message: string; student: Student }> {
//     return this.http.put<{ message: string; student: Student }>(`${this.apiUrl}/${id}`, student);
//   }

//   deleteStudent(id: string): Observable<{ message: string }> {
//     return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
//   }
// }
// **
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// interface Student {
//   _id?: string;
//   name: string;
//   age: number;
//   classroom: string;
//   guardianPhone: string;
//   whatsapp: string;
//   image: string;
//   studentid?: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class StudentService {
//   private apiUrl = 'http://localhost:3030/students'; // الـ base URL

//   constructor(private http: HttpClient) {}

//   getStudents(): Observable<Student[]> {
//     return this.http.get<Student[]>(`${this.apiUrl}/getStudents`);
//   }

//   addStudent(student: Student): Observable<{ message: string; student: Student }> {
//     return this.http.post<{ message: string; student: Student }>(`${this.apiUrl}/add`, student); // غيرنا من this.apiUrl لـ ${this.apiUrl}/add
//   }

//   getStudentById(id: string): Observable<Student> {
//     return this.http.get<Student>(`${this.apiUrl}/${id}`);
//   }

//   updateStudent(id: string, student: Student): Observable<{ message: string; student: Student }> {
//     return this.http.put<{ message: string; student: Student }>(`${this.apiUrl}/${id}`, student);
//   }

//   deleteStudent(id: string): Observable<{ message: string }> {
//     return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Student {
  _id?: string;
  name: string;
  age: number;
  classroom: string;
  guardianPhone: string;
  whatsapp: string;
  image: string;
  studentid?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:3030/students'; // الـ base URL

  constructor(private http: HttpClient) {}

  // جلب كل الطلاب
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/getStudents`);
  }

  // جلب طالب معين بناءً على الـ ID
  getStudentById(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  // إضافة طالب جديد
  addStudent(student: Student): Observable<{ message: string; student: Student }> {
    return this.http.post<{ message: string; student: Student }>(`${this.apiUrl}/add`, student);
  }

  // تعديل بيانات طالب
  updateStudent(id: string, student: Student): Observable<{ message: string; student: Student }> {
    return this.http.put<{ message: string; student: Student }>(`${this.apiUrl}/${id}`, student);
  }

  // حذف طالب
  deleteStudent(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}