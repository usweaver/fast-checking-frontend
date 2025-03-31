import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRegularizationDrawerComponent } from './add-regularization-drawer.component';

describe('AddRegularizationDrawerComponent', () => {
  let component: AddRegularizationDrawerComponent;
  let fixture: ComponentFixture<AddRegularizationDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRegularizationDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRegularizationDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
