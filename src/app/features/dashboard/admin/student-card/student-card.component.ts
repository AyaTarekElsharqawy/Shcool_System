import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'admin-student-card',
  standalone: true,
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.css'],
  imports: [CommonModule]
})
export class StudentCardComponent {
  @Input() studentImage!: string;
  @Input() studentName!: string;
  @Input() studentID!: string;
  @Input() studentEmail!: string;
}
