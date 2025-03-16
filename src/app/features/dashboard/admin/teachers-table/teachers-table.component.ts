import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'admin-teachers-table',
  standalone: true,
  templateUrl: './teachers-table.component.html',
  styleUrls: ['./teachers-table.component.css'],
  imports: [CommonModule, FormsModule]
})
export class TeachersTableComponent {
  searchText: string = '';
  teachers: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('/assets/teachers-mock.json').subscribe(
      data => {
        this.teachers = data;
        console.log("✅ تم تحميل بيانات المعلمين:", this.teachers);
      },
      error => {
        console.error("❌ خطأ في تحميل البيانات:", error);
      }
    );
  }

  // ✅ دالة الفلترة التي ستُستخدم في `*ngFor`
  filteredTeachers(): any[] {
    if (!this.searchText) {
      return this.teachers; // إرجاع القائمة الكاملة إذا لم يكن هناك بحث
    }
    return this.teachers.filter(teacher =>
      teacher.name.includes(this.searchText)
    );
  }

  // ✅ ضبط الألوان لكل حالة لتطابق الصورة
  getStatusClass(status: string, teacher: any): string {
    // ✅ تحديد الحالة النشطة فقط بناءً على البيانات القادمة من الـ API
    const activeStatus = teacher.status[0]; // الحالة الأساسية التي نستخدمها
  
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






