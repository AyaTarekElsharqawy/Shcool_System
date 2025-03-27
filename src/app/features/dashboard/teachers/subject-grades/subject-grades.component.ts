import { NgStyle } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-subject-grades',
  imports: [NgStyle],
  templateUrl: './subject-grades.component.html',
  styleUrl: './subject-grades.component.css'
})
export class SubjectGradesComponent {
  grades: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('assets/TeacherData.json').subscribe({
      next: (data) => {
        this.grades = data.grades;
      },
      error: (error) => {
        console.error('Error loading grades:', error);
      }
    });
}
}
