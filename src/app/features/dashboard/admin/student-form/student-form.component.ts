import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'admin-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
})
export class StudentFormComponent {
  studentForm: FormGroup;
  imagePreview: string = 'assets/default-avatar.png';
  selectedFile: File | null = null;
  formSubmitted = false; 

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(3)]],
      class: ['', Validators.required],  // ✅ إضافة حقل الفصل
      guardianPhone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      whatsapp: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      image: [null],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.studentForm.controls;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.studentForm.patchValue({ image: this.imagePreview });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.formSubmitted = true;
    
    if (this.studentForm.valid) {
      const formData = {
        ...this.studentForm.value,
        imageFile: this.selectedFile  // ✅ إرسال الصورة إذا تم اختيارها
      };
      this.activeModal.close(formData);
    } else {
      console.log('يوجد أخطاء في الفورم');
    }
  }

  closeModal() {
    this.activeModal.dismiss();
  }
}
