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
        console.log(" تم تحميل بيانات الطلاب:", this.students);
      },
      error => {
        console.error("خطأ في تحميل البيانات:", error);
      }
    );
  }

  filteredStudents(): any[] {
    if (!this.searchText) {
      return this.students; 
    }
    return this.students.filter(student =>
      student.name.includes(this.searchText)
    );
  }

  getStatusClass(status: string, student: any): string {
    const activeStatus = student.status[0]; 
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

