import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionsAndSalariesComponent } from './subscriptions-and-salaries.component';

describe('SubscriptionsAndSalariesComponent', () => {
  let component: SubscriptionsAndSalariesComponent;
  let fixture: ComponentFixture<SubscriptionsAndSalariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionsAndSalariesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionsAndSalariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
