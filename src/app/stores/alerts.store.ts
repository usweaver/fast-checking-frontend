import { Injectable, computed, signal } from '@angular/core';

export type AlertType = 'success' | 'error' | 'info' | 'warning';

export interface Alert {
  id: string;
  message: string;
  type: AlertType;
  autoClose?: boolean;
  duration?: number;
}

interface AlertsState {
  alerts: Alert[];
}

@Injectable({
  providedIn: 'root',
})
export class AlertsStore {
  private state = signal<AlertsState>({
    alerts: [],
  });

  alerts = computed(() => this.state().alerts);

  addAlert(alert: Omit<Alert, 'id'>) {
    const newAlert: Alert = {
      ...alert,
      id: crypto.randomUUID(),
      autoClose: alert.autoClose ?? true,
      duration: alert.duration ?? 3000,
    };

    this.state.update((state) => ({
      ...state,
      alerts: [...state.alerts, newAlert],
    }));

    if (newAlert.autoClose) {
      setTimeout(() => {
        this.removeAlert(newAlert.id);
      }, newAlert.duration);
    }
  }

  removeAlert(id: string) {
    this.state.update((state) => ({
      ...state,
      alerts: state.alerts.filter((alert) => alert.id !== id),
    }));
  }

  clearAlerts() {
    this.state.update((state) => ({
      ...state,
      alerts: [],
    }));
  }
}
