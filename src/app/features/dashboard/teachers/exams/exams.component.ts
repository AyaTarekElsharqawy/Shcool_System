import { Component, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { jsPDF } from 'jspdf';
import Swal from 'sweetalert2';
import { ExamService } from '../../../../services/exam.service';
import { Router } from '@angular/router';

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
  exams = signal<any[]>([]);
  filteredExams = signal<any[]>([]);
  subjects = signal<any[]>([
    { name: 'اللغة العربية' },
    { name: 'اللغة الإنجليزية' },
    { name: 'الرياضيات' },
    { name: 'العلوم' }
  ]);
  filteredSubjects = signal<any[]>(this.subjects());
  searchQuery = signal<string>('');

  newExam = signal({
    subject: '', name: '', date: '', time: '', questions: '', 
    class: '', examType: '', duration: ''
  });

  constructor(
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,
    private examService: ExamService,
    private http: HttpClient,
    private router: Router 
  ) {
    this.loadExams();
  }
  selectExamType(type: string) {
    console.log('Exam type selected:', type);
    this.selectedExamType.set(type);
    this.updateFilteredExams();
    this.goToStep(5);
  }
  loadExams() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
  
    this.examService.getExams().subscribe({
      next: (exams) => {
        this.exams.set(exams);
        this.updateFilteredExams();
        this.cdr.markForCheck();
      },
      error: (err) => {
        if (err.status === 401 || err.status === 403) {

        } else {
          this.http.get<any>('assets/TeacherData.json').subscribe(data => {
            this.exams.set(data.exams || []);
            this.updateFilteredExams();
            this.cdr.markForCheck();
          });
        }
      }
    });
  }

  onChanges() {
    const searchLower = this.searchQuery().toLowerCase();
    this.filteredExams.set(
      this.exams().filter(exam => exam.name.toLowerCase().includes(searchLower))
    );
  }

  goToStep(stepNumber: number) {
    this.step.set(stepNumber);
    if (stepNumber === 5) {
      this.updateFilteredExams();
    }
    this.cdr.markForCheck();
  }
  filterSubjects() {
    this.filteredSubjects.set(
      this.subjects().filter(subject =>
        subject.name.toLowerCase().includes(this.searchQuery().toLowerCase())
      )
    );
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

  selectSubject(subject: any) {
    console.log('Subject selected:', subject);
    this.selectedSubject.set(subject.name || subject);
    this.goToStep(4);
  }
  updateFilteredExams() {
    const subject = this.selectedSubject();
    const type = this.selectedExamType();
    if (!subject || !type) return;

    this.filteredExams.set(
      this.exams().filter(exam => exam.subject === subject && exam.examType === type)
    );
    this.cdr.markForCheck();
  }

  saveExamAndGoToStep5(event: Event) {
    event.preventDefault();
    const token = localStorage.getItem('token');
    
    if (!token) {
      // this.router.navigate(['/login']);
      return;
    }
  
    const examData = this.newExam();
  
    if (!this.isExamDataValid(examData)) {
      Swal.fire({ icon: 'error', title: 'خطأ', text: 'يرجى ملء جميع الحقول!', confirmButtonText: 'حسناً' });
      return;
    }
  
    this.examService.addExam(this.prepareExamData(examData)).subscribe({
      next: () => {
        Swal.fire({ icon: 'success', title: 'تم الحفظ بنجاح', timer: 1500, showConfirmButton: false });
        this.resetForm();
        this.loadExams();
      },
      error: (err) => {
        if (err.status === 401 || err.status === 403) {
          // localStorage.removeItem('token');
          // this.router.navigate(['/login']);
        } else {
          Swal.fire({ icon: 'error', title: 'خطأ', text: 'فشل في حفظ الاختبار', confirmButtonText: 'حسناً' });
        }
      }
    });
  }

  private isExamDataValid(examData: any): boolean {
    return examData.subject && examData.name && examData.date && examData.time &&
           examData.questions && examData.class && examData.examType && examData.duration;
  }

  private prepareExamData(examData: any): any {
    const formattedDate = this.datePipe.transform(examData.date, 'yyyy-MM-dd') || examData.date;

    let formattedTime = examData.time;
    if (examData.time && examData.time.includes(':')) {
        const [hours, minutes] = examData.time.split(':').map(Number);
        if (!isNaN(hours) && !isNaN(minutes)) {
            const timeDate = new Date();
            timeDate.setHours(hours, minutes, 0, 0);
            formattedTime = this.datePipe.transform(timeDate, 'hh:mm a') || examData.time;
        } else {
            console.warn("🚨 وقت غير صالح:", examData.time);
            formattedTime = 'غير متاح';
        }
    }

    return {
        ...examData,
        date: formattedDate,
        time: formattedTime
    };
}


confirmDeleteExam(exam: any) {
  const token = localStorage.getItem('token');
  if (!token) {
    this.router.navigate(['/login']);
    return;
  }

  Swal.fire({
    title: 'هل أنت متأكد؟',
    text: 'لن تتمكن من استعادة هذا الامتحان!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'نعم، احذفه',
    cancelButtonText: 'إلغاء'
  }).then((result) => {
    if (result.isConfirmed) {
      this.examService.deleteExam(exam._id).subscribe({
        next: () => {
          Swal.fire({ title: 'تم الحذف بنجاح', icon: 'success' });
          this.loadExams(); 
        },
        error: (err) => {
          if (err.status === 401 || err.status === 403) {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          } else {
            console.error('❌ خطأ في حذف الامتحان:', err);
            Swal.fire({ title: 'خطأ', text: 'فشل في حذف الامتحان', icon: 'error' });
          }
        }
      });
    }
  });
}
  formatDate(dateString: string): string {
    return this.datePipe.transform(dateString, 'yyyy-MM-dd') || dateString;
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
  private resetForm() {
    this.newExam.set({ subject: '', name: '', date: '', time: '', questions: '', class: '', examType: '', duration: '' });
    this.goToStep(1);
    this.cdr.markForCheck();
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
}
