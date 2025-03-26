import { StudentService } from './../../../../services/student.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'admin-student-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
})
export class StudentFormComponent implements OnInit {
  @Input() student: any;
  @Output() submit = new EventEmitter();
  studentForm: FormGroup;

  selectedFile: File | null = null;
  formSubmitted = false;
  isEditMode = false;
  imageErrors: { invalidType?: boolean, maxSize?: boolean } = {};
  isLoading: boolean | undefined;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private studentService: StudentService
  ) {
    this.studentForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      age: new FormControl('', [Validators.required, Validators.min(3), Validators.max(15)]),
      studentClass: new FormControl('', [Validators.required]),
      guardianPhone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
      whatsapp: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
    });
  }

  ngOnInit(): void {
    if (this.student) {
      this.isEditMode = true;
      this.studentForm.patchValue({
        name: this.student.name,
        age: this.student.age,
        studentClass: this.student.studentClass,
        guardianPhone: this.student.guardianPhone,
        whatsapp: this.student.whatsapp
      });
    }
  }

  // Safe way to access form controls
  getFormControl(controlName: string): FormControl {
    return this.studentForm.get(controlName) as FormControl;
  }

  private patchFormValues(): void {
    this.studentForm.patchValue({
      name: this.student.name,
      age: this.student.age,
      whatsapp: this.student.whatsapp,
      studentClass: this.student.studentClass,
    });
  }

  get f() {
    return this.studentForm.controls;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.imageErrors = {};

    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      this.imageErrors.invalidType = true;
      return;
    }

    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      this.imageErrors.maxSize = true;
      return;
    }

    this.selectedFile = file;
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.studentForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formData = this.studentForm.value;

    if (this.isEditMode) {
      this.updateStudent(formData);
    } else {
      this.addStudent(formData);
    }
  }

  private markAllAsTouched(): void {
    Object.values(this.studentForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  addStudent(studentData: any): void {
    this.isLoading = true;
    
    this.studentService.addStudent(studentData, this.selectedFile || undefined).subscribe({
      next: () => {
        Swal.fire({
          title: 'نجاح',
          text: 'تم إضافة الطالب بنجاح',
          icon: 'success',
          confirmButtonText: 'حسناً'
        });
        this.activeModal.close('saved');
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Full error:', error);
        
        if (error.status === 400) {
          if (error.error?.errors) {
            Object.keys(error.error.errors).forEach(key => {
              const control = this.studentForm.get(key);
              if (control) {
                control.setErrors({ serverError: error.error.errors[key] });
              }
            });
          }
          
          Swal.fire({
            title: 'خطأ في البيانات',
            text: error.error?.message || 'بيانات غير صالحة، يرجى المراجعة',
            icon: 'error',
            confirmButtonText: 'حسناً'
          });
        } else {
          Swal.fire({
            title: 'خطأ',
            text: 'حدث خطأ أثناء محاولة إضافة الطالب',
            icon: 'error',
            confirmButtonText: 'حسناً'
          });
        }
      }
    });
  }

  private updateStudent(studentData: any): void {
    this.studentService
      .updateStudent(this.student._id, studentData, this.selectedFile || undefined)
      .subscribe({
        next: () => this.handleSuccess('تم تحديث بيانات الطالب بنجاح'),
        error: (err) => this.handleError('حدث خطأ أثناء تحديث بيانات الطالب', err),
      });
  }

  private handleSuccess(message: string): void {
    this.isLoading = false;
    Swal.fire({
      title: 'نجاح',
      text: message,
      icon: 'success',
      confirmButtonText: 'حسناً',
    });
    this.activeModal.close('saved');
  }

  private handleError(message: string, error: any): void {
    this.isLoading = false;
    console.error('Error:', error);

    // Handle duplicate errors
    if (error.error?.message?.includes('Phone number already exists')) {
      this.studentForm.get('whatsapp')?.setErrors({ duplicate: true });
      Swal.fire({
        title: 'خطأ',
        text: 'رقم الواتساب مسجل بالفعل',
        icon: 'error',
        confirmButtonText: 'حسناً',
      });
      return;
    }

    Swal.fire({
      title: 'خطأ',
      text: message,
      icon: 'error',
      confirmButtonText: 'حسناً',
    });
  }

  closeModal(): void {
    if (this.studentForm.dirty) {
      Swal.fire({
        title: 'هل أنت متأكد؟',
        text: 'سيتم فقدان جميع التغييرات غير المحفوظة',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'نعم، أغلق',
        cancelButtonText: 'لا، إبقى',
      }).then((result) => {
        if (result.isConfirmed) {
          this.activeModal.dismiss();
        }
      });
    } else {
      this.activeModal.dismiss();
    }
  }
}