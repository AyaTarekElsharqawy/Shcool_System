import { Component, effect, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exam',
  imports: [NgClass, FormsModule],
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent {
  step = signal(1);
  selectedSubject = signal<any | null>(null);
  selectedExamType = signal<string>('');
  subjects = signal<any[]>([]);
  filteredSubjects = signal<any[]>([]);
  exams = signal<any[]>([]);
  filteredExams = signal<any[]>([]);
  searchQuery = signal<string>(''); 

  constructor(private http: HttpClient) {
    this.loadData();
  }

  loadData() {
    this.http.get<any>('assets/Data.json').subscribe(data => {
      this.subjects.set(data.subjects);
      this.filteredSubjects.set(data.subjects);
    });
    this.loadExamsFromLocalStorage();
  }


  private loadExamsFromLocalStorage(): any[] {
    const savedExams = localStorage.getItem('exams');
    return savedExams ? JSON.parse(savedExams) : []; 
  }
  
  filterSubjects() {
    this.filteredSubjects.set(
      this.subjects().filter(subject =>
        subject.name.toLowerCase().includes(this.searchQuery().toLowerCase())
    ));
  }
  filterExams() {
    const allExams = this.loadExamsFromLocalStorage();
  
    this.filteredExams.set(
      allExams.filter((exam: { subject: string; examType: string; }) => {
  
        const examSubject = exam.subject?.trim();
        const selectedSubjectName = this.selectedSubject()?.name?.trim();
        const examType = exam.examType ? exam.examType.trim() : "undefined";
        const selectedType = this.selectedExamType()?.trim();  
        return examSubject === selectedSubjectName && examType === selectedType;
      })
    );
  }
  
  selectSubject(subject: any) {
    this.selectedSubject.set(subject);
    this.step.set(2);
  }
  
  selectExamType(type: string) {
    this.selectedExamType.set(type);
    this.filterExams();
    this.step.set(3);
  }

  downloadExam(exam: any) {
    const fileUrl = `assets/exams/${exam.subject}_${exam.day}.pdf`;
    window.open(fileUrl, '_blank');
  }

  reset() {
    this.step.set(1);
    this.selectedSubject.set(null);
    this.selectedExamType.set('');
    this.searchQuery.set('');
    this.filteredSubjects.set(this.subjects());
    this.filteredExams.set([]);
  }

  getSubjectClass(subject: string): string {
    switch (subject) {
      case 'اللغة العربية': return 'white';
      case 'اللغة الإنجليزية': return 'blue';
      case 'الرياضيات': return 'red';
      case 'العلوم': return 'green';
      default: return 'default-class';
    }
  }
}