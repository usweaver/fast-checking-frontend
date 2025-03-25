import { Component } from '@angular/core';
import { DrawerService } from '../../../services/drawer.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-drawer',
  imports: [NgComponentOutlet],
  templateUrl: './drawer.component.html',
  animations: [
    trigger('overlayAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition('open => closed', [
        animate('300ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
    trigger('drawerAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('300ms ease-in', style({ transform: 'translateY(0)' })),
      ]),
      transition('open => closed', [
        animate('300ms ease-out', style({ transform: 'translateY(100%)' })),
      ]),
    ]),
  ],
})
export class DrawerComponent {
  constructor(public drawerService: DrawerService) {}
}
