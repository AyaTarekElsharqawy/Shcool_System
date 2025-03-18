import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-teacher-list',
  standalone: true,  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {
  teachers: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTeachersData();
  }

  getTeachersData() {
    this.http.get<any>('assets/TeacherData.json').subscribe(data => {
      this.teachers = data.teachers;
    });
  }

}