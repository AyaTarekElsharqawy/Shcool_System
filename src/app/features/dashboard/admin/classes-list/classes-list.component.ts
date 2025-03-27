import { Component, OnInit } from '@angular/core';
import { ClassCardComponent } from '../class-card/class-card.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StudentService } from '../../../../services/student.service'; // استيراد الـ StudentService

@Component({
  selector: 'app-classes-list',
  imports: [ClassCardComponent, CommonModule],
  templateUrl: './classes-list.component.html',
  styleUrl: './classes-list.component.css',
  host: {
    'id': 'classes-list-1'
  }
})
export class ClassesListComponent implements OnInit {
  classes: { students: number, grade: number, className: string }[] = []; // هنعدّل المصفوفة دي عشان تكون ديناميكية

  constructor(
    private router: Router,
    private studentService: StudentService // حقن الـ StudentService
  ) {}

  ngOnInit() {
    // جلب الطلاب عند تهيئة الكومبوننت
    this.loadStudents();
  }

  // دالة لجلب الطلاب من الـ StudentService
  loadStudents() {
    this.studentService.getAllStudents().subscribe({
      next: (students) => {
        console.log('البيانات اللي جاية من الـ API:', students); // اطبعي البيانات عشان نتأكد منها
        this.calculateClasses(students); // حساب الفصول بناءً على الطلاب
      },
      error: (error) => {
        console.error('خطأ أثناء جلب الطلاب:', error);
      }
    });
  }

  // دالة لحساب عدد الطلاب في كل فصل
  calculateClasses(students: any[]) {
    // نعمل فلترة للطلاب بناءً على الفصل (KG1, KG2, KG3)
    const kg1Students = students.filter(student => student.studentClass?.toUpperCase() === 'KG1').length;
    const kg2Students = students.filter(student => student.studentClass?.toUpperCase() === 'KG2').length;
    const kg3Students = students.filter(student => student.studentClass?.toUpperCase() === 'KG3').length;

    // نعبّي المصفوفة classes بناءً على عدد الطلاب في كل فصل
    this.classes = [
      { students: kg1Students, grade: 1, className: 'KG1' },
      { students: kg2Students, grade: 2, className: 'KG2' },
      { students: kg3Students, grade: 3, className: 'KG3' }
    ];

    console.log('الفصول بعد الحساب:', this.classes); // اطبعي الفصول عشان نتأكد
  }

  goToStudentsList(classData: { students: number; grade: number; className: string }) {
    this.router.navigate(['/admin/students-list'], { 
      queryParams: { students: classData.students, grade: classData.grade, className: classData.className } 
    });
  }
}
