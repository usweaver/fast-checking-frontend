import { computed, Inject, Injectable, signal } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { AlertsStore } from './alerts.store';
import { Account, Category } from '../types';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  constructor(
    private backend: BackendService,
    private alertsStore: AlertsStore
  ) {}

  private state = signal({
    firstName: '',
    lastName: '',
    accounts: [] as Account[],
    categories: [] as Category[],
  });

  firstName = computed(() => this.state().firstName);
  lastName = computed(() => this.state().lastName);
  accounts = computed(() => this.state().accounts);
  categories = computed(() => this.state().categories);

  getUserInfos() {
    this.backend.get('user').subscribe({
      next: (response: any) => {
        this.state.update((state) => ({
          ...state,
          firstName: response.firstName,
          lastName: response.lastName,
          accounts: response.accounts,
          categories: response.categories,
        }));
      },
      error: (error: any) => {
        this.alertsStore.addAlert({
          message: 'Une erreur est survenue.',
          type: 'error',
        });
      },
    });
  }
}
