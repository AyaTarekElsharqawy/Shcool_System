import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../../../services/attendance.service';
import { CommonModule } from '@angular/common';
import { StudentCardComponent } from '../student-card/student-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [CommonModule,StudentCardComponent,FormsModule],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
})
export class AttendanceComponent  implements OnInit {
   students = [
    {
      "id": 1,
      "name": "أحمد محمد علي",
      "image": "assets/profile.png",
      "studentid": "547385",
      email: "ahmed@gmail.com",
      grade:1,
      class: "KG1"
    },
    {
      "id": 2,
      "name": "محمد أحمد حسن",
      "image": "assets/profile.png",
      "studentid": "547386",
       email: "mohamed@gmail.com",
       grade:2,
       class: "KG2"
    },
    {
      "id": 3,
      "name": "علي يوسف محمود",
      "image": "assets/profile.png",
      "studentid": "547387",
      grade:3,
      email: "ali@gmail.com",
      class: "KG1"
    },
    {
      "id": 4,
      "name": "خالد سمير",
      "image": "assets/profile.png",
      "studentid": "547388",
      grade:1,
      email: "khaled@gmail.com",
      class: "KG3"
    },
    {
      "id": 5,
      "name": "يوسف أحمد",
      "image": "assets/profile.png",
      "studentid": "547389",
      email:"yousef@gmail.com",
      grade:2,
      class: "KG2"
    },
    {
      "id": 6,
      "name": "عمر سعيد",
      "image": "assets/profile.png",
      "studentid": "547390",
      grade:3,
      email: "omar@gmail.com",
      class: "KG1"
    },
    {
      "id": 7,
      "name": "ياسر محمود",
      "image": "assets/profile.png",
      "studentid": "547391",
      grade:1,
      email: "yasser@gmail.com",
      class: "KG3"
    },
    {
      "id": 8,
      "name": "حسام خالد",
      "image": "assets/profile.png",
      "studentid": "547392",
      grade:2,
      email: "hassan@gmail.com",
      class: "KG2"
    },
    {
      "id": 9,
      "name": "محمود ياسين",
      "image": "assets/profile.png",
      "studentid": "547393",
      grade:3,
      email: "mahmoud@gmail.com",
      class: "KG1"
    },
    {
      "id": 10,
      "name": "إبراهيم حمدي",
      "image": "assets/profile.png",
      "studentid": "547394",
      grade:1,
      email: "ibrahim@gmail.com",
      class: "KG3"
    },
    {
      "id": 11,
      "name": "حسن مصطفى",
      "image": "assets/profile.png",
      "studentid": "547395",
      grade:2,
      email: "hassan@gmail.com",
      class: "KG2"
    },
    {
      "id": 12,
      "name": "سامي عبد الله",
      "image": "assets/profile.png",
      "studentid": "547396",
      grade:3,
      email: "sami@gmail.com",
      class: "KG1"
    },
    {
      "id": 13,
      "name": "عبد الرحمن طارق",
      "image": "assets/profile.png",
      "studentid": "547397",
      grade:1,
      email: "abd@gmail.com",
      class: "KG3"
    },
    {
      "id": 14,
      "name": "مصطفى عبد العزيز",
      "image": "assets/profile.png",
      "studentid": "547398",
      grade:2,
      email: "mustafa@gmail.com",
      class: "KG2"
    },
    {
      "id": 15,
      "name": "أمين يوسف",
      "image": "assets/profile.png",
      "studentid": "547399",
      grade:3,
      email: "amyn@gmail.com",
      class: "KG1"
    },
    {
      "id": 16,
      "name": "هيثم محمود",
      "image": "assets/profile.png",
      "studentid": "547400",
      grade:1,
      email: "hitham@gmail.com",
      class: "KG3"
    },
    {
      "id": 17,
      "name": "جمال عبد الحميد",
      "image": "assets/profile.png",
      "studentid": "547401",
      grade:2,
      email: "jamal@gmail.com",
      class: "KG2"
    },
    {
      "id": 18,
      "name": "كريم محمد",
      "image": "assets/profile.png",
      "studentid": "547402",
      grade:3,
      email: "karem@gmail.com",
      class: "KG1"
    },
    {
      "id": 19,
      "name": "سامر علي",
      "image": "assets/profile.png",
      "studentid": "547403",
      grade:1,
      email: "samir@gmail.com",
      class: "KG3"
    },
    {
      "id": 20,
      "name": "رامي سمير",
      "image": "assets/profile.png",
      "studentid": "547404",
      grade:2,
      email: "rami@gmail.com",
      class: "KG2"
    },
    {
      "id": 21,
      "name": "شريف محمود",
      "image": "assets/profile.png",
      "studentid": "547405",
      grade:3,
      email: "sharif@gmail.com",
      class: "KG1"
    },
    {
      "id": 22,
      "name": "مروان أحمد",
      "image": "assets/profile.png",
      "studentid": "547406",
      grade:1,
      email: "marwan@gmail.com",
      class: "KG3"
    },
    {
      "id": 23,
      "name": "أدهم طارق",
      "image": "assets/profile.png",
      "studentid": "547407",
      grade:2,
      email: "adham@gmail.com",
      class: "KG2"
    },
    {
      "id": 24,
      "name": "ماجد علي",
      "image": "assets/profile.png",
      "studentid": "547408",
      grade:3,
      email: "majed@gmail.com",
      class: "KG1"
    }
  ];
  presentStudents: any[] = [];
  selectedClass: string = '';
  classes: string[] = ['KG1', 'KG2', 'KG3'];

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit() {
    this.loadPresentStudents();

    this.attendanceService.attendance$.subscribe(() => {
      this.loadPresentStudents();
    });
  }

  updatePresentStudents() {
    const attendance = this.attendanceService.getAttendance();
    this.presentStudents = this.students.filter(student =>
      attendance[student.id] === true && (this.selectedClass ? student.class === this.selectedClass : true)
    );
  }

  loadPresentStudents() {
    this.updatePresentStudents();
  }
}