
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-class-card',
  imports: [CommonModule],
  templateUrl: './class-card.component.html',
  styleUrl: './class-card.component.css',
  host: {
    'id': 'class-card-1'
  }
})
export class ClassCardComponent {
  @Input() students!: number;
  @Input() grade!: number;
  @Input() className: string = ''; // أضفنا className كـ input

  private gradeColors: { [key: number]: string } = {
    1: '#FF99A0', // أحمر لـ KG1
    2: '#635DFF', // أزرق لـ KG2
    3: '#27AE60'  // أخضر لـ KG3
  };

  get borderColor(): string {
    return this.gradeColors[this.grade] || '#000000';
  }

  @Output() classSelected = new EventEmitter<{ students: number; grade: number; className: string }>();

  selectClass() {
    this.classSelected.emit({ students: this.students, grade: this.grade, className: this.className });
  }
}