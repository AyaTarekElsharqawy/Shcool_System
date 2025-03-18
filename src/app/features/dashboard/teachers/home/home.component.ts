import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../../services/data.service';
import { BannerComponent } from "../banner/banner.component";
import { ScheduleComponent } from '../schedule/schedule.component';
import { MarqueeComponent } from '../marquee/marquee.component';
import { TeacherListComponent } from "../teacher-list/teacher-list.component";
import { SubjectGradesComponent } from '../subject-grades/subject-grades.component';

@Component({
  selector: 'teacher-home',
  standalone: true,
  imports: [CommonModule, BannerComponent, ScheduleComponent, MarqueeComponent, TeacherListComponent,SubjectGradesComponent], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  bannerData: any = null;

  constructor(private dataService: DataService) {}

}