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
  private getValidToken(): string {
    try {
      const token = localStorage.getItem('token') || '';
      return token.replace(/[^\w.-]/g, ''); 
    } catch (error) {
      console.error('Error reading token from localStorage:', error);
      return '';
    }
  }
  private getHeaders() {
    const token = this.getValidToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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

