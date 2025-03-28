import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionLineComponent } from './transaction-line.component';

describe('TransactionLineComponent', () => {
  let component: TransactionLineComponent;
  let fixture: ComponentFixture<TransactionLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
