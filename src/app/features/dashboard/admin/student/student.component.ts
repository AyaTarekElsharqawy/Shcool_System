
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentFormComponent } from '../student-form/student-form.component';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';
import { StudentService } from '../../../../services/student.service'; // استوردنا الـ Service

interface Student {
  _id?: string; // غيرنا من id لـ _id عشان يتطابق مع الـ Backend
  name: string;
  age: number;
  classroom: string;
  guardianPhone: string;
  whatsapp: string;
  image: string;
}

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  searchQuery: string = "";
  filteredStudents: Student[] = [];
  students: Student[] = [];

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private studentService: StudentService // ضفنا الـ Service
  ) {}

  ngOnInit() {
    this.loadStudents(); // لما الكومبوننت يتحمل، نجيب الطلاب من الـ Backend
  }

  // جلب الطلاب من الـ API
  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
        this.filteredStudents = [...this.students];
      },
      error: (err) => {
        console.error('Failed to load students:', err);
        alert('❌ فشل في جلب الطلاب');
      }
    });
  }

  openModal(student: Student | null = null) {
    const modalRef = this.modalService.open(StudentFormComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    if (student) {
      // لو بنعدل، نعبي الفورم ببيانات الطالب
      modalRef.componentInstance.studentForm = this.fb.group({
        name: [student.name || '', Validators.required],
        age: [student.age || null, [Validators.required, Validators.min(3)]],
        classroom: [student.classroom || '', Validators.required],
        guardianPhone: [student.guardianPhone || '', [Validators.required, Validators.pattern(/^\d{11}$/)]],
        whatsapp: [student.whatsapp || '', [Validators.required, Validators.pattern(/^\d{11}$/)]],
        image: [student.image || '']
      });
      modalRef.componentInstance.studentId = student._id; // بنمرر الـ _id للـ Update
    } else {
      // لو بنضيف، نعمل فورم فاضي
      modalRef.componentInstance.studentForm = this.fb.group({
        name: ['', Validators.required],
        age: [null, [Validators.required, Validators.min(3)]],
        classroom: ['', Validators.required],
        guardianPhone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
        whatsapp: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
        image: ['']
      });
    }

    modalRef.result.then(
      (result) => {
        if (result) {
          this.loadStudents(); // نعيد تحميل الطلاب بعد الإضافة أو التعديل
        }
      },
      () => {}
    );
  }

  searchStudents() {
    this.filteredStudents = this.students.filter((student) =>
      student.name.includes(this.searchQuery) || student.classroom.includes(this.searchQuery)
    );
  }

  editStudent(student: Student) {
    this.openModal(student);
  }

  deleteStudent(id: string) { // غيرنا من number لـ string عشان الـ _id نص
    const modalRef = this.modalService.open(ConfirmDeleteModalComponent, {
      backdrop: 'static',
      keyboard: false,
    });

    modalRef.componentInstance.itemType = 'هذا الطالب';

    modalRef.result.then(
      (confirmed) => {
        if (confirmed) {
          this.studentService.deleteStudent(id).subscribe({
            next: (response) => {
              alert('✅ تم حذف الطالب بنجاح');
              this.loadStudents(); // نعيد تحميل الطلاب بعد الحذف
            },
            error: (err) => {
              console.error('Failed to delete student:', err);
              alert('❌ فشل في حذف الطالب');
            }
          });
        }
      },
      () => {}
    );
  }
}