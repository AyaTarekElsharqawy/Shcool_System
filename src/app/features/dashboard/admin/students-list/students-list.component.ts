
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../../services/student.service'; // استيراد الـ StudentService

@Component({
  selector: 'app-students-list',
  imports: [CommonModule],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.css',
  host: {
    'id': 'students-list-1'
  }
})
export class StudentsListComponent implements OnInit {
  students: any[] = []; 
  filteredStudents: any[] = []; 
  selectedClass: string = ''; 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService // حقن الـ StudentService
  ) {}

  ngOnInit() {
    // جلب الفصل المختار من الـ queryParams
    this.route.queryParams.subscribe(params => {
      this.selectedClass = params['className'] || ''; // جلب الفصل (مثلاً KG3)
      console.log('الفصل المختار من الـ queryParams:', this.selectedClass);
      this.loadStudents(); // جلب الطلاب بعد تحديد الفصل
    });
  }

  // دالة لجلب الطلاب من الـ StudentService
  loadStudents() {
    this.studentService.getAllStudents().subscribe({
      next: (students) => {
        console.log('البيانات اللي جاية من الـ API:', students); // اطبعي البيانات عشان نتأكد منها
        this.students = students.map(student => ({
          ...student,
          studentClass: student.studentClass ? student.studentClass.toUpperCase() : student.studentClass, // التأكد من إن studentClass كابيتال (KG1, KG2, KG3)
          image: this.studentService.getImageUrl(student.image) // تحويل رابط الصورة
        }));
        this.filterStudents(); // تطبيق الفلترة بعد جلب الطلاب
      },
      error: (error) => {
        console.error('خطأ أثناء جلب الطلاب:', error);
      }
    });
  }

  // دالة لفلترة الطلاب بناءً على الفصل المختار
  filterStudents() {
    if (this.selectedClass) {
      this.filteredStudents = this.students.filter(student => 
        student.studentClass === this.selectedClass
      );
    } else {
      this.filteredStudents = [...this.students]; // لو مفيش فصل مختار، يعرض كل الطلاب
    }
    console.log('الطلاب بعد الفلترة:', this.filteredStudents);
  }
}
