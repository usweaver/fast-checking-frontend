import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AlertsComponent } from './components/ui/alerts/alerts.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { DrawerComponent } from './components/shared/drawer/drawer.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AlertsComponent,
    HeaderComponent,
    NavbarComponent,
    DrawerComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(public router: Router) {}
}
