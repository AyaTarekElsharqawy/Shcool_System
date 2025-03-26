// import { Component, signal, effect } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { NgClass } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ChangeDetectorRef } from '@angular/core';
// import { DatePipe } from '@angular/common';
// import { jsPDF } from 'jspdf';
// import Swal from 'sweetalert2';
// import { ExamService } from '../../../../services/exam.service';
// import { Router } from '@angular/router';
// @Component({
//   selector: 'app-exam',
//   imports: [NgClass, FormsModule],
//   templateUrl: './exams.component.html',
//   styleUrls: ['./exams.component.css'],
//   providers: [DatePipe]

// })
// export class ExamsComponent {
//   step = signal(1);
//   selectedSubject = signal<any | null>(null);
//   selectedExamType = signal<string>('');
//   subjects = signal<any[]>([
//     { name: 'اللغة العربية' },
//     { name: 'اللغة الإنجليزية' },
//     { name: 'الرياضيات' },
//     { name: 'العلوم' }
//   ]);  filteredSubjects = signal<any[]>([]);
//   exams = signal<any[]>([]);
//   filteredExams = signal<any[]>([]);
//   searchQuery = signal<string>(''); 
//   newExam = signal({
//     subject: '', name: '', date: '', time: '', questions: '', 
//     class: '', examType: '', duration: ''
//   });
//   constructor(
//     private cdr: ChangeDetectorRef,
//     private datePipe: DatePipe,
//     private examService: ExamService,
//     private http: HttpClient,
//     private router: Router 

//   ) {
//     this.loadExams();

//   }

//   loadInitialData() {
//     this.subjects.set([
//       { name: 'اللغة العربية' },
//       { name: 'اللغة الإنجليزية' },
//       { name: 'الرياضيات' },
//       { name: 'العلوم' }
//     ]);
//     this.filteredSubjects.set(this.subjects());
//   }


//   loadExams() {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       return;
//     }
  
//     this.examService.getExams().subscribe({
//       next: (exams) => {
//         this.exams.set(exams);
//         this.updateFilteredExams();
//         this.cdr.markForCheck();
//       },
//       error: (err) => {
//         if (err.status === 401 || err.status === 403) {

//         } else {
//           this.http.get<any>('assets/TeacherData.json').subscribe(data => {
//             this.exams.set(data.exams || []);
//             this.updateFilteredExams();
//             this.cdr.markForCheck();
//           });
//         }
//       }
//     });
//   }
  
//   updateFilteredExams() {
//     const subject = this.selectedSubject();
//     const type = this.selectedExamType();
//     if (!subject || !type) return;

//     this.filteredExams.set(
//       this.exams().filter(exam => exam.subject === subject && exam.examType === type)
//     );
//     this.cdr.markForCheck();
//   }


//   filterSubjects() {
//     this.filteredSubjects.set(
//       this.subjects().filter(subject =>
//         subject.name.toLowerCase().includes(this.searchQuery().toLowerCase())
//       )
//     );
//   }
  
//   selectSubject(subject: any) {
//     console.log('Subject selected:', subject);
//     this.selectedSubject.set(subject.name || subject);
//     this.goToStep(2);
//   }

//   selectExamType(type: string) {
//     console.log('Exam type selected:', type);
//     this.selectedExamType.set(type);
//     this.updateFilteredExams();
//     this.goToStep(3);
//   }
//   private isExamDataValid(examData: any): boolean {
//     return examData.subject && examData.name && examData.date && examData.time &&
//            examData.questions && examData.class && examData.examType && examData.duration;
//   }

//   formatDate(dateString: string): string {
//     return this.datePipe.transform(dateString, 'yyyy-MM-dd') || dateString;
// }


// private prepareExamData(examData: any): any {
//   const formattedDate = this.datePipe.transform(examData.date, 'yyyy-MM-dd') || examData.date;

//   let formattedTime = examData.time;
//   if (examData.time && examData.time.includes(':')) {
//       const [hours, minutes] = examData.time.split(':').map(Number);
//       if (!isNaN(hours) && !isNaN(minutes)) {
//           const timeDate = new Date();
//           timeDate.setHours(hours, minutes, 0, 0);
//           formattedTime = this.datePipe.transform(timeDate, 'hh:mm a') || examData.time;
//       } else {
//           console.warn("🚨 وقت غير صالح:", examData.time);
//           formattedTime = 'غير متاح';
//       }
//   }

//   return {
//       ...examData,
//       date: formattedDate,
//       time: formattedTime
//   };
// }

//   viewExam(exam: any) {
//     const questionsFormatted = exam.questions.split('\n').map((q: string, index: number) => 
//       `<div style="margin-bottom: 5px;">${index + 1}. ${q.trim()}</div>`
//     ).join('');
  
