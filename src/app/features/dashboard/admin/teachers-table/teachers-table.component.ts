import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teachers-table',
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

  filteredTeachers(): any[] {
    if (!this.searchText) {
      return this.teachers; 
    }
    return this.teachers.filter(teacher =>
      teacher.name.includes(this.searchText)
    );
  }

  getStatusClass(status: string, teacher: any): string {
    const activeStatus = teacher.status[0]; 
  
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






