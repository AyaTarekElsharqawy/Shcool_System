import { TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminComponent], 
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AdminComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy(); 
  });

  it(`should have the 'school-system' title`, () => { 
    const fixture = TestBed.createComponent(AdminComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('school-system');  
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AdminComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, school-system'); 
  });
});
