import { Component } from '@angular/core';
import { NavbarLinkComponent } from './navbar-link/navbar-link.component';
import {
  AlignStartVertical,
  House,
  LucideAngularModule,
  SquarePlus,
} from 'lucide-angular';
import { DrawerService } from '../../../services/drawer.service';
import { AddTransactionDrawerComponent } from '../../add-transaction-drawer/add-transaction-drawer.component';

@Component({
  selector: 'app-navbar',
  imports: [NavbarLinkComponent, LucideAngularModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  readonly House = House;
  readonly AlignStartVertical = AlignStartVertical;
  readonly SquarePlus = SquarePlus;

  addTransactionDrawerComponent = AddTransactionDrawerComponent;

  constructor(public drawerService: DrawerService) {}
}
