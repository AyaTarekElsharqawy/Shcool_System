
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder } from '@angular/forms';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { TeacherFormComponent } from '../teacher-form/teacher-form.component';
// import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';
// import { TeacherService } from '../../../../services/teachers.service';
// import { FormsModule } from '@angular/forms';
// @Component({
//   selector: 'admin-teacher',
//   standalone: true,
//   imports:[FormsModule],
//   templateUrl: './teacher.component.html',
//   styleUrls: ['./teacher.component.css']
// })
// export class TeacherComponent implements OnInit {
//   searchQuery: string = '';
//   filteredUsers: any[] = [];
//   users: any[] = [];
//   alertMessage: string = '';
//   showAlert: boolean = false;
//   alertType: 'success' | 'danger' = 'success';
//   isLoading = false;
//   router: any;
//   constructor(
//     private fb: FormBuilder,
//     private modalService: NgbModal,
//     private teacherService: TeacherService
//   ) {}

//   ngOnInit(): void {
//     this.loadTeachers();
//   }

//   private showAlertMessage(message: string, type: 'success' | 'danger') {
//     this.alertMessage = message;
//     this.alertType = type;
//     this.showAlert = true;
//     setTimeout(() => this.showAlert = false, 3000);
//   }

//   loadTeachers() {
//     this.isLoading = true; 
//     this.teacherService.getAllTeachers().subscribe({
//       next: (teachers) => {
//         this.users = teachers.map(teacher => ({
//           ...teacher,
//           id: teacher._id 
//         }));
//         this.filteredUsers = [...this.users];
//         this.isLoading = false;
//       },
//       error: (err) => {
//         this.handleTeacherError(err);
//         this.isLoading = false;
//       }
//     });
//   }
//   private handleTeacherError(err: any) {
//     console.error('Error details:', {
//       status: err.status,
//       message: err.message,
//       error: err.error,
//       url: err.url
//     });
  
//     if (err.status === 0) {
//       this.showAlertMessage('تعذر الاتصال بالخادم. يرجى التحقق من اتصال الشبكة', 'danger');
//     } else if (err.status === 401) {
//       this.showAlertMessage('انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى', 'danger');
//       this.router.navigate(['/login']);
//     } else if (err.status === 500) {
//       this.showAlertMessage('حدث خطأ في الخادم، يرجى المحاولة لاحقاً', 'danger');
//     } else {
//       this.showAlertMessage('حدث خطأ أثناء جلب البيانات: ' + (err.error?.message || ''), 'danger');
//     }
//   }

//   openModal(user: any = null) {
//     const modalRef = this.modalService.open(TeacherFormComponent, {
//       backdrop: 'static',
//       keyboard: false,
//     });
  
//     if (user) {
//       modalRef.componentInstance.teacherForm.patchValue({
//         name: user.name,
//         age: user.age,
//         phone: user.phone,
//         email: user.email,
//         specialization: user.degree, 
//         subject: user.subject,
//         image: user.image
//       });
//       modalRef.componentInstance.imagePreview = this.teacherService.getImageUrl(user.image);
//     }
  
//     modalRef.result.then(
//       (result) => {
//         if (result) this.save(result);
//       },
//       () => {}
//     );
//   }

//   searchUsers() {
//     this.filteredUsers = this.users.filter((user) =>
//       user.name.includes(this.searchQuery) || 
//       user.email.includes(this.searchQuery)
//     );
//   }

//   editUser(user: any) {
//     this.openModal(user);
//   }
//   getImageUrl(imagePath: string): string {
//     return this.teacherService.getImageUrl(imagePath);
//   }
//   deleteTeacher(id: string) {
//     if (!id) {
//       this.showAlertMessage('معرف المعلم غير صالح', 'danger');
//       return;
//     }
  
//     const modalRef = this.modalService.open(ConfirmDeleteModalComponent, {
//       backdrop: 'static',
//       keyboard: false,
//     });
  
//     modalRef.componentInstance.itemType = 'هذا المعلم';
    
//     modalRef.result.then(
//       (confirmed) => {
//         if (confirmed) {
//           this.teacherService.deleteTeacher(id).subscribe({
//             next: () => {
//               this.users = this.users.filter(teacher => teacher._id !== id);
//               this.filteredUsers = [...this.users];
//               this.showAlertMessage('تم حذف المعلم بنجاح', 'success');
//             },
//             error: (err) => {
//               console.error('تفاصيل خطأ الحذف:', {
//                 status: err.status,
//                 message: err.message,
//                 error: err.error
//               });
//               this.showAlertMessage('فشل في حذف المعلم: ' + (err.error?.message || ''), 'danger');
//             }
//           });
//         }
//       },
//       () => {}
//     );
//   }
//   save(formData: any) {
    
//     if (!formData.name || !formData.email || !formData.subject) {
//       this.showAlertMessage('الرجاء ملء جميع الحقول المطلوبة', 'danger');
//       return;
//     }
  
//     const imageFile = formData.imageFile;
//     const teacherId = formData._id;
  
//     const operation = teacherId 
//       ? this.teacherService.updateTeacher(teacherId, formData, imageFile)
//       : this.teacherService.addTeacher(formData, imageFile);
  
//     operation.subscribe({
//       next: (savedTeacher) => {
//         console.log('تم الحفظ بنجاح:', savedTeacher);
//         this.loadTeachers();
//         if (teacherId) {
//           const index = this.users.findIndex(u => u._id === teacherId);
//           if (index !== -1) {
//             this.users[index] = {
//               ...this.users[index],
//               ...savedTeacher,
//               id: savedTeacher._id 
//             };
//           }
//         } else {
//           this.users.push({
//             ...savedTeacher,
//             id: savedTeacher._id
//           });
//         }
        
//         this.filteredUsers = [...this.users];
//         this.showAlertMessage(
//           teacherId ? 'تم تحديث بيانات المعلم بنجاح' : 'تم إضافة المعلم بنجاح', 
//           'success'
//         );
//       },
//       error: (err) => {
//         console.error('تفاصيل الخطأ:', {
//           status: err.status,
//           message: err.message,
//           error: err.error
//         });
        
//         let errorMsg = 'حدث خطأ أثناء حفظ البيانات';
//         if (err.error?.message) {
//           errorMsg = err.error.message;
//         } else if (err.status === 400) {
//           errorMsg = 'بيانات غير صالحة. يرجى التحقق من المدخلات';
//         } else if (err.status === 404 && teacherId) {
//           errorMsg = 'المعلم غير موجود. ربما تم حذفه';
//         }
        
//         this.showAlertMessage(errorMsg, 'danger');
//       }
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeacherFormComponent } from '../teacher-form/teacher-form.component';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';
import { TeacherService } from '../../../../services/teachers.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Teacher {
  _id: string;
  id?: string;
  name: string;
  age: number;
  phone: string;
  email: string;
  specialization: string;
  subject: string;
  image?: string;
  degree?: string;
}

