import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'admin-root',
  standalone: true,
  imports: [RouterOutlet, ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  title = 'school-system';
  
  
}
