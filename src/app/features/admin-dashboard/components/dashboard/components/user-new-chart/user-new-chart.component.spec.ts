import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNewChartComponent } from './user-new-chart.component';

describe('UserNewChartComponent', () => {
  let component: UserNewChartComponent;
  let fixture: ComponentFixture<UserNewChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserNewChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserNewChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
