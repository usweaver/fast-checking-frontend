import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTransactionDrawerComponent } from './show-transaction-drawer.component';

describe('ShowTransactionDrawerComponent', () => {
  let component: ShowTransactionDrawerComponent;
  let fixture: ComponentFixture<ShowTransactionDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowTransactionDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowTransactionDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
