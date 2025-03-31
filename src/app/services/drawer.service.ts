import { Component, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  isOpen = signal<boolean>(false);
  animationState = signal<'open' | 'closed'>('open');
  component = signal<any | null>(null);
  private _inputs = signal<Record<string, any>>({});
  container = document.querySelector('#container');

  inputs() {
    return this._inputs();
  }

  open(component: any, inputs: Record<string, any> = {}) {
    this._inputs.set(inputs);
    this.component.set(component);
    this.isOpen.set(true);
    document.body.classList.add('overflow-hidden');
    this.container?.classList.remove('md:overflow-y-auto');
    this.container?.classList.add('overflow-hidden');
  }

  close() {
    this._inputs.set({});
    this.animationState.set('closed');
    setTimeout(() => {
      this.isOpen.set(false);
      document.body.classList.remove('overflow-hidden');
      this.container?.classList.remove('overflow-hidden');
      this.container?.classList.add('md:overflow-y-auto');
      this.animationState.set('open');
    }, 300);
  }
}
