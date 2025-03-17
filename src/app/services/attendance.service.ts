import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private attendanceState = new BehaviorSubject<{ [id: number]: boolean }>(this.loadAttendance());
  attendance$ = this.attendanceState.asObservable();

  setAttendance(studentId: number, present: boolean) {
    const currentAttendance = this.attendanceState.value;
    const updatedAttendance = { ...currentAttendance, [studentId]: present };

    this.attendanceState.next(updatedAttendance);
    this.saveAttendance(updatedAttendance);
  }

  private saveAttendance(attendance: { [id: number]: boolean }) {
    localStorage.setItem('attendance', JSON.stringify(attendance));
  }

  private loadAttendance(): { [id: number]: boolean } {
    return JSON.parse(localStorage.getItem('attendance') || '{}');
  }

  // ✅ دالة لاسترجاع بيانات الحضور عند الحاجة
  getAttendance(): { [id: number]: boolean } {
    return this.loadAttendance();
  }
}
