import { Component, Input,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-class-card',
  imports: [CommonModule],
  templateUrl: './class-card.component.html',
  styleUrl: './class-card.component.css'
})
export class ClassCardComponent {
  @Input() students!: number;
  @Input() grade!: number;


  // خريطة الألوان حسب الصف الدراسي
  private gradeColors: { [key: number]: string } = {
    1: '#FF99A0', // برتقالي باستيلي
    2: '#635DFF', // أزرق سماوي ناعم
    3: '#27AE60'  // أخضر زيتوني باستيلي
  };

  // ✅ جعل `borderColor` يتم حسابه تلقائيًا عند تغيير `grade`
  get borderColor(): string {
    return this.gradeColors[this.grade] || '#000000'; // أسود كافتراضي
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