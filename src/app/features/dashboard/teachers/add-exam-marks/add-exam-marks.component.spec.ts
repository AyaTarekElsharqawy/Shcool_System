import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExamMarksComponent } from './add-exam-marks.component';

describe('AddExamMarksComponent', () => {
  let component: AddExamMarksComponent;
  let fixture: ComponentFixture<AddExamMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExamMarksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExamMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