//     Swal.fire({
//       title: 'تفاصيل الامتحان',
//       html: `
//       <div class="container">
//       <div style="text-align: right;">
//         <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
//           <div><strong>المادة:</strong> ${exam.subject}</div>
//           <div><strong>اسم الاختبار:</strong> ${exam.name}</div>
//         </div>
//         <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
//           <div><strong>التاريخ:</strong> ${exam.date}</div>
//           <div><strong>الوقت:</strong> ${exam.time}</div>
//         </div>
//         <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
//           <div><strong>الصف:</strong> ${exam.class}</div>
//           <div><strong>المدة:</strong> ${exam.duration} دقيقة</div>
//         </div>
//         <div style="margin-bottom: 10px;"><strong>الأسئلة:</strong></div>
//         <div style="margin-bottom: 10px;">${questionsFormatted}</div>
//       </div>
//       </div>  
//       `,
//       confirmButtonText: 'حسناً',
//       width: '60%', 
//       heightAuto: false, 
//       customClass: {
//         popup: 'custom-popup', 
//         container: 'custom-container' 
//       }
//     });
//   }
//   goToStep(stepNumber: number) {
//     this.step.set(stepNumber);
//     if (stepNumber === 3) {
//       this.updateFilteredExams();
//     }
//   }
//   private resetForm() {
//     this.newExam.set({ subject: '', name: '', date: '', time: '', questions: '', class: '', examType: '', duration: '' });
//     this.goToStep(1);
//     this.cdr.markForCheck();
//   }
//   downloadExam(exam: any) {
//     const doc = new jsPDF();
//     doc.addFont('assets/fonts/Amiri-Regular.ttf', 'Amiri', 'normal');
//     doc.setFont('Amiri');
//     doc.setFontSize(24);
//     doc.text(exam.name, doc.internal.pageSize.width - 20, 20, { align: 'right' });

//     doc.setFontSize(12);
//     doc.text(`الوقت: ${exam.time}`, doc.internal.pageSize.width - 20, 30, { align: 'right' });
//     doc.text(`المدة: ${exam.duration} دقيقة`, doc.internal.pageSize.width - 20, 40, { align: 'right' });
//     doc.setFontSize(20);
//     doc.text(`المادة: ${exam.subject}`, doc.internal.pageSize.width - 20, 60, { align: 'right' });
//     doc.setFontSize(12);
//     doc.text(`التاريخ: ${exam.date}`, doc.internal.pageSize.width - 20, 70, { align: 'right' });
//     doc.text(`الصف: ${exam.class}`, doc.internal.pageSize.width - 20, 80, { align: 'right' });
//     doc.setFontSize(18);
//     doc.text('الأسئلة:', doc.internal.pageSize.width - 20, 100, { align: 'right' });

//     const questions = exam.questions.split('\n');
//     questions.forEach((q: string, index: number) => {
//       doc.text(`${index + 1}. ${q.trim()}`, doc.internal.pageSize.width - 20, 110 + (index * 10), { align: 'right' });
//     });

//     doc.save(`exam_${exam._id}.pdf`);
//   }
//   getSubjectClass(subject: string): string {
//     return this.subjectColors[subject] || 'default-class';
//   }
//   private subjectColors: { [key: string]: string } = {
//     'اللغة العربية': 'white',
//     'اللغة الإنجليزية': 'blue',
//     'الرياضيات': 'red',
//     'العلوم': 'green'
//   };
  
// }
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
  standalone: true,
  imports: [NgClass, FormsModule],
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css'],
  providers: [DatePipe]
})
export class ExamsComponent {
  // State signals
  step = signal(1);
  searchQuery = signal('');
  selectedSubject = signal<string | null>(null);
  selectedExamType = signal<string>('');
  
  // Data signals
  subjects = signal<any[]>([
    { name: 'اللغة العربية' },
    { name: 'اللغة الإنجليزية' },
    { name: 'الرياضيات' },
    { name: 'العلوم' }
  ]);
  
  filteredSubjects = signal<any[]>([]);
  exams = signal<any[]>([]);
  filteredExams = signal<any[]>([]);

  // New exam form
  newExam = signal({
    subject: '', 
    name: '', 
    date: '', 
    time: '', 
    questions: '', 
    class: '', 
    examType: '', 
    duration: ''
  });

  // Subject colors for styling
  private subjectColors: { [key: string]: string } = {
    'اللغة العربية': 'arabic-class',
    'اللغة الإنجليزية': 'english-class',
    'الرياضيات': 'math-class',
    'العلوم': 'science-class'
  };

  constructor(
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,
    private examService: ExamService,
    private http: HttpClient,
    private router: Router 
  ) {
    // Initialize data
    this.filteredSubjects.set(this.subjects());
    this.loadExams();

    // Effect to watch for changes
    effect(() => {
      if (this.step() === 3) {
        this.updateFilteredExams();
      }
    });
  }

