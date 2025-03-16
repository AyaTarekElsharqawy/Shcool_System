import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentsTableComponent } from './student.component';

describe('StudentComponent', () => {
  let component: StudentsTableComponent;
  let fixture: ComponentFixture<StudentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentsTableComponent] // ✅ هنا يتم وضع المكون بشكل صحيح
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

