import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RefreshService {
  private refreshSignal = signal(0);

  triggerRefresh(): void {
    this.refreshSignal.update((value) => value + 1);
  }

  getRefreshSignal() {
    return this.refreshSignal();
  }
}