  // Load exams from service or fallback to local JSON
  loadExams() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.loadFallbackData();
      return;
    }
  
    this.examService.getExams().subscribe({
      next: (exams) => {
        this.exams.set(exams);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error loading exams:', err);
        this.loadFallbackData();
      }
    });
  }

  // Fallback to local JSON data
  private loadFallbackData() {
    this.http.get<any>('assets/TeacherData.json').subscribe({
      next: (data) => {
        this.exams.set(data.exams || []);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error loading fallback data:', err);
        this.exams.set([]);
      }
    });
  }

  // Filter subjects based on search query
  filterSubjects() {
    const query = this.searchQuery().toLowerCase();
    this.filteredSubjects.set(
      this.subjects().filter(subject =>
        subject.name.toLowerCase().includes(query)
    ));
  }
  
  // Select subject and move to step 2
  selectSubject(subject: any) {
    this.selectedSubject.set(subject.name);
    this.step.set(2);
  }

  // Select exam type and move to step 3
  selectExamType(type: string) {
    this.selectedExamType.set(type);
    this.step.set(3);
  }

  // Update filtered exams based on selected subject and type
  updateFilteredExams() {
    if (!this.selectedSubject() || !this.selectedExamType()) {
      this.filteredExams.set([]);
      return;
    }
    
    this.filteredExams.set(
      this.exams().filter(exam => 
        exam.subject === this.selectedSubject() && 
        exam.examType === this.selectedExamType()
      )
    );
  }

  // View exam details in a modal
  viewExam(exam: any) {
    const questionsFormatted = exam.questions.split('\n')
      .map((q: string, index: number) => 
        `<div style="margin-bottom: 5px;">${index + 1}. ${q.trim()}</div>`
      ).join('');
  
    Swal.fire({
      title: 'تفاصيل الامتحان',
      html: `
        <div style="text-align: right;">
          <div style="margin-bottom: 10px;">
            <strong>المادة:</strong> ${exam.subject}<br>
            <strong>اسم الاختبار:</strong> ${exam.name}
          </div>
          <div style="margin-bottom: 10px;">
            <strong>التاريخ:</strong> ${this.formatDate(exam.date)}<br>
            <strong>الوقت:</strong> ${exam.time}
          </div>
          <div style="margin-bottom: 10px;">
            <strong>الصف:</strong> ${exam.class}<br>
            <strong>المدة:</strong> ${exam.duration} دقيقة
          </div>
          <div style="margin-bottom: 5px;"><strong>الأسئلة:</strong></div>
          ${questionsFormatted}
        </div>`,
      confirmButtonText: 'حسناً',
      width: '600px'
    });
  }

  // Download exam as PDF
  downloadExam(exam: any) {
    const doc = new jsPDF();
    
    // Add Arabic font support
    doc.addFont('assets/fonts/Amiri-Regular.ttf', 'Amiri', 'normal');
    doc.setFont('Amiri');
    
    // Exam header
    doc.setFontSize(24);
    doc.text(exam.name, doc.internal.pageSize.width - 20, 20, { align: 'right' });

    // Exam details
    doc.setFontSize(12);
    doc.text(`الوقت: ${exam.time}`, doc.internal.pageSize.width - 20, 30, { align: 'right' });
    doc.text(`المدة: ${exam.duration} دقيقة`, doc.internal.pageSize.width - 20, 40, { align: 'right' });
    
    // Subject and class
    doc.setFontSize(20);
    doc.text(`المادة: ${exam.subject}`, doc.internal.pageSize.width - 20, 60, { align: 'right' });
    doc.setFontSize(12);
    doc.text(`التاريخ: ${this.formatDate(exam.date)}`, doc.internal.pageSize.width - 20, 70, { align: 'right' });
    doc.text(`الصف: ${exam.class}`, doc.internal.pageSize.width - 20, 80, { align: 'right' });
    
    // Questions section
    doc.setFontSize(18);
    doc.text('الأسئلة:', doc.internal.pageSize.width - 20, 100, { align: 'right' });

    // Add questions
    const questions = exam.questions.split('\n');
    questions.forEach((q: string, index: number) => {
      doc.text(`${index + 1}. ${q.trim()}`, doc.internal.pageSize.width - 20, 110 + (index * 10), { align: 'right' });
    });

    // Save PDF
    doc.save(`exam_${exam.subject}_${this.selectedExamType()}.pdf`);
  }

  // Format date using DatePipe
  formatDate(dateString: string): string {
    return this.datePipe.transform(dateString, 'yyyy-MM-dd') || dateString;
  }

  // Get CSS class for subject
  getSubjectClass(subject: string): string {
    return this.subjectColors[subject] || 'default-class';
  }

  // Navigate between steps
  goToStep(stepNumber: number) {
    this.step.set(stepNumber);
  }
}