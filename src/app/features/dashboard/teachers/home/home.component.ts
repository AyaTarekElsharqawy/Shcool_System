import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../../services/data.service';
import { BannerComponent } from "../banner/banner.component";
import { ScheduleComponent } from '../schedule/schedule.component';
import { MarqueeComponent } from '../marquee/marquee.component';


@Component({
  selector: 'teacher-home',
  standalone: true,
  imports: [CommonModule, BannerComponent, ScheduleComponent, MarqueeComponent], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  constructor(private dataService: DataService) {}

}