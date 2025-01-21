import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVerifiedChartComponent } from './user-verified-chart.component';

describe('UserVerifiedChartComponent', () => {
  let component: UserVerifiedChartComponent;
  let fixture: ComponentFixture<UserVerifiedChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserVerifiedChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserVerifiedChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
