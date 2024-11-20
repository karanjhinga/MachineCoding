export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastBody {
  title: string;
  subtitle?: string;
  icon?: string;
  type: ToastType;
}

export interface Toast extends ToastBody {
  id: number;
}