@Component({
  selector: 'admin-teacher',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  searchQuery: string = '';
  filteredUsers: Teacher[] = [];
  users: Teacher[] = [];
  alertMessage: string = '';
  showAlert: boolean = false;
  alertType: 'success' | 'danger' = 'success';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private teacherService: TeacherService,
    private router: Router
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
      next: (teachers: Teacher[]) => {
        this.users = teachers.map(teacher => ({
          ...teacher,
          id: teacher._id,
          specialization: teacher.degree || '' // Map degree to specialization for display
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
    console.error('Error details:', err);
  
    if (err.status === 0) {
      this.showAlertMessage('تعذر الاتصال بالخادم. يرجى التحقق من اتصال الشبكة', 'danger');
    } else if (err.status === 401) {
      this.showAlertMessage('انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى', 'danger');
      this.router.navigate(['/login']);
    } else if (err.status === 500) {
      this.showAlertMessage('حدث خطأ في الخادم، يرجى المحاولة لاحقاً', 'danger');
    } else {
      this.showAlertMessage('حدث خطأ أثناء جلب البيانات: ' + (err.error?.message || err.message || ''), 'danger');
    }
  }


  openModal(user: Teacher | null = null) {
    const modalRef = this.modalService.open(TeacherFormComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg' // Optional: makes the modal larger
    });
  
    if (user) {
      modalRef.componentInstance.teacherForm.patchValue({
        _id: user._id,
        name: user.name,
        age: user.age,
        phone: user.phone,
        email: user.email,
        degree: user.specialization,
        subject: user.subject,
        image: user.image
      });
      modalRef.componentInstance.imagePreview = user.image 
        ? this.teacherService.getImageUrl(user.image) 
        : 'assets/default-avatar.png';
    }
  
    modalRef.result.then(
      (result) => {
        if (result) {
          this.save(result);
        }
      },
      (dismissReason) => {
        console.log('Modal dismissed with reason:', dismissReason);
      }
    );
  }
  searchUsers() {
    if (!this.searchQuery) {
      this.filteredUsers = [...this.users];
      return;
    }
    
    const query = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(query) || 
      user.email.toLowerCase().includes(query)
    );
  }

  editUser(user: Teacher) {
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
              console.error('Delete error:', err);
              this.showAlertMessage('فشل في حذف المعلم: ' + (err.error?.message || err.message || ''), 'danger');
            }
          });
        }
      },
      () => {}
    );
  }

  // save(formData: any) {
  //   if (!formData.name || !formData.email || !formData.subject) {
  //     this.showAlertMessage('الرجاء ملء جميع الحقول المطلوبة', 'danger');
  //     return;
  //   }
  
  //   const imageFile = formData.imageFile;
  //   const teacherId = formData._id;
  
  //   const operation = teacherId 
  //     ? this.teacherService.updateTeacher(teacherId, formData, imageFile)
  //     : this.teacherService.addTeacher(formData, imageFile);
  
  //   operation.subscribe({
  //     next: (savedTeacher: Teacher) => {
  //       this.loadTeachers();
  //       this.showAlertMessage(
  //         teacherId ? 'تم تحديث بيانات المعلم بنجاح' : 'تم إضافة المعلم بنجاح', 
  //         'success'
  //       );
  //     },
  //     error: (err) => {
  //       console.error('Error:', err);
  //       let errorMsg = 'حدث خطأ أثناء حفظ البيانات';
  //       if (err.error?.message) {
  //         errorMsg = err.error.message;
  //       } else if (err.status === 400) {
  //         errorMsg = 'بيانات غير صالحة. يرجى التحقق من المدخلات';
  //       } else if (err.status === 404 && teacherId) {
  //         errorMsg = 'المعلم غير موجود. ربما تم حذفه';
  //       }
  //       this.showAlertMessage(errorMsg, 'danger');
  //     }
  //   });
  // }
  save(formData: any) {
    console.log('Form data to save:', formData);
    
    if (!formData.name || !formData.email || !formData.subject) {
      this.showAlertMessage('الرجاء ملء جميع الحقول المطلوبة', 'danger');
      return;
    }
  
    const teacherId = formData._id;
    const operation = teacherId 
      ? this.teacherService.updateTeacher(teacherId, formData, formData.imageFile)
      : this.teacherService.addTeacher(formData, formData.imageFile);
  
    operation.subscribe({
      next: () => {
        this.loadTeachers();
        this.showAlertMessage(
          teacherId ? 'تم تحديث بيانات المعلم بنجاح' : 'تم إضافة المعلم بنجاح', 
          'success'
        );
      },
      error: (err) => {
        console.error('Full error:', err);
        console.error('Error details:', err.error);
        
        let errorMsg = 'حدث خطأ أثناء حفظ البيانات';
        if (err.error?.msg) {
          // Handle server validation errors
          errorMsg = Object.values(err.error.msg).join(', ');
        } else if (err.error?.message) {
          errorMsg = err.error.message;
        }
        
        this.showAlertMessage(errorMsg, 'danger');
      }
    });
  }
}