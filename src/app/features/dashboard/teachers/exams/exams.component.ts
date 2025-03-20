import { Component, effect, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { jsPDF } from 'jspdf';
import Swal from 'sweetalert2';
import { ExamService } from '../../../../services/exam.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exam',
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
  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,
    private examService: ExamService 
  ) {
    this.loadData();
    this.examService.exams$.subscribe(exams => {
      this.exams = exams;
      this.updateFilteredExams();
    });
  }

  loadData() {
    this.http.get<any>('assets/TeacherData.json').subscribe(data => {
      this.subjects.set(data.subjects);
      this.filteredSubjects.set(data.subjects);
    });
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
  
    if (!this.isExamDataValid(examData)) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'يرجى ملء جميع الحقول!',
        confirmButtonText: 'حسناً'
      });
      return;
    }
  
    const newExam = this.prepareExamData(examData);
    this.examService.addExam(newExam);
  
    Swal.fire({
      icon: 'success',
      title: 'تم حفظ الاختبار بنجاح',
      confirmButtonText: 'حسناً'
    });
  
    this.resetForm();
  }
  
  private isExamDataValid(examData: any): boolean {
    return examData.subject && examData.name && examData.date && examData.time &&
           examData.questions && examData.class && examData.examType && examData.duration;
  }
  
  private prepareExamData(examData: any): any {
    const formattedDate = this.datePipe.transform(examData.date, 'yyyy-MM-dd');
    const timeParts = examData.time.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const timeDate = new Date();
    timeDate.setHours(hours, minutes, 0, 0);
    const formattedTime = this.datePipe.transform(timeDate, 'hh:mm a');
  
    return {
      id: this.exams.length + 1,
      ...examData,
      date: formattedDate,
      time: formattedTime
    };
  }
  
  private resetForm() {
    this.newExam.set({ subject: '', name: '', date: '', time: '', questions: '', class: '', examType: '', duration: '' });
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
    doc.text('تفاصيل الاختبار', doc.internal.pageSize.width - 20, 10, { align: 'center' });
  
    doc.setFontSize(12);
    doc.text(`المادة: ${exam.subject}`, doc.internal.pageSize.width - 20, 20, { align: 'right' });
    doc.text(`اسم الاختبار: ${exam.name}`, doc.internal.pageSize.width - 20, 30, { align: 'right' });
    doc.text(`التاريخ: ${exam.date}`, doc.internal.pageSize.width - 20, 40, { align: 'right' });
    doc.text(`الوقت: ${exam.time}`, doc.internal.pageSize.width - 20, 50, { align: 'right' });
    doc.text(`الصف: ${exam.class}`, doc.internal.pageSize.width - 20, 60, { align: 'right' });
    doc.text(`نوع الاختبار: ${exam.examType === 'weekly' ? 'أسبوعي' : 'شهري'}`, doc.internal.pageSize.width - 20, 70, { align: 'right' });
    doc.text(`المدة: ${exam.duration} دقيقة`, doc.internal.pageSize.width - 20, 80, { align: 'right' });
    doc.text(`الأسئلة: ${exam.questions}`, doc.internal.pageSize.width - 20, 90, { align: 'right' });
  
    doc.save(`exam_${exam.id}.pdf`);
  }

  reset() {
    this.goToStep(1);
    this.selectedSubject.set('');
    this.selectedExamType.set('');
    this.searchQuery.set('');
    this.filteredSubjects.set(this.subjects());
  }

  private subjectColors: { [key: string]: string } = {
    'اللغة العربية': 'white',
    'اللغة الإنجليزية': 'blue',
    'الرياضيات': 'red',
    'العلوم': 'green'
  };
  
  getSubjectClass(subject: string): string {
    return this.subjectColors[subject] || 'default-class';
  }
  
  confirmDeleteExam(exam: any) {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: 'لن تتمكن من استعادة هذا الامتحان!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'نعم، احذفه',
      cancelButtonText: 'إلغاء',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.examService.deleteExam(exam.id);
        this.showDeleteSuccessMessage();
      }
    });
  }
  
  private showDeleteSuccessMessage() {
    Swal.fire({
      title: 'تم حذف الامتحان بنجاح.',
      icon: 'success',
      confirmButtonText: 'حسناً'
    });
  }

}