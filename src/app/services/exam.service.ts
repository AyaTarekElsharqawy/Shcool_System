// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ExamService {
//   private examsSubject = new BehaviorSubject<any[]>([]);
//   exams$ = this.examsSubject.asObservable();

//   constructor() {
//     this.loadExamsFromLocalStorage();
//   }

//   addExam(exam: any) {
//     const currentExams = this.examsSubject.value;
//     this.examsSubject.next([...currentExams, exam]);
//     this.saveExamsToLocalStorage();
//   }

//   deleteExam(examId: number) {
//     const currentExams = this.examsSubject.value.filter(exam => exam.id !== examId);
//     this.examsSubject.next(currentExams);
//     this.saveExamsToLocalStorage();
//   }

//   private loadExamsFromLocalStorage() {
//     const savedExams = localStorage.getItem('exams');
//     if (savedExams) {
//       this.examsSubject.next(JSON.parse(savedExams));
//     }
//   }

//   private saveExamsToLocalStorage() {
//     localStorage.setItem('exams', JSON.stringify(this.examsSubject.value));
//   }
// }
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private examsKey = 'exams'; // المفتاح المستخدم في Local Storage
  private examsSubject = new BehaviorSubject<any[]>(this.getExamsFromLocalStorage());
  exams$ = this.examsSubject.asObservable();

  constructor() {}

  addExam(exam: any) {
    const currentExams = this.examsSubject.value;
    const updatedExams = [...currentExams, exam];
    this.examsSubject.next(updatedExams);
    this.saveExamsToLocalStorage(updatedExams); // ✅ تمرير exams هنا
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
