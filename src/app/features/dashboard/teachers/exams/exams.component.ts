import { Component, effect, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'admin-exam',
  imports: [NgClass, FormsModule],
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css'],
  providers: [DatePipe]
})
export class ExamsComponent {
  step = signal(1);
  selectedSubject = signal<string>('');
  selectedExamType = signal<string>('');
  subjects = signal<any[]>([]);
  filteredSubjects = signal<any[]>([]);
  filteredExams = signal<any[]>([]);
  searchQuery = signal<string>('');

  newExam = signal({ subject: '', name: '', date: '', time: '', questions: '', class: '', examType: '', duration: '' });
  exams: any[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private datePipe: DatePipe) {
    this.loadData();
    this.loadExamsFromLocalStorage();
  }

  loadData() {
    this.http.get<any>('assets/TeacherData.json').subscribe(data => {
      this.subjects.set(data.subjects);
      this.filteredSubjects.set(data.subjects);
    });
  }

  loadExamsFromLocalStorage() {
    const savedExams = localStorage.getItem('exams');
    if (savedExams) {
      this.exams = JSON.parse(savedExams);
    }
  }

  saveExamsToLocalStorage() {
    localStorage.setItem('exams', JSON.stringify(this.exams));
  }

  goToStep(stepNumber: number) {
    this.step.set(stepNumber);
    if (stepNumber === 5) {
      this.updateFilteredExams();
    }
  }

  saveExamAndGoToStep5(event: Event) {
    event.preventDefault();
    const examData = this.newExam();

    if (!examData.subject || !examData.name || !examData.date || !examData.time || !examData.questions ||
        !examData.class || !examData.examType || !examData.duration) {
      alert("يرجى ملء جميع الحقول!");
      return;
    }

    const formattedDate = this.datePipe.transform(examData.date, 'yyyy-MM-dd');

    const timeParts = examData.time.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const timeDate = new Date();
    timeDate.setHours(hours, minutes, 0, 0);

    const formattedTime = this.datePipe.transform(timeDate, 'hh:mm a');

    this.exams.push({
      id: this.exams.length + 1,
      ...examData,
      date: formattedDate,
      time: formattedTime
    });

    this.saveExamsToLocalStorage();
    this.updateFilteredExams();
    this.newExam.set({ subject: '', name: '', date: '', time: '', questions: '', class: '', examType: '', duration: '' });
    alert("تم حفظ الاختبار بنجاح!");
    this.goToStep(1);
    this.cdr.detectChanges();
  }

  updateFilteredExams() {
    this.filteredExams.set(
      this.exams.filter(exam =>
        exam.subject === this.selectedSubject() && exam.examType === this.selectedExamType()
      )
    );
  }

  filterSubjects() {
    this.filteredSubjects.set(
      this.subjects().filter(subject =>
        subject.name.toLowerCase().includes(this.searchQuery().toLowerCase())
      )
    );
  }

  selectSubject(subject: any) {
    this.selectedSubject.set(subject.name);
    this.goToStep(4);
  }

  selectExamType(type: string) {
    this.selectedExamType.set(type);
    this.updateFilteredExams();
    this.goToStep(5);
  }

  downloadExam(exam: any) {
    const doc = new jsPDF();

    doc.addFont('assets/fonts/Amiri-Regular.ttf', 'Amiri', 'normal');
    doc.setFont('Amiri');

    doc.setFontSize(18);
    doc.text('تفاصيل الاختبار', 10, 10);

    doc.setFontSize(12);
    doc.text(`المادة: ${exam.subject}`, 10, 20);
    doc.text(`اسم الاختبار: ${exam.name}`, 10, 30);
    doc.text(`التاريخ: ${exam.date}`, 10, 40);
    doc.text(`الوقت: ${exam.time}`, 10, 50);
    doc.text(`الصف: ${exam.class}`, 10, 60);
    doc.text(`نوع الاختبار: ${exam.examType === 'weekly' ? 'أسبوعي' : 'شهري'}`, 10, 70);
    doc.text(`المدة: ${exam.duration} دقيقة`, 10, 80);
    doc.text(`الأسئلة: ${exam.questions}`, 10, 90);

    doc.save(`exam_${exam.id}.pdf`);
  }

  reset() {
    this.goToStep(1);
    this.selectedSubject.set('');
    this.selectedExamType.set('');
    this.searchQuery.set('');
    this.filteredSubjects.set(this.subjects());
  }

  getSubjectClass(subject: string): string {
    const subjectColors: { [key: string]: string } = {
      'اللغة العربية': 'white',
      'اللغة الإنجليزية': 'blue',
      'الرياضيات': 'red',
      'العلوم': 'green'
    };
    return subjectColors[subject] || 'default-class';
  }
}