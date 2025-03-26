import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TeacherService } from '../../../../services/teachers.service';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-teacher-form',
  imports:[ReactiveFormsModule],
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css']
})
export class TeacherFormComponent implements OnInit {
  @Input() teacher: any;
  @Output() saved = new EventEmitter<void>();
  
  teacherForm: FormGroup;
  formSubmitted = false;
  selectedFile: File | null = null;
  isEditMode = false;
  imageErrors: { invalidType?: boolean, maxSize?: boolean } = {};

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private teacherService: TeacherService
  ) {
    this.teacherForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(70)]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      email: ['', [Validators.required, Validators.email]],
      degree: ['', Validators.required],
      subject: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.teacher) {
      this.isEditMode = true;
      this.teacherForm.patchValue({
        name: this.teacher.name,
        age: this.teacher.age,
        phone: this.teacher.phone,
        email: this.teacher.email,
        degree: this.teacher.degree || this.teacher.specialization,
        subject: this.teacher.subject
      });
    }
  }

  get f() {
    return this.teacherForm.controls;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.imageErrors = {}; // Reset errors
    
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        this.imageErrors.invalidType = true;
        return;
      }
      
      if (file.size > 2 * 1024 * 1024) {
        this.imageErrors.maxSize = true;
        return;
      }
      
      this.selectedFile = file;
    }}

  onSubmit(): void {
    this.formSubmitted = true;
    
    if (this.teacherForm.invalid) {
      return;
    }
    
    const formData = this.teacherForm.value;
    
    if (this.isEditMode) {
      this.updateTeacher(formData);
    } else {
      this.addTeacher(formData);
    }
  }

  addTeacher(teacherData: any): void {
    this.teacherService.addTeacher(teacherData, this.selectedFile || undefined).subscribe({
      next: () => {
        this.activeModal.close('saved');
      },
      error: (err) => {
        console.error('Error adding teacher:', err);
        if (err.error?.message?.includes('Email already exists')) {
          this.teacherForm.get('email')?.setErrors({ duplicate: true });
        }
        if (err.error?.message?.includes('Phone number already exists')) {
          this.teacherForm.get('phone')?.setErrors({ duplicate: true });
        }
      }
    });
  }

  updateTeacher(teacherData: any): void {
    this.teacherService.updateTeacher(this.teacher._id, teacherData, this.selectedFile || undefined).subscribe({
      next: () => {
        this.activeModal.close('saved');
      },
      error: (err) => {
        console.error('Error updating teacher:', err);
        if (err.error?.message?.includes('Email already exists')) {
          this.teacherForm.get('email')?.setErrors({ duplicate: true });
        }
        if (err.error?.message?.includes('Phone number already exists')) {
          this.teacherForm.get('phone')?.setErrors({ duplicate: true });
        }
      }
    });
  }

  closeModal(): void {
    this.activeModal.dismiss();
  }
}