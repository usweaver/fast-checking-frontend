import { Component, inject } from '@angular/core';
import { AlertsStore } from '../../../stores/alerts.store';
import { NgClass } from '@angular/common';
import { CircleX, LucideAngularModule, X } from 'lucide-angular';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alerts',
  imports: [NgClass, LucideAngularModule],
  templateUrl: './alerts.component.html',
  animations: [
    trigger('alertAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate(
          '300ms ease-in',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-out',
          style({ opacity: 0, transform: 'translateX(100%)' })
        ),
      ]),
    ]),
  ],
})
export class AlertsComponent {
  alertsStore = inject(AlertsStore);
  readonly CircleX = CircleX;
  readonly X = X;

  constructor(public router: Router) {}

  alertTypeToIcon(type: String) {
    switch (type) {
      case 'error':
        return X;
      default:
        return CircleX;
    }
  }
}
