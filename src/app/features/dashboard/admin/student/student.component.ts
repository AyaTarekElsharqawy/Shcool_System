import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from '../../../../services/student.service';
import { StudentFormComponent } from '../student-form/student-form.component';
import Swal from 'sweetalert2';

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
  isLoading: boolean = false;

  constructor(
    private modalService: NgbModal, 
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading = true;
    this.studentService.getAllStudents().subscribe({
      next: (students: any) => {
        this.students = students;
        this.filteredStudents = [...this.students];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading students:', err);
        this.isLoading = false;
        Swal.fire({
          title: 'خطأ',
          text: 'فشل تحميل بيانات الطلاب',
          icon: 'error',
          confirmButtonText: 'حسناً'
        });
      }
    });
  }

  searchStudents(): void {
    if (!this.searchQuery) {
      this.filteredStudents = [...this.students];
      return;
    }
    
    const query = this.searchQuery.toLowerCase();
    this.filteredStudents = this.students.filter(student => 
      student.name?.toLowerCase().includes(query) || 
      student.studentClass?.toLowerCase().includes(query)
    );
  }

  openModal(student?: any): void {
    const modalRef = this.modalService.open(StudentFormComponent);
    modalRef.componentInstance.student = student;

    modalRef.result.then((result) => {
      if (result === 'saved') {
        this.loadStudents();
      }
    }).catch(() => {});
  }

  editStudent(student: any): void {
    this.openModal(student);
  }

  deleteStudent(id: string): void {
         Swal.fire({
              title: 'هل أنت متأكد؟',
              text: 'لن تتمكن من استعادة هذا المعلم بعد الحذف!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'نعم، احذفه!',
              cancelButtonText: 'إلغاء',
              reverseButtons: true
            }).then((result) => {
        if (result.isConfirmed) {
          this.studentService.deleteStudent(id).subscribe({
            next: () => {
              Swal.fire({
                title: 'تم الحذف!',
                text: 'تم حذف الطالب بنجاح',
                icon: 'success',
                confirmButtonText: 'حسناً'
              });
              this.loadStudents();
            },
            error: (err) => {
              console.error('Error deleting student:', err);
              Swal.fire({
                title: 'خطأ',
                text: 'فشل حذف الطالب',
                icon: 'error',
                confirmButtonText: 'حسناً'
              });
            }
          });
        }
      },
      () => {}
    );
  }

  getImageUrl(imagePath: string): string {
    return this.studentService.getImageUrl(imagePath);
  }
}