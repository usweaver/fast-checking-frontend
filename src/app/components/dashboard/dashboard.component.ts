import { Component } from '@angular/core';
import { UserStore } from '../../stores/user.store';
import { DashboardAccountCardComponent } from './dashboard-account-card/dashboard-account-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardAccountCardComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor(public userStore: UserStore) {}

  getCurrentMonthAndYear(): string {
    return new Date().toLocaleString('fr-FR', {
      month: 'long',
      year: 'numeric',
    });
  }
}
