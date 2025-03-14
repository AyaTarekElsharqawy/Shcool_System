import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-students-table',
  standalone: true,
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  imports: [CommonModule, FormsModule]
})
export class StudentsTableComponent {
  searchText: string = '';
  students: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('/assets/students-mock.json').subscribe(
      data => {
        this.students = data;
        console.log("✅ تم تحميل بيانات الطلاب:", this.students);
      },
      error => {
        console.error("❌ خطأ في تحميل البيانات:", error);
      }
    );
  }

  // ✅ دالة الفلترة التي ستُستخدم في `*ngFor`
  filteredStudents(): any[] {
    if (!this.searchText) {
      return this.students; // إرجاع القائمة الكاملة إذا لم يكن هناك بحث
    }
    return this.students.filter(student =>
      student.name.includes(this.searchText)
    );
  }

  // ✅ ضبط الألوان لكل حالة لتطابق الصورة
  getStatusClass(status: string, student: any): string {
    // ✅ تحديد الحالة النشطة فقط بناءً على البيانات القادمة من الـ API
    const activeStatus = student.status[0]; // الحالة الأساسية التي نستخدمها
  
    if (status === activeStatus) {
      switch (status) {
        case 'تم السداد': return 'badge bg-primary'; 
        case 'سداد جزئي': return 'badge bg-purple'; 
        case 'مؤجل': return 'badge bg-warning text-dark';
        case 'خصم': return 'badge bg-danger'; 
      }
    }
    return 'badge bg-secondary';
  }
}

