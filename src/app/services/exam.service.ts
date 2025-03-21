import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private examsKey = 'exams'; 
  private examsSubject = new BehaviorSubject<any[]>(this.getExamsFromLocalStorage());
  exams$ = this.examsSubject.asObservable();

  constructor() {}

  addExam(exam: any) {
    const currentExams = this.examsSubject.value;
    const updatedExams = [...currentExams, exam];
    this.examsSubject.next(updatedExams);
    this.saveExamsToLocalStorage(updatedExams); 
  }
  

  deleteExam(examId: number) {
    const updatedExams = this.examsSubject.value.filter(exam => exam.id !== examId);
    this.examsSubject.next(updatedExams);
    this.saveExamsToLocalStorage(updatedExams);
  }

  private getExamsFromLocalStorage(): any[] {
    const savedExams = localStorage.getItem(this.examsKey);
    return savedExams ? JSON.parse(savedExams) : [];
  }

  private saveExamsToLocalStorage(exams: any[]) {
    localStorage.setItem(this.examsKey, JSON.stringify(exams));
  }
}
