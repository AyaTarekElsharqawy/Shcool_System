import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from '../../../../services/student.service';
import { StudentFormComponent } from '../student-form/student-form.component';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'admin-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  searchQuery: string = '';
  filteredStudents: any[] = [];
  students: any[] = [];
  isLoading = false;

  constructor(private modalService: NgbModal, private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.isLoading = true;
    this.studentService.getAllStudents().subscribe({
      next: (students) => {
        this.students = students.map(student => ({
          ...student,
          id: student._id
        }));
        this.filteredStudents = [...this.students];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('خطأ في تحميل الطلاب:', err);
        this.isLoading = false;
      }
    });
  }
  trackByStudentId(index: number, student: any): string {
    return student.id;
  }
  searchStudents() {
    this.filteredStudents = this.students.filter((student) =>
      student.name.includes(this.searchQuery) || 
      student.class.includes(this.searchQuery)
    );
  }

  openModal(student: any = null) {
    const modalRef = this.modalService.open(StudentFormComponent, {
      backdrop: 'static',
      keyboard: false,
    });

    if (student) {
      modalRef.componentInstance.studentForm.patchValue({
        name: student.name,
        age: student.age,
        class: student.class,
        guardianPhone: student.guardianPhone,
        whatsapp: student.whatsapp,
        image: student.image
      });
      modalRef.componentInstance.imagePreview = student.image;
    }

    modalRef.result.then(
      (result) => {
        if (result) this.save(result);
      },
      () => {}
    );
  }

  editStudent(student: any) {
    this.openModal(student);
  }

  deleteStudent(id: string) {
    if (!id) return;

    const modalRef = this.modalService.open(ConfirmDeleteModalComponent, {
      backdrop: 'static',
      keyboard: false,
    });

    modalRef.componentInstance.itemType = 'هذا الطالب';

    modalRef.result.then(
      (confirmed) => {
        if (confirmed) {
          this.studentService.deleteStudent(id).subscribe({
            next: () => {
              this.students = this.students.filter(student => student._id !== id);
              this.filteredStudents = [...this.students];
              console.log('تم حذف الطالب بنجاح');
            },
            error: (err) => console.error('فشل حذف الطالب:', err)
          });
        }
      },
      () => {}
    );
  }

  save(formData: any) {
    if (!formData.name || !formData.class) {
      console.log('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const imageFile = formData.imageFile;
    const studentId = formData._id;

    const operation = studentId
      ? this.studentService.updateStudent(studentId, formData, imageFile)
      : this.studentService.addStudent(formData, imageFile);

    operation.subscribe({
      next: (savedStudent) => {
        console.log('تم الحفظ بنجاح:', savedStudent);
        this.loadStudents();
      },
      error: (err) => console.error('خطأ أثناء الحفظ:', err)
    });
  }
}
