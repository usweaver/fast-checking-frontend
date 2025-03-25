import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { LogOut, LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [LogoComponent, LucideAngularModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly LogOut = LogOut;

  constructor(private authService: AuthService, private router: Router) {}

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
