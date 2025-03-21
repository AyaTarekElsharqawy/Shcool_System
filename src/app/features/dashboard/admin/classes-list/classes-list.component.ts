import { Component } from '@angular/core';
import { ClassCardComponent } from '../class-card/class-card.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classes-list',
  imports: [ClassCardComponent,CommonModule],
  templateUrl: './classes-list.component.html',
  styleUrl: './classes-list.component.css',
  host:{
    'id': 'classes-list-1' 
  }
})
export class ClassesListComponent {
  classes=[
    {students:30,grade:3},
    {students:30,grade:3},
    {students:30,grade:2},
    {students:25,grade:1},
    {students:25,grade:1},
    {students:30,grade:2},
    {students:30,grade:3},
    {students:30,grade:3}
  ];
  constructor(private router: Router) {}

  goToStudentsList(classData: { students: number; grade: number }) {
    this.router.navigate(['/admin/attendance'], { queryParams: { students: classData.students, grade: classData.grade } });
  }


}
