import { Component, effect, Input } from '@angular/core';
import { DrawerService } from '../../services/drawer.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { InputErrorComponent } from '../ui/input-error/input-error.component';
import { BackendService } from '../../services/backend.service';
import { AlertsStore } from '../../stores/alerts.store';
import { UserStore } from '../../stores/user.store';
import { CommonModule, NgClass } from '@angular/common';
import { RefreshService } from '../../services/refresh.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-regularization-drawer',
  imports: [ReactiveFormsModule, InputErrorComponent, NgClass, CommonModule],
  templateUrl: './add-regularization-drawer.component.html',
})
export class AddRegularizationDrawerComponent {
  @Input() currentBalance: number = 0;
  addRegularizationForm: FormGroup;

  constructor(
    public drawerService: DrawerService,
    private backend: BackendService,
    private alertsStore: AlertsStore,
    private userStore: UserStore,
    private refreshService: RefreshService,
    private router: Router
  ) {
    this.addRegularizationForm = new FormGroup({
      newBalance: new FormControl(0, [this.invalidNewBalanceValidator()]),
    });
  }

  onSubmitAddRegularization() {
    const newBalance = this.addRegularizationForm.get('newBalance')?.value;
    const rawDelta = newBalance - this.currentBalance;
    const delta = Math.floor(rawDelta * 100) / 100;
    const formData = {
      name: 'Regularization',
      amount: Math.abs(delta) * 100,
      date: new Date().toISOString().split('T')[0],
      type: delta < 0 ? 'debit' : 'credit',
      checked: true,
      regularization: true,
      accountId: this.userStore.accounts()[0].id,
      categoryId: this.userStore
        .categories()
        .find((category) => category.name === 'Régularisation')?.id,
    };
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

  invalidNewBalanceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const invalid = control.value === this.currentBalance;
      return invalid ? { invalidNewBalance: { value: control.value } } : null;
    };
  }

  getNewBalanceErrorMessage() {
    const control = this.addRegularizationForm.get('newBalance');
    if (control?.errors?.['required']) {
      return 'Le nouveau solde est requis.';
    }
    if (control?.errors?.['invalidNewBalance']) {
      return 'Le nouveau solde doit être différent du solde actuel.';
    }
    return '';
  }
}
