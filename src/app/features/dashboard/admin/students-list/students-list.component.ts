import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../../../services/attendance.service';
import { CommonModule } from '@angular/common';
import { StudentCardComponent } from '../student-card/student-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'admin-students-list',
  standalone: true,
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css'],
  imports: [CommonModule, StudentCardComponent,FormsModule]
})
export class StudentsListComponent implements OnInit {
  students = [
    { id: 1, name: "أحمد محمد", email: "ahmed@gmail.com", image: "assets/profile.png", studentid: "547385", class: "KG1" },
    { id: 2, name: "محمد أحمد", email: "mohamed@gmail.com", image: "assets/profile.png", studentid: "547386", class: "KG2" },
    { id: 3, name: "علي حسن", email: "ali@gmail.com", image: "assets/profile.png", studentid: "547387", class: "KG1" },
    { id: 4, name: "مريم خالد", email: "mariam@gmail.com", image: "assets/profile.png", studentid: "547388", class: "KG3" },
    { id: 5, name: "فاطمة علي", email: "fatma@gmail.com", image: "assets/profile.png", studentid: "547389", class: "KG2" }
  ];

  presentStudents: any[] = [];
  selectedClass: string = '';
  classes: string[] = ['KG1', 'KG2', 'KG3'];

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit() {
    this.loadPresentStudents();

    // الاشتراك في التغييرات
    this.attendanceService.attendance$.subscribe(() => {
      this.loadPresentStudents();
    });
  }

  // تحديث الطلاب الحاضرين بناءً على الفصل المحدد
  updatePresentStudents() {
    const attendance = this.attendanceService.getAttendance();
    this.presentStudents = this.students.filter(student =>
      attendance[student.id] === true && (this.selectedClass ? student.class === this.selectedClass : true)
    );
    console.log("📌 الطلاب الحاضرين بعد التصفية:", this.presentStudents);
  }

  // تحميل الطلاب الحاضرين
  loadPresentStudents() {
    this.updatePresentStudents();
  }
}