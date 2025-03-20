import { Component, Input,Output,EventEmitter, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'admin-class-card',
  imports: [CommonModule],
  templateUrl: './class-card.component.html',
  styleUrl: './class-card.component.css'
})
export class ClassCardComponent {
  @Input() students!: number;
  @Input() grade!: number;


  borderColor: string = this.getRandomColor();

  getRandomColor(): string {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F4A261', '#E76F51', '#2A9D8F', '#8E44AD'];
    return colors[Math.floor(Math.random() * colors.length)];
  }


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

  @Output() classSelected = new EventEmitter<{ students: number; grade: number }>();
  selectClass() {
    this.classSelected.emit({ students: this.students, grade: this.grade });
  }

}