import { Component, computed, signal } from '@angular/core';
import { DrawerService } from '../../services/drawer.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LucideAngularModule, SquareMinus, SquarePlus } from 'lucide-angular';
import { NgClass } from '@angular/common';
import { UserStore } from '../../stores/user.store';
import { BackendService } from '../../services/backend.service';
import { InputErrorComponent } from '../ui/input-error/input-error.component';
import { AlertsStore } from '../../stores/alerts.store';
import { Router } from '@angular/router';
import { RefreshService } from '../../services/refresh.service';

@Component({
  selector: 'app-add-transaction-drawer',
  imports: [
    ReactiveFormsModule,
    LucideAngularModule,
    NgClass,
    InputErrorComponent,
  ],
  templateUrl: './add-transaction-drawer.component.html',
})
export class AddTransactionDrawerComponent {
  addTransactionForm: FormGroup;
  readonly SquarePlus = SquarePlus;
  readonly SquareMinus = SquareMinus;
  debit = signal(true);
  credit = signal(false);
  today = new Date().toISOString().split('T')[0];
  type = computed(() => (this.debit() ? 'debit' : 'credit'));

  constructor(
    public drawerService: DrawerService,
    public userStore: UserStore,
    private backend: BackendService,
    private alertsStore: AlertsStore,
    private router: Router,
    private refreshService: RefreshService
  ) {
    this.addTransactionForm = new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl(0, [Validators.required, Validators.min(0.01)]),
      date: new FormControl(this.today, Validators.required),
      categoryId: new FormControl(
        this.userStore.categories()[0].id,
        Validators.required
      ),
    });
  }

  onSubmitAddTransaction() {
    const formData = this.addTransactionForm.value;
    formData.amount *= 100;
    formData.type = this.type();
    formData.checked = true;
    formData.regularization = false;
    formData.accountId = this.userStore.accounts()[0].id;
    this.backend.post('transactions', formData).subscribe({
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

  switchType() {
    this.debit.update((value) => !value);
    this.credit.update((value) => !value);
  }

  getAmountErrorMessage() {
    const control = this.addTransactionForm.get('amount');
    if (control?.errors?.['required']) {
      return 'Le montant de la transaction est requis.';
    }
    if (control?.errors?.['min']) {
      return 'Le montant doit être supérieur à 0.';
    }
    return '';
  }
}
