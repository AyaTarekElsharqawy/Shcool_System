import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-attendance',
  standalone: true,
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
  imports: [CommonModule, FormsModule]
})
export class AttendanceComponent {
  students = [
    { id: 1, name: "أحمد محمد", email: "ahmed@gmail.com", image: "assets/profile.png", class: "KG1", present: false },
    { id: 1, name: "أحمد محمد", email: "ahmed@gmail.com", image: "assets/profile.png", class: "KG1", present: false },
    { id: 1, name: "أحمد محمد", email: "ahmed@gmail.com", image: "assets/profile.png", class: "KG1", present: false },
    { id: 1, name: "أحمد محمد", email: "ahmed@gmail.com", image: "assets/profile.png", class: "KG1", present: false },
    { id: 1, name: "أحمد محمد", email: "ahmed@gmail.com", image: "assets/profile.png", class: "KG1", present: false },
    { id: 1, name: "أحمد محمد", email: "ahmed@gmail.com", image: "assets/profile.png", class: "KG1", present: false },
    { id: 1, name: "أحمد محمد", email: "ahmed@gmail.com", image: "assets/profile.png", class: "KG1", present: false },
    { id: 1, name: "أحمد محمد", email: "ahmed@gmail.com", image: "assets/profile.png", class: "KG1", present: false },
    { id: 1, name: "أحمد محمد", email: "ahmed@gmail.com", image: "assets/profile.png", class: "KG1", present: false },
    { id: 1, name: "أحمد محمد", email: "ahmed@gmail.com", image: "assets/profile.png", class: "KG1", present: false },
    { id: 1, name: "أحمد محمد", email: "ahmed@gmail.com", image: "assets/profile.png", class: "KG1", present: false },
    { id: 1, name: "أحمد محمد", email: "ahmed@gmail.com", image: "assets/profile.png", class: "KG1", present: false },
    { id: 1, name: "أحمد محمد", email: "ahmed@gmail.com", image: "assets/profile.png", class: "KG1", present: false },
    { id: 1, name: "أحمد محمد", email: "ahmed@gmail.com", image: "assets/profile.png", class: "KG1", present: false },
    { id: 1, name: "أحمد محمد", email: "ahmed@gmail.com", image: "assets/profile.png", class: "KG1", present: false },
    { id: 1, name: "أحمد محمد", email: "ahmed@gmail.com", image: "assets/profile.png", class: "KG1", present: false },
    { id: 1, name: "أحمد محمد", email: "ahmed@gmail.com", image: "assets/profile.png", class: "KG1", present: false },
    { id: 1, name: "أحمد محمد", email: "ahmed@gmail.com", image: "assets/profile.png", class: "KG1", present: false },
    { id: 1, name: "أحمد محمد", email: "ahmed@gmail.com", image: "assets/profile.png", class: "KG1", present: false },
    
    { id: 2, name: "محمد أحمد", email: "mohamed@gmail.com", image: "assets/profile.png", class: "KG2", present: false },
    { id: 3, name: "علي يوسف", email: "ali@gmail.com", image: "assets/profile.png", class: "KG3", present: false },
    { id: 4, name: "سارة حسن", email: "sara@gmail.com", image: "assets/profile.png", class: "KG1", present: false },
    { id: 5, name: "محمود عمر", email: "mahmoud@gmail.com", image: "assets/profile.png", class: "KG2", present: false },
    { id: 6, name: "نور خالد", email: "noor@gmail.com", image: "assets/profile.png", class: "KG3", present: false },
    { id: 7, name: "ياسين عبد الله", email: "yassin@gmail.com", image: "assets/profile.png", class: "KG1", present: false },
    { id: 8, name: "ليلى عمر", email: "laila@gmail.com", image: "assets/profile.png", class: "KG2", present: false }
  ];

  classes = ["KG1", "KG2", "KG3"];
  days = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس"];

  selectedClass = "KG1"; // يبدأ بقيمة افتراضية
  selectedDay = "السبت";

  get filteredStudents() {
    return this.students.filter(student => student.class === this.selectedClass);
  }

  toggleAttendance(student: any) {
    student.present = !student.present;
  }
}
