import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../../services/teachers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeacherFormComponent } from '../teacher-form/teacher-form.component';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher',
  imports:[FormsModule],
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  isLoading: boolean = false;
  searchQuery: string = '';

  constructor(
    private TeacherService: TeacherService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.isLoading = true;
    this.TeacherService.getAllTeachers().subscribe({
      next: (teachers: any[]) => {
        this.users = teachers;
        this.filteredUsers = [...this.users];
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error loading teachers:', err);
        this.isLoading = false;
      }
    });
  }

  searchUsers(): void {
    if (!this.searchQuery) {
      this.filteredUsers = [...this.users];
      return;
    }
    
    const query = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter(user => 
      user.name?.toLowerCase().includes(query) || 
      user.email?.toLowerCase().includes(query)
    );
  }

  openModal(teacher?: any): void {
    const modalRef = this.modalService.open(TeacherFormComponent);
    modalRef.componentInstance.teacher = teacher;
    
    modalRef.result.then((result) => {
      if (result === 'saved') {
        this.loadTeachers();
      }
    }).catch(() => {});
  }

  editUser(teacher: any): void {
    this.openModal(teacher);
  }

  deleteTeacher(id: string): void {
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
        this.TeacherService.deleteTeacher(id).subscribe({
          next: () => {
            Swal.fire(
              'تم الحذف!',
              'تم حذف المعلم بنجاح.',
              'success'
            );
            this.loadTeachers();
          },
          error: (err) => {
            console.error('Error deleting teacher:', err);
            Swal.fire(
              'خطأ!',
              'حدث خطأ أثناء محاولة حذف المعلم.',
              'error'
            );
          }
        });
      }
    });
  }

  getImageUrl(imagePath: string): string {
    return this.TeacherService.getImageUrl(imagePath);
  }
}