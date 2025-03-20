import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../../services/data.service';
import { BannerComponent } from "../banner/banner.component";
import { ScheduleComponent } from '../schedule/schedule.component';
import { StatisticsCardsComponent } from '../statistics-cards/statistics-cards.component';
import { MarqueeComponent } from '../marquee/marquee.component';
import { TeacherListComponent } from "../teacher-list/teacher-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BannerComponent, ScheduleComponent, StatisticsCardsComponent, MarqueeComponent, TeacherListComponent], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  constructor(private dataService: DataService) {}


}