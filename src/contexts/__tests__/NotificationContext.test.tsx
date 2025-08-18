/**
 * Notification Context test
 * Tests the notification system functionality
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NotificationProvider, useNotification } from '../NotificationContext';

// Mock sonner to avoid actual toast rendering in tests
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
  },
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Test component that uses the notification hook
const TestComponent = () => {
  const { showSuccess, showError, showWarning, showInfo, showNotification } =
    useNotification();

  return (
    <div>
      <button onClick={() => showSuccess('Success message')}>
        Show Success
      </button>
      <button onClick={() => showError('Error message')}>Show Error</button>
      <button onClick={() => showWarning('Warning message')}>
        Show Warning
      </button>
      <button onClick={() => showInfo('Info message')}>Show Info</button>
      <button
        onClick={() =>
          showNotification({
            message: 'Custom notification',
            type: 'success',
            duration: 3000,
          })
        }
      >
        Show Custom
      </button>
    </div>
  );
};

describe('NotificationContext', () => {
  it('provides notification functions through context', () => {
    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    expect(screen.getByText('Show Success')).toBeInTheDocument();
    expect(screen.getByText('Show Error')).toBeInTheDocument();
    expect(screen.getByText('Show Warning')).toBeInTheDocument();
    expect(screen.getByText('Show Info')).toBeInTheDocument();
    expect(screen.getByText('Show Custom')).toBeInTheDocument();
  });

  it('calls toast functions when notification methods are used', async () => {
    const { toast } = await import('sonner');

    render(
      <NotificationProvider>
        <TestComponent />
      </NotificationProvider>
    );

    fireEvent.click(screen.getByText('Show Success'));
    expect(toast.success).toHaveBeenCalledWith('Success message', {
      duration: 5000,
    });

    fireEvent.click(screen.getByText('Show Error'));
    expect(toast.error).toHaveBeenCalledWith('Error message', {
      duration: 5000,
    });

    fireEvent.click(screen.getByText('Show Warning'));
    expect(toast.warning).toHaveBeenCalledWith('Warning message', {
      duration: 5000,
    });

    fireEvent.click(screen.getByText('Show Info'));
    expect(toast.info).toHaveBeenCalledWith('Info message', {
      duration: 5000,
    });

    fireEvent.click(screen.getByText('Show Custom'));
    expect(toast.success).toHaveBeenCalledWith('Custom notification', {
      duration: 3000,
    });
  });

  it('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useNotification must be used within a NotificationProvider');

    consoleSpy.mockRestore();
  });
});
