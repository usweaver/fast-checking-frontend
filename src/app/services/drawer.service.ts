import { Component, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  isOpen = signal<boolean>(false);
  animationState = signal<'open' | 'closed'>('open');
  component = signal<any | null>(null);

  open(component: any) {
    this.component.set(component);
    this.isOpen.set(true);
    document.body.classList.add('overflow-hidden');
  }

  close() {
    this.animationState.set('closed');
    setTimeout(() => {
      this.isOpen.set(false);
      document.body.classList.remove('overflow-hidden');
      this.animationState.set('open');
    }, 300);
  }
}
