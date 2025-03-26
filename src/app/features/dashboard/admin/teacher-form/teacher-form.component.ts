// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';

// @Component({
//   selector: 'admin-teacher-form',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './teacher-form.component.html',
//   styleUrls: ['./teacher-form.component.css'],
// })
// export class TeacherFormComponent {
//   teacherForm: FormGroup;
//   imagePreview: string = 'assets/default-avatar.png';
//   selectedFile: File | null = null;
//   formSubmitted = false; 

//   constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
//     this.teacherForm = this.fb.group({
//       name: ['', Validators.required],
//       age: [null, [Validators.required, Validators.min(18)]],
//       phone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
//       email: ['', [Validators.required, Validators.email]],
//       degree: ['', Validators.required],
//       subject: ['', Validators.required],
//       image: [null],
//     });
//   }

//   get f(): { [key: string]: AbstractControl } {
//     return this.teacherForm.controls;
//   }

//   onFileSelected(event: any) {
//     const file = event.target.files[0];
//     if (file) {
//       this.selectedFile = file;
//       const reader = new FileReader();
//       reader.onload = () => {
//         this.imagePreview = reader.result as string;
//         this.teacherForm.patchValue({ image: this.imagePreview });
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   onSubmit() {
//     this.formSubmitted = true;
    
//     if (this.teacherForm.valid) {
//       const formData = {
//         ...this.teacherForm.value,
//         imageFile: this.selectedFile 
//       };
//       this.activeModal.close(formData);
//     } else {
//       console.log('يوجد أخطاء في الفورم');
//     }
//   }

//   closeModal() {
//     this.activeModal.dismiss();
//   }
// }
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'admin-teacher-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css'],
})
export class TeacherFormComponent {
  teacherForm: FormGroup;
  imagePreview: string = 'assets/default-avatar.png';
  selectedFile: File | null = null;
  formSubmitted = false;
  allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.teacherForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      degree: ['', Validators.required],
      image: [null],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.teacherForm.controls;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!this.allowedImageTypes.includes(file.type)) {
        this.teacherForm.get('image')?.setErrors({ invalidType: true });
        return;
      }
      
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        this.teacherForm.get('image')?.setErrors({ maxSize: true });
        return;
      }

      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.teacherForm.patchValue({ image: this.imagePreview });
        this.teacherForm.get('image')?.setErrors(null);
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.formSubmitted = true;
    
    if (this.teacherForm.valid) {
      const formData = {
        ...this.teacherForm.value, // Include all form values
        imageFile: this.selectedFile
      };
  
      console.log('Form data prepared:', formData);
      this.activeModal.close(formData);
    } else {
      console.log('Form validation errors:', this.getFormValidationErrors());
    }
  }
  
  getFormValidationErrors() {
    const errors: { [key: string]: any } = {}; // Explicitly type the errors object
    
    Object.keys(this.teacherForm.controls).forEach(key => {
      const control = this.teacherForm.get(key);
      if (control?.errors) {
        errors[key] = control.errors;
      }
    });
    
    return errors;
  }
  
  closeModal() {
    this.activeModal.dismiss('cancel');
  }
}