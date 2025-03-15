import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink,RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-student-card',
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './student-card.component.html',
  styleUrl: './student-card.component.css'
})
export class StudentCardComponent {
  @Input() studentImage!: string;
  @Input() studentName!: string;
  @Input() studentID!: string;
}
