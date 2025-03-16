import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'admin-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css'],
  imports: [CommonModule, FormsModule]

})
export class ComplaintsComponent implements OnInit {
  complaints: any[] = [];
  dataUrl: string = 'assets/data-mock.json'; // تأكدي أن هذا المسار صحيح

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>(this.dataUrl).subscribe(
      (data) => {
        this.complaints = data;
        console.log('تم تحميل البيانات بنجاح:', this.complaints);
      },
      (error) => {
        console.error('حدث خطأ أثناء تحميل البيانات:', error);
      }
    );
  }
}


