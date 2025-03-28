import { Component } from '@angular/core';
import { NavbarLinkComponent } from './navbar-link/navbar-link.component';
import {
  ChartNoAxesCombined,
  LucideAngularModule,
  SquarePlus,
  Wallet,
} from 'lucide-angular';
import { DrawerService } from '../../../services/drawer.service';
import { AddTransactionDrawerComponent } from '../../add-transaction-drawer/add-transaction-drawer.component';
import { UserStore } from '../../../stores/user.store';

@Component({
  selector: 'app-navbar',
  imports: [NavbarLinkComponent, LucideAngularModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  readonly ChartNoAxesCombined = ChartNoAxesCombined;
  readonly Wallet = Wallet;
  readonly SquarePlus = SquarePlus;

  addTransactionDrawerComponent = AddTransactionDrawerComponent;

  constructor(
    public drawerService: DrawerService,
    private userStore: UserStore
  ) {}

  getAccountPath(): string {
    return `/accounts/${this.userStore.accounts()[0].id}`;
  }
}
