import React, { type ReactNode } from 'react';
import { toast } from 'sonner';
import type { NotificationError } from '../types';
import {
  NotificationContext,
  type NotificationContextType,
} from './NotificationContextDef';

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const showNotification = (notification: NotificationError) => {
    const { message, type, duration = 5000 } = notification;

    switch (type) {
      case 'success':
        toast.success(message, { duration });
        break;
      case 'error':
        toast.error(message, { duration });
        break;
      case 'warning':
        toast.warning(message, { duration });
        break;
      case 'info':
        toast.info(message, { duration });
        break;
      default:
        toast(message, { duration });
    }
  };

  const showSuccess = (message: string, duration = 5000) => {
    toast.success(message, { duration });
  };

  const showError = (message: string, duration = 5000) => {
    toast.error(message, { duration });
  };

  const showWarning = (message: string, duration = 5000) => {
    toast.warning(message, { duration });
  };

  const showInfo = (message: string, duration = 5000) => {
    toast.info(message, { duration });
  };

  const value = {
    showNotification: showNotification as (notification: unknown) => void,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
export { NotificationContext };
export type { NotificationContextType };
