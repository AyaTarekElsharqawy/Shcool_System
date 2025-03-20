import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-card',
  imports: [CommonModule],
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.css'],
})
export class StudentCardComponent {
  @Input() studentImage!: string;
  @Input() studentName!: string;
  @Input() studentID!: string;
  @Input() studentEmail!: string;
}
