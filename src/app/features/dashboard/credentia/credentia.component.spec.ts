import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentiaComponent } from './credentia.component';

describe('CredentiaComponent', () => {
  let component: CredentiaComponent;
  let fixture: ComponentFixture<CredentiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CredentiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CredentiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
