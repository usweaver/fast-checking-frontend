import { Component, Input } from '@angular/core';
import { DrawerService } from '../../services/drawer.service';
import { Transaction } from '../../types';
import { CommonModule, NgClass } from '@angular/common';
import { UserStore } from '../../stores/user.store';
import { BackendService } from '../../services/backend.service';
import { AlertsStore } from '../../stores/alerts.store';
import { RefreshService } from '../../services/refresh.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-transaction-drawer',
  imports: [NgClass, CommonModule],
  templateUrl: './show-transaction-drawer.component.html',
})
export class ShowTransactionDrawerComponent {
  @Input() transaction?: Transaction;
  constructor(
    public drawerService: DrawerService,
    private userStore: UserStore,
    private backend: BackendService,
    private alertsStore: AlertsStore,
    private refreshService: RefreshService,
    private router: Router
  ) {}

  onDeleteTransaction() {
    this.backend.delete(`transactions/${this.transaction?.id}`).subscribe({
      next: (response: any) => {
        this.refreshService.triggerRefresh();
        this.router.navigate([`accounts/${this.userStore.accounts()[0].id}`]);
        this.drawerService.close();
      },
      error: (error: any) => {
        this.alertsStore.addAlert({
          message: 'Une erreur est survenue.',
          type: 'error',
        });
      },
    });
  }

  getFullDate(): string {
    if (!this.transaction?.date) {
      return '';
    }
    return new Date(this.transaction.date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    });
  }

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
}
