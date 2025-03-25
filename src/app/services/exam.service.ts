import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private apiUrl = 'http://localhost:3030/api';
  private examsSubject = new BehaviorSubject<any[]>([]);
  exams$ = this.examsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialExams();
  }

  private getHeaders() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTE3OWE2NTM0ZWU3OWEwMTdmY2Q0MyIsIm5hbWUiOiJBbGlhYSIsInJvbGUiOiJ0ZWFjaGVyIiwiaWF0IjoxNzQyOTI0MzY3LCJleHAiOjE3NDM1MjkxNjd9.YN6rt0cgY_N1uwFsI0o3G99qWICWYGAjFckdIBbTvqU"; 
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      })
    };
  }

  private loadInitialExams() {
    this.http.get<any[]>(`${this.apiUrl}/exams/getAllExams`, this.getHeaders()).subscribe({
      next: (exams) => this.examsSubject.next(exams),
      error: (err) => console.error('Error loading exams:', err)
    });
  }

  getExams(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/exams/getAllExams`, this.getHeaders());
  }

  getExamById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/exams/getExam/${id}`, this.getHeaders());
  }

  addExam(exam: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/exams/create`, exam, this.getHeaders()).pipe(
      tap(newExam => {
        const currentExams = this.examsSubject.value;
        this.examsSubject.next([...currentExams, newExam]);
      })
    );
  }

  deleteExam(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/exams/delete/${id}`, this.getHeaders())
      .pipe(
        tap(() => {
          const currentExams = this.examsSubject.value.filter(exam => exam._id !== id);
          this.examsSubject.next(currentExams);
        })
      );
  }
}