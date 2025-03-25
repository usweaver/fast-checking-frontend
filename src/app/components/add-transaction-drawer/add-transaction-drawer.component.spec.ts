import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransactionDrawerComponent } from './add-transaction-drawer.component';

describe('AddTransactionDrawerComponent', () => {
  let component: AddTransactionDrawerComponent;
  let fixture: ComponentFixture<AddTransactionDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTransactionDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTransactionDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
