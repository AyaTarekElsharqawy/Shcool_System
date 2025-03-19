import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AddExamMarksComponent } from '../../teachers/add-exam-marks/add-exam-marks.component';

@Component({
  selector: 'admin-student-card',
  imports: [CommonModule, FormsModule, AddExamMarksComponent],
  templateUrl: './student-card.component.html',
  styleUrl: './student-card.component.css'
})
export class StudentCardComponent {
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

  selectedStudent!: string;

  setSelectedStudent(id: string) {
    this.selectedStudent = id;
  }

  constructor(private router:Router){}

  @Input() studentImage!: string;
  @Input() studentName!: string;
  @Input() studentID!: string;


  handleRedirectToAddMarks(id:string)
  {
   this.router.navigate(['/teacher/add-exam',id])

  }

 isOpen = false; // يتحكم في إظهار وإخفاء الفورم

  toggleForm() {
    this.isOpen = !this.isOpen;
  }
  currentDate: Date = new Date(); // تعيين التاريخ الحالي

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1); // الانتقال للشهر السابق
    this.currentDate = new Date(this.currentDate); // تحديث الكائن
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1); // الانتقال للشهر التالي
    this.currentDate = new Date(this.currentDate); // تحديث الكائن
  }

  get currentMonth(): string {
    return this.currentDate.toLocaleString('ar-EG', { month: 'long' }); // عرض اسم الشهر باللغة العربية
  }
}
