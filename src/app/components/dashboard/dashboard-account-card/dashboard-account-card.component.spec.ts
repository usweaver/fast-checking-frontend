import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAccountCardComponent } from './dashboard-account-card.component';

describe('DashboardAccountCardComponent', () => {
  let component: DashboardAccountCardComponent;
  let fixture: ComponentFixture<DashboardAccountCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAccountCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAccountCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
