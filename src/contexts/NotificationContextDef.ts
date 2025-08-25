import { createContext } from 'react';

export interface NotificationContextType {
  showNotification: (notification: unknown) => void;
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);
