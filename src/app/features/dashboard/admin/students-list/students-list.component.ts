import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../../../services/attendance.service';
import { CommonModule } from '@angular/common';
import { StudentCardComponent } from '../student-card/student-card.component';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students-list',
  standalone: true,
=======
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AddExamMarksComponent } from '../../teachers/add-exam-marks/add-exam-marks.component';
@Component({
  selector: 'admin-students-list',
  imports: [CommonModule,StudentCardComponent,AddExamMarksComponent],
>>>>>>> origin/Salma
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css'],
  imports: [CommonModule, StudentCardComponent,FormsModule]
})
<<<<<<< HEAD
export class StudentsListComponent implements OnInit {
  students = [
    { id: 1, name: "أحمد محمد", email: "ahmed@gmail.com", image: "assets/profile.png", studentid: "547385", class: "KG1" },
    { id: 2, name: "محمد أحمد", email: "mohamed@gmail.com", image: "assets/profile.png", studentid: "547386", class: "KG2" },
    { id: 3, name: "علي حسن", email: "ali@gmail.com", image: "assets/profile.png", studentid: "547387", class: "KG1" },
    { id: 4, name: "مريم خالد", email: "mariam@gmail.com", image: "assets/profile.png", studentid: "547388", class: "KG3" },
    { id: 5, name: "فاطمة علي", email: "fatma@gmail.com", image: "assets/profile.png", studentid: "547389", class: "KG2" }
  ];
=======
export class StudentsListComponent {
   students = [
    {
      "id": 1,
      "name": "أحمد محمد علي",
      "image": "assets/profile.png",
      "studentid": "547385"
    },
    {
      "id": 2,
      "name": "محمد أحمد حسن",
      "image": "assets/profile.png",
      "studentid": "547386"
    },
    {
      "id": 3,
      "name": "علي يوسف محمود",
      "image": "assets/profile.png",
      "studentid": "547387"
    },
    {
      "id": 4,
      "name": "خالد سمير",
      "image": "assets/profile.png",
      "studentid": "547388"
    },
    {
      "id": 5,
      "name": "يوسف أحمد",
      "image": "assets/profile.png",
      "studentid": "547389"
    },
    {
      "id": 6,
      "name": "عمر سعيد",
      "image": "assets/profile.png",
      "studentid": "547390"
    },
    {
      "id": 7,
      "name": "ياسر محمود",
      "image": "assets/profile.png",
      "studentid": "547391"
    },
    {
      "id": 8,
      "name": "حسام خالد",
      "image": "assets/profile.png",
      "studentid": "547392"
    },
    {
      "id": 9,
      "name": "محمود ياسين",
      "image": "assets/profile.png",
      "studentid": "547393"
    },
    {
      "id": 10,
      "name": "إبراهيم حمدي",
      "image": "assets/profile.png",
      "studentid": "547394"
    },
    {
      "id": 11,
      "name": "حسن مصطفى",
      "image": "assets/profile.png",
      "studentid": "547395"
    },
    {
      "id": 12,
      "name": "سامي عبد الله",
      "image": "assets/profile.png",
      "studentid": "547396"
    },
    {
      "id": 13,
      "name": "عبد الرحمن طارق",
      "image": "assets/profile.png",
      "studentid": "547397"
    },
    {
      "id": 14,
      "name": "مصطفى عبد العزيز",
      "image": "assets/profile.png",
      "studentid": "547398"
    },
    {
      "id": 15,
      "name": "أمين يوسف",
      "image": "assets/profile.png",
      "studentid": "547399"
    },
    {
      "id": 16,
      "name": "هيثم محمود",
      "image": "assets/profile.png",
      "studentid": "547400"
    },
    {
      "id": 17,
      "name": "جمال عبد الحميد",
      "image": "assets/profile.png",
      "studentid": "547401"
    },
    {
      "id": 18,
      "name": "كريم محمد",
      "image": "assets/profile.png",
      "studentid": "547402"
    },
    {
      "id": 19,
      "name": "سامر علي",
      "image": "assets/profile.png",
      "studentid": "547403"
    },
    {
      "id": 20,
      "name": "رامي سمير",
      "image": "assets/profile.png",
      "studentid": "547404"
    },
    {
      "id": 21,
      "name": "شريف محمود",
      "image": "assets/profile.png",
      "studentid": "547405"
    },
    {
      "id": 22,
      "name": "مروان أحمد",
      "image": "assets/profile.png",
      "studentid": "547406"
    },
    {
      "id": 23,
      "name": "أدهم طارق",
      "image": "assets/profile.png",
      "studentid": "547407"
    },
    {
      "id": 24,
      "name": "ماجد علي",
      "image": "assets/profile.png",
      "studentid": "547408"
    }
  ];


  selectedStudent: any = null;

  onStudentSelected(student: any) {
    this.selectedStudent = student;
  }
  isOpen = false;

  toggleForm() {
    this.isOpen = !this.isOpen;
  }
  currentDate: Date = new Date();

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.currentDate = new Date(this.currentDate);
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.currentDate = new Date(this.currentDate);
  }

  get currentMonth(): string {
    return this.currentDate.toLocaleString('ar-EG', { month: 'long' });
  }


>>>>>>> origin/Salma

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