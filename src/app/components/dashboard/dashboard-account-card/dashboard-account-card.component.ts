import { Component, effect } from '@angular/core';
import { BackendService } from '../../../services/backend.service';
import { UserStore } from '../../../stores/user.store';
import { AlertsStore } from '../../../stores/alerts.store';
import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import { Transaction } from '../../../types';
import { Observable, catchError, map } from 'rxjs';
import { CardLinkComponent } from '../../ui/card-link/card-link.component';
import { TransactionLineComponent } from '../../shared/transaction-line/transaction-line.component';

interface DashboardAccountCardData {
  balance: number;
  recentTransactions: Transaction[];
}

@Component({
  selector: 'app-dashboard-account-card',
  imports: [
    CommonModule,
    NgClass,
    AsyncPipe,
    CardLinkComponent,
    TransactionLineComponent,
  ],
  templateUrl: './dashboard-account-card.component.html',
})
export class DashboardAccountCardComponent {
  dashboardAccountCardData$!: Observable<DashboardAccountCardData>;

  constructor(
    private backend: BackendService,
    public userStore: UserStore,
    private alertsStore: AlertsStore
  ) {
    effect(() => {
      const accounts = this.userStore.accounts();
      if (accounts.length > 0) {
        this.loadDashboardAccountData(accounts[0].id);
      }
    });
  }

  loadDashboardAccountData(accountId: string): void {
    this.dashboardAccountCardData$ = this.backend
      .get(`accounts/dashboard/${accountId}`)
      .pipe(
        map((response: any) => ({
          balance: response.balance / 100,
          recentTransactions: response.recentTransactions,
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

  getAccountPath(): string {
    return `/accounts/${this.userStore.accounts()[0].id}`;
  }
}
