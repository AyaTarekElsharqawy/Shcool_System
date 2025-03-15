import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent {
  studentForm: FormGroup;

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(3)]],
      class: ['', Validators.required],
      guardianPhone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      whatsapp: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]]
    });
  }


  onSubmit() {
    if (this.studentForm.valid) {
      this.activeModal.close(this.studentForm.value);
    }
  }

  closeModal() {
    this.activeModal.dismiss();
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
  
    if (fileInput.files && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
  
      const reader = new FileReader();
      reader.onload = () => {
        this.studentForm.patchValue({
          image: reader.result
        });
        console.log('تم تحويل الصورة:', reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  }
}