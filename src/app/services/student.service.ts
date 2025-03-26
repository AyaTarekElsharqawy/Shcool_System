import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:3030/api/students';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTFlNTY5YWVmNjU5MmI5YmEzZTdmMiIsIm5hbWUiOiJBeWEgVGFyZWsiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDI4NTc2NzksImV4cCI6MTc0MzQ2MjQ3OX0.UpmtraYZPZTFlF7JhBQACPIcgtXmGmm_xUyn8ODJI5I";
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // 🔹 جلب جميع الطلاب
  getAllStudents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllStudents`, {
      headers: this.getHeaders()
    }).pipe(
      catchError(error => {
        console.error('Error fetching students:', error);
        return throwError(() => error);
      })
    );
  }

  // 🔹 إضافة طالب جديد
  addStudent(studentData: any, imageFile: File): Observable<any> {
    const formData = new FormData();
    
    formData.append('name', studentData.name);
    formData.append('age', studentData.age);
    formData.append('studentClass', studentData.studentClass);
    formData.append('guardianPhone', studentData.guardianPhone);
    formData.append('whatsapp', studentData.whatsapp);

    if (imageFile) {
      formData.append('image', imageFile, imageFile.name);
    }

    return this.http.post(`${this.apiUrl}/create`, formData, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.getHeaders().get('Authorization')}`
      })
    });
  }

  // 🔹 البحث عن الطلاب
  searchStudents(query: { name?: string, studentClass?: string }): Observable<any> {
    let params: any = {};
    if (query.name) params.name = query.name;
    if (query.studentClass) params.studentClass = query.studentClass;

    return this.http.get(`${this.apiUrl}/getStudent`, {
      headers: this.getHeaders(),
      params: params
    });
  }

  // 🔹 تحديث بيانات الطالب
  updateStudent(id: string, data: any, imageFile?: File): Observable<any> {
    const formData = new FormData();
    for (const key in data) {
      if (data[key]) formData.append(key, data[key]);
    }
    if (imageFile) formData.append('image', imageFile);
    
    return this.http.put(`${this.apiUrl}/update/${id}`, formData, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.getHeaders().get('Authorization')}`
      })
    });
  }

  // 🔹 حذف طالب
  deleteStudent(id: string): Observable<any> {
    if (!id) {
      return throwError(() => new Error('معرف الطالب مطلوب'));
    }

    return this.http.delete(`${this.apiUrl}/delete/${id}`, {
      headers: this.getHeaders()
    });
  }

  // 🔹 حفظ بيانات الطالب (إضافة أو تعديل)
  saveStudent(endpoint: string, formData: FormData): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return endpoint.startsWith('update') 
      ? this.http.put(url, formData)
      : this.http.post(url, formData);
  }

  // 🔹 جلب رابط الصورة
  getImageUrl(imagePath: string): string {
    if (imagePath.startsWith('assets/')) {
      return imagePath;
    }
    return `http://localhost:3030${imagePath}`;
  }
}
