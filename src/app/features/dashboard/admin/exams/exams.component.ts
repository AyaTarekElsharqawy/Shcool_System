import { ChangeDetectorRef, Component, effect, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { jsPDF } from 'jspdf';
import Swal from 'sweetalert2';
import { ExamService } from '../../../../services/exam.service';
import { delay } from 'rxjs';
@Component({
  selector: 'app-exam',
  imports: [NgClass, FormsModule],
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css'],
  providers: [DatePipe]

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
  newExam = signal({
    subject: '', name: '', date: '', time: '', questions: '', 
    class: '', examType: '', duration: ''
  });
  constructor(
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,
    private examService: ExamService,
    private http: HttpClient
  ) {
    this.loadInitialData();
    this.subscribeToExams();
  }

  private subscribeToExams() {
    this.examService.exams$.pipe(
      delay(0)
    ).subscribe({
      next: (exams) => {
        this.exams.set(exams);
        this.updateFilteredExams();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error loading exams:', err);
        this.cdr.markForCheck();
      }
    });
  }
  
  loadInitialData() {
    this.subjects.set([
      { name: 'اللغة العربية' },
      { name: 'اللغة الإنجليزية' },
      { name: 'الرياضيات' },
      { name: 'العلوم' }
    ]);
    this.filteredSubjects.set(this.subjects());
  }


  loadExams() {
    this.examService.getExams().subscribe({
      next: (exams) => {
        this.exams.set(exams);
        this.updateFilteredExams();
      },
      error: (err) => {
        console.error('Failed to load exams:', err);
        this.http.get<any>('assets/TeacherData.json').subscribe(data => {
          this.exams.set(data.exams || []);
          this.updateFilteredExams();
        });
      }
    });
  }
  updateFilteredExams() {
    if (!this.selectedSubject() || !this.selectedExamType()) return;
  
    const filtered = this.exams().filter(exam => {
      const subjectMatch = exam.subject === this.selectedSubject();
      const typeMatch = exam.examType === this.selectedExamType();
      return subjectMatch && typeMatch;
    });
  
    this.filteredExams.set(filtered);
  }

  filterSubjects() {
    this.filteredSubjects.set(
      this.subjects().filter(subject =>
        subject.name.toLowerCase().includes(this.searchQuery().toLowerCase())
      )
    );
  }
  
  selectSubject(subject: any) {
    console.log('Subject selected:', subject);
    this.selectedSubject.set(subject.name || subject);
    this.goToStep(2);
  }

  selectExamType(type: string) {
    console.log('Exam type selected:', type);
    this.selectedExamType.set(type);
    this.updateFilteredExams();
    this.goToStep(3);
  }
  private isExamDataValid(examData: any): boolean {
    return examData.subject && examData.name && examData.date && examData.time &&
           examData.questions && examData.class && examData.examType && examData.duration;
  }
  formatDate(dateString: string): string {
    return this.datePipe.transform(dateString, 'yyyy-MM-dd') || dateString;
}
private prepareExamData(examData: any): any {
  const formattedDate = this.datePipe.transform(examData.date, 'yyyy-MM-dd') || examData.date;
  
  const timeParts = examData.time.split(':');
  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  const timeDate = new Date();
  timeDate.setHours(hours, minutes, 0, 0);
  const formattedTime = this.datePipe.transform(timeDate, 'hh:mm a') || examData.time;

  return {
      ...examData,
      date: formattedDate,
      time: formattedTime
  };
}
  viewExam(exam: any) {
    const questionsFormatted = exam.questions.split('\n').map((q: string, index: number) => 
      `<div style="margin-bottom: 5px;">${index + 1}. ${q.trim()}</div>`
    ).join('');
  
    Swal.fire({
      title: 'تفاصيل الامتحان',
      html: `
      <div class="container">
      <div style="text-align: right;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <div><strong>المادة:</strong> ${exam.subject}</div>
          <div><strong>اسم الاختبار:</strong> ${exam.name}</div>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <div><strong>التاريخ:</strong> ${exam.date}</div>
          <div><strong>الوقت:</strong> ${exam.time}</div>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <div><strong>الصف:</strong> ${exam.class}</div>
          <div><strong>المدة:</strong> ${exam.duration} دقيقة</div>
        </div>
        <div style="margin-bottom: 10px;"><strong>الأسئلة:</strong></div>
        <div style="margin-bottom: 10px;">${questionsFormatted}</div>
      </div>
      </div>  
      `,
      confirmButtonText: 'حسناً',
      width: '60%', 
      heightAuto: false, 
      customClass: {
        popup: 'custom-popup', 
        container: 'custom-container' 
      }
    });
  }
  goToStep(stepNumber: number) {
    this.step.set(stepNumber);
    if (stepNumber === 5) {
      this.updateFilteredExams();
    }
  }
  resetForm() {
    this.newExam.set({ subject: '', name: '', date: '', time: '', questions: '', class: '', examType: '', duration: '' });
    this.goToStep(1);
    this.cdr.detectChanges();
  }

  downloadExam(exam: any) {
    const doc = new jsPDF();
    doc.addFont('assets/fonts/Amiri-Regular.ttf', 'Amiri', 'normal');
    doc.setFont('Amiri');
    doc.setFontSize(24);
    doc.text(exam.name, doc.internal.pageSize.width - 20, 20, { align: 'right' });

    doc.setFontSize(12);
    doc.text(`الوقت: ${exam.time}`, doc.internal.pageSize.width - 20, 30, { align: 'right' });
    doc.text(`المدة: ${exam.duration} دقيقة`, doc.internal.pageSize.width - 20, 40, { align: 'right' });
    doc.setFontSize(20);
    doc.text(`المادة: ${exam.subject}`, doc.internal.pageSize.width - 20, 60, { align: 'right' });
    doc.setFontSize(12);
    doc.text(`التاريخ: ${exam.date}`, doc.internal.pageSize.width - 20, 70, { align: 'right' });
    doc.text(`الصف: ${exam.class}`, doc.internal.pageSize.width - 20, 80, { align: 'right' });
    doc.setFontSize(18);
    doc.text('الأسئلة:', doc.internal.pageSize.width - 20, 100, { align: 'right' });

    const questions = exam.questions.split('\n');
    questions.forEach((q: string, index: number) => {
      doc.text(`${index + 1}. ${q.trim()}`, doc.internal.pageSize.width - 20, 110 + (index * 10), { align: 'right' });
    });

    doc.save(`exam_${exam._id}.pdf`);
  }
  getSubjectClass(subject: string): string {
    return this.subjectColors[subject] || 'default-class';
  }
  private subjectColors: { [key: string]: string } = {
    'اللغة العربية': 'white',
    'اللغة الإنجليزية': 'blue',
    'الرياضيات': 'red',
    'العلوم': 'green'
  };
}