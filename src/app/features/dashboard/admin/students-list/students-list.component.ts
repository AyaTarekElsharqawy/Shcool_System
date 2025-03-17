import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../../../services/attendance.service';
import { StudentCardComponent } from '../student-card/student-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'admin-students-list',
  standalone: true,
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css'],
  imports: [CommonModule, StudentCardComponent]
})
export class StudentsListComponent implements OnInit {
  students = [
    { id: 1, name: "أحمد محمد", email: "ahmed@gmail.com", image: "assets/profile.png", studentid: "547385" },
    { id: 2, name: "محمد أحمد", email: "mohamed@gmail.com", image: "assets/profile.png", studentid: "547386" },
    { id: 3, name: "علي حسن", email: "ali@gmail.com", image: "assets/profile.png", studentid: "547387" }
  ];

  presentStudents: any[] = [];

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit() {
    this.loadPresentStudents();
  }

  // ✅ استرجاع بيانات الحضور من `localStorage`
  loadPresentStudents() {
    const storedAttendance = localStorage.getItem('attendance'); // 🔹 جلب الحضور من التخزين
    const attendance = storedAttendance ? JSON.parse(storedAttendance) : {}; // 🔹 تحويل البيانات إلى كائن

    console.log("📌 بيانات الحضور من LocalStorage:", attendance); // ✅ تحقق من البيانات في الكونسول

    // ✅ تحديث القائمة بحيث يتم عرض الطلاب الحاضرين فقط
    this.presentStudents = this.students.filter(student => attendance[student.id] === true);

    console.log("📌 الطلاب الحاضرين:", this.presentStudents); // ✅ تحقق من القائمة بعد التصفية
  }
}
