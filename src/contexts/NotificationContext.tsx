import React, { createContext, useContext, ReactNode } from 'react';
import { toast } from 'sonner';
import type { NotificationError } from '../types';

interface NotificationContextType {
  showNotification: (notification: NotificationError) => void;
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

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

  const value: NotificationContextType = {
    showNotification,
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

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }
  return context;
};
