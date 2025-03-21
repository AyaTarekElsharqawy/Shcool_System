import { Component } from '@angular/core';
import { AttendanceService } from '../../../../services/attendance.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attendance',
  standalone: true,
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
  imports: [CommonModule, FormsModule]
})
export class AttendanceComponent {
  selectedDay: string = '';
  selectedClass: string = '';

  days: string[] = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];
  classes: string[] = ['KG1', 'KG2', 'KG3'];

  students = [
    { id: 1, name: "أحمد محمد", email: "ahmed@gmail.com", image: "assets/profile.png", class: "KG1", present: false },
    { id: 2, name: "محمد أحمد", email: "mohamed@gmail.com", image: "assets/profile.png", class: "KG2", present: false },
    { id: 3, name: "علي حسن", email: "ali@gmail.com", image: "assets/profile.png", class: "KG1", present: false },
    {
      "id": 4,
      "name": "خالد سمير",
      image: "assets/profile.png",
      email: "khaled@gmail.com",
      class: "KG3"
    },
    {
      "id": 5,
      "name": "يوسف أحمد",
      image: "assets/profile.png",
      email:"yousef@gmail.com",
      class: "KG2"
    },
    { id: 6, name: " عمر سعيد", email: "omar@gmail.com", image: "assets/profile.png", class: "KG1", present: false },
    { id: 7, name: " ياسر محمود", email: "yasser@gmail.com", image: "assets/profile.png", class: "KG3", present: false },
    { id: 8, name: "حسام خالد", email: "hassan@gmail.com", image: "assets/profile.png", class: "KG2", present: false },
  ];
  filteredStudents = [...this.students];

  constructor(private attendanceService: AttendanceService) {
    this.loadAttendance();
  }

  toggleAttendance(student: any) {
    student.present = !student.present;
    this.attendanceService.setAttendance(student.id, student.present);
    this.updateFilteredStudents();
  }

  updateFilteredStudents() {
    this.filteredStudents = this.students.filter(student =>
      this.selectedClass ? student.class === this.selectedClass : true
    );
  }

  loadAttendance() {
    this.attendanceService.attendance$.subscribe(attendance => {
      this.students.forEach(student => {
        student.present = attendance[student.id] || false;
      });
      this.updateFilteredStudents();
    });
  }
}