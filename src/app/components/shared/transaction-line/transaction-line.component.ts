import { Component, Input } from '@angular/core';
import { Transaction, TransactionDate } from '../../../types';
import { CommonModule, NgClass } from '@angular/common';
import { UserStore } from '../../../stores/user.store';
import { DrawerService } from '../../../services/drawer.service';
import { ShowTransactionDrawerComponent } from '../../show-transaction-drawer/show-transaction-drawer.component';

@Component({
  selector: 'app-transaction-line',
  imports: [NgClass, CommonModule],
  templateUrl: './transaction-line.component.html',
})
export class TransactionLineComponent {
  @Input() transaction: Transaction = {
    id: '',
    name: '',
    amount: 0,
    date: '0000-00-00',
    type: '',
    checked: false,
    regularization: false,
    categoryId: '',
    accountId: '',
  };

  showTransactionDrawerComponent = ShowTransactionDrawerComponent;

  constructor(
    private userStore: UserStore,
    public drawerService: DrawerService
  ) {}

  getCategoryIcon(categoryId: string): string {
    const category = this.userStore
      .categories()
      .find((c) => c.id === categoryId);
    return category ? category.icon : '';
  }

  getCategoryName(categoryId: string): string {
    const category = this.userStore
      .categories()
      .find((c) => c.id === categoryId);
    return category ? category.name : '';
  }

  getTransactionDate(transactionDate: string): TransactionDate {
    const date = new Date(transactionDate).toLocaleDateString();
    return {
      day: date.split('/')[0],
      month: date.split('/')[1],
      year: date.split('/')[2].slice(-2),
    };
  }
}
