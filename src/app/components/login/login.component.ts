import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { LogoComponent } from '../shared/logo/logo.component';
import { LucideAngularModule, LogIn } from 'lucide-angular';
import { AlertsStore } from '../../stores/alerts.store';
import { InputErrorComponent } from '../ui/input-error/input-error.component';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    LogoComponent,
    LucideAngularModule,
    InputErrorComponent,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm = new FormGroup({
    login: new FormControl('demo', Validators.required),
    password: new FormControl('demo', Validators.required),
  });
  readonly LogIn = LogIn;

  constructor(
    private backend: BackendService,
    private authService: AuthService,
    private router: Router,
    private alertsStore: AlertsStore
  ) {}

  onSubmitLogin(): void {
    this.backend.post('login', this.loginForm.value).subscribe({
      next: (response: any) => {
        this.authService.setToken(response.token);
        this.alertsStore.clearAlerts();
        this.router.navigate(['']);
      },
      error: (error: any) => {
        if (error.status === 404) {
          this.loginForm.reset();
          this.showAuthentificationError();
        }
      },
    });
  }

  showAuthentificationError(): void {
    this.alertsStore.addAlert({
      message: 'Le nom d’utilisateur et/ou le mot de passe sont incorrects.',
      type: 'error',
      autoClose: false,
    });
  }
}
