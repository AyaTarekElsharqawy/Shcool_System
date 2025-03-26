
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeacherFormComponent } from '../teacher-form/teacher-form.component';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';
import { TeacherService } from '../../../../services/teachers.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'admin-teacher',
  standalone: true,
  imports:[FormsModule],
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  searchQuery: string = '';
  filteredUsers: any[] = [];
  users: any[] = [];
  alertMessage: string = '';
  showAlert: boolean = false;
  alertType: 'success' | 'danger' = 'success';
  isLoading = false;
  router: any;
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  private showAlertMessage(message: string, type: 'success' | 'danger') {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 3000);
  }

  loadTeachers() {
    this.isLoading = true; 
    this.teacherService.getAllTeachers().subscribe({
      next: (teachers) => {
        this.users = teachers.map(teacher => ({
          ...teacher,
          id: teacher._id 
        }));
        this.filteredUsers = [...this.users];
        this.isLoading = false;
      },
      error: (err) => {
        this.handleTeacherError(err);
        this.isLoading = false;
      }
    });
  }
  private handleTeacherError(err: any) {
    console.error('Error details:', {
      status: err.status,
      message: err.message,
      error: err.error,
      url: err.url
    });
  
    if (err.status === 0) {
      this.showAlertMessage('تعذر الاتصال بالخادم. يرجى التحقق من اتصال الشبكة', 'danger');
    } else if (err.status === 401) {
      this.showAlertMessage('انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى', 'danger');
      this.router.navigate(['/login']);
    } else if (err.status === 500) {
      this.showAlertMessage('حدث خطأ في الخادم، يرجى المحاولة لاحقاً', 'danger');
    } else {
      this.showAlertMessage('حدث خطأ أثناء جلب البيانات: ' + (err.error?.message || ''), 'danger');
    }
  }

  openModal(user: any = null) {
    const modalRef = this.modalService.open(TeacherFormComponent, {
      backdrop: 'static',
      keyboard: false,
    });
  
    if (user) {
      modalRef.componentInstance.teacherForm.patchValue({
        name: user.name,
        age: user.age,
        phone: user.phone,
        email: user.email,
        specialization: user.degree, 
        subject: user.subject,
        image: user.image
      });
      modalRef.componentInstance.imagePreview = this.teacherService.getImageUrl(user.image);
    }
  
    modalRef.result.then(
      (result) => {
        if (result) this.save(result);
      },
      () => {}
    );
  }

  searchUsers() {
    this.filteredUsers = this.users.filter((user) =>
      user.name.includes(this.searchQuery) || 
      user.email.includes(this.searchQuery)
    );
  }

  editUser(user: any) {
    this.openModal(user);
  }
  getImageUrl(imagePath: string): string {
    return this.teacherService.getImageUrl(imagePath);
  }
  deleteTeacher(id: string) {
    if (!id) {
      this.showAlertMessage('معرف المعلم غير صالح', 'danger');
      return;
    }
  
    const modalRef = this.modalService.open(ConfirmDeleteModalComponent, {
      backdrop: 'static',
      keyboard: false,
    });
  
    modalRef.componentInstance.itemType = 'هذا المعلم';
    
    modalRef.result.then(
      (confirmed) => {
        if (confirmed) {
          this.teacherService.deleteTeacher(id).subscribe({
            next: () => {
              this.users = this.users.filter(teacher => teacher._id !== id);
              this.filteredUsers = [...this.users];
              this.showAlertMessage('تم حذف المعلم بنجاح', 'success');
            },
            error: (err) => {
              console.error('تفاصيل خطأ الحذف:', {
                status: err.status,
                message: err.message,
                error: err.error
              });
              this.showAlertMessage('فشل في حذف المعلم: ' + (err.error?.message || ''), 'danger');
            }
          });
        }
      },
      () => {}
    );
  }
  save(formData: any) {
    
    if (!formData.name || !formData.email || !formData.subject) {
      this.showAlertMessage('الرجاء ملء جميع الحقول المطلوبة', 'danger');
      return;
    }
  
    const imageFile = formData.imageFile;
    const teacherId = formData._id;
  
    const operation = teacherId 
      ? this.teacherService.updateTeacher(teacherId, formData, imageFile)
      : this.teacherService.addTeacher(formData, imageFile);
  
    operation.subscribe({
      next: (savedTeacher) => {
        console.log('تم الحفظ بنجاح:', savedTeacher);
        
        if (teacherId) {
          const index = this.users.findIndex(u => u._id === teacherId);
          if (index !== -1) {
            this.users[index] = {
              ...this.users[index],
              ...savedTeacher,
              id: savedTeacher._id 
            };
          }
        } else {
          this.users.push({
            ...savedTeacher,
            id: savedTeacher._id
          });
        }
        
        this.filteredUsers = [...this.users];
        this.showAlertMessage(
          teacherId ? 'تم تحديث بيانات المعلم بنجاح' : 'تم إضافة المعلم بنجاح', 
          'success'
        );
      },
      error: (err) => {
        console.error('تفاصيل الخطأ:', {
          status: err.status,
          message: err.message,
          error: err.error
        });
        
        let errorMsg = 'حدث خطأ أثناء حفظ البيانات';
        if (err.error?.message) {
          errorMsg = err.error.message;
        } else if (err.status === 400) {
          errorMsg = 'بيانات غير صالحة. يرجى التحقق من المدخلات';
        } else if (err.status === 404 && teacherId) {
          errorMsg = 'المعلم غير موجود. ربما تم حذفه';
        }
        
        this.showAlertMessage(errorMsg, 'danger');
      }
    });
  }
}