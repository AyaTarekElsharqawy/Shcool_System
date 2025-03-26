
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from '../../../../services/student.service';
import { HttpErrorResponse } from '@angular/common/http';

interface Student {
  _id?: string;
  name: string;
  age: number;
  classroom: string;
  guardianPhone: string;
  whatsapp: string;
  image: string;
}

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  @Input() studentForm!: FormGroup; // بنستقبل الفورم من StudentComponent
  @Input() studentId?: string; // بنستقبل الـ _id لو بنعدل

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    // لو مافيش فورم مرسل، نعمل واحد جديد
    if (!this.studentForm) {
      this.studentForm = this.fb.group({
        name: ['', Validators.required],
        age: [null, [Validators.required, Validators.min(3)]],
        classroom: ['', Validators.required],
        guardianPhone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
        whatsapp: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
        image: ['']
      });
    }
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const studentData: Student = {
        name: this.studentForm.get('name')?.value,
        age: this.studentForm.get('age')?.value,
        classroom: this.studentForm.get('classroom')?.value,
        guardianPhone: this.studentForm.get('guardianPhone')?.value,
        whatsapp: this.studentForm.get('whatsapp')?.value,
        image: this.studentForm.get('image')?.value || ''
      };

      console.log('البيانات المرسلة:', studentData);

      if (this.studentId) {
        // لو فيه studentId، يعني بنعدل
        this.studentService.updateStudent(this.studentId, studentData).subscribe({
          next: (response) => {
            alert('✅ تم تعديل الطالب بنجاح: ' + response.message);
            this.activeModal.close(studentData);
          },
          error: (err: HttpErrorResponse) => {
            alert('❌ فشل في تعديل الطالب: ' + err.message);
          }
        });
      } else {
        // لو مافيش studentId، يعني بنضيف
        this.studentService.addStudent(studentData).subscribe({
          next: (response) => {
            alert('✅ تم إضافة الطالب بنجاح: ' + response.message);
            this.activeModal.close(studentData);
          },
          error: (err: HttpErrorResponse) => {
            alert('❌ فشل في إضافة الطالب: ' + err.message);
          }
        });
      }
    } else {
      alert('❌ من فضلك املأ جميع الحقول المطلوبة بشكل صحيح');
    }
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

  closeModal() {
    this.activeModal.dismiss();
  }
}