import { Component, effect, signal } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { AlertsStore } from '../../stores/alerts.store';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '../../types';
import { catchError, map, Observable } from 'rxjs';
import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import { TransactionLineComponent } from '../shared/transaction-line/transaction-line.component';
import { LucideAngularModule, Pen } from 'lucide-angular';
import { DrawerService } from '../../services/drawer.service';
import { AddRegularizationDrawerComponent } from '../add-regularization-drawer/add-regularization-drawer.component';
import { RefreshService } from '../../services/refresh.service';

interface AccountData {
  balance: number;
  months: string[];
  transactions: Transaction[];
}

@Component({
  selector: 'app-account',
  imports: [
    AsyncPipe,
    CommonModule,
    NgClass,
    TransactionLineComponent,
    LucideAngularModule,
  ],
  templateUrl: './account.component.html',
})
export class AccountComponent {
  accountData$!: Observable<AccountData>;
  accountId: string;
  monthData = signal<string>(this.getCurrentMonthAndYearParams());
  readonly Pen = Pen;

  addRegularizationDrawerComponent = AddRegularizationDrawerComponent;

  constructor(
    private backend: BackendService,
    private alertsStore: AlertsStore,
    private activatedRoute: ActivatedRoute,
    public drawerService: DrawerService,
    private refreshService: RefreshService
  ) {
    this.accountId = this.activatedRoute.snapshot.params['accountId'];
    effect(() => {
      this.refreshService.getRefreshSignal();
      this.loadAccountData(this.accountId, this.monthData());
    });
  }

  loadAccountData(accountId: string, month: string): void {
    this.accountData$ = this.backend.get(`accounts/${accountId}/${month}`).pipe(
      map((response: any) => ({
        balance: response.balance / 100,
        months: response.months,
        transactions: response.transactions,
      })),
      catchError((error) => {
        this.alertsStore.addAlert({
          message: 'Une erreur est survenue.',
          type: 'error',
        });
        throw error;
      })
    );
  }

  getCurrentMonthAndYearTitle(): string {
    return new Date().toLocaleString('fr-FR', {
      month: 'long',
      year: 'numeric',
    });
  }

  getCurrentMonthAndYearParams(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  }

  getMonthTitle(month: string): string {
    return new Date(month).toLocaleString('fr-FR', {
      month: 'long',
      year: 'numeric',
    });
  }

  isExistingPreviousMonth(month: string, monthsArray: string[]): boolean {
    return monthsArray.indexOf(month) > 0;
  }

  getPreviousMonth(month: string, monthsArray: string[]): string {
    const monthId = monthsArray.indexOf(month);
    return monthsArray[monthId - 1];
  }

  getPreviousMonthTitle(month: string, monthsArray: string[]): string {
    return this.getMonthTitle(this.getPreviousMonth(month, monthsArray));
  }

  setPreviousMonthData(month: string, monthsArray: string[]): void {
    this.monthData.set(this.getPreviousMonth(month, monthsArray));
  }

  isExistingNextMonth(month: string, monthsArray: string[]): boolean {
    return monthsArray.indexOf(month) < monthsArray.length - 1;
  }

  getNextMonth(month: string, monthsArray: string[]): string {
    const monthId = monthsArray.indexOf(month);
    return monthsArray[monthId + 1];
  }

  getNextMonthTitle(month: string, monthsArray: string[]): string {
    return this.getMonthTitle(this.getNextMonth(month, monthsArray));
  }

  setNextMonthData(month: string, monthsArray: string[]): void {
    this.monthData.set(this.getNextMonth(month, monthsArray));
  }
}
