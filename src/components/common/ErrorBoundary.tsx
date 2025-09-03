/**
 * Error boundary components for catching and handling React errors
 */

import React, { Component } from 'react';
import type {
  ErrorBoundaryProps,
  ErrorBoundaryState,
  PageErrorBoundaryProps,
} from '../../types/errors';
import { errorLogger } from '../../services/errorLogger';
import {
  ErrorFallback,
  MinimalErrorFallback,
  PageErrorFallback,
} from './ErrorFallback';

/**
 * Base Error Boundary Component
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  private resetTimeoutId: number | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const errorId = errorLogger.logError(
      error,
      errorInfo.componentStack || '',
      {
        boundaryType: 'ErrorBoundary',
        isolateErrors: this.props.isolateErrors,
        resetKeys: this.props.resetKeys,
      }
    );

    this.setState({
      errorInfo: {
        componentStack: errorInfo.componentStack || '',
      },
      errorId,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      const customErrorInfo = {
        componentStack: errorInfo.componentStack || '',
      };
      this.props.onError(error, customErrorInfo, errorId);
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetKeys, resetOnPropsChange } = this.props;
    const { hasError } = this.state;

    // Reset error boundary if resetKeys changed
    if (hasError && resetKeys && prevProps.resetKeys !== resetKeys) {
      const hasResetKeyChanged = resetKeys.some(
        (key, index) => prevProps.resetKeys?.[index] !== key
      );

      if (hasResetKeyChanged) {
        this.resetErrorBoundary();
      }
    }

    // Reset error boundary if props changed and resetOnPropsChange is true
    if (hasError && resetOnPropsChange && prevProps !== this.props) {
      this.resetErrorBoundary();
    }
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  resetErrorBoundary = () => {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }

    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    });
  };

  render() {
    const { hasError, error, errorInfo, errorId } = this.state;
    const { children, fallback } = this.props;

    if (hasError && error && errorInfo && errorId) {
      // If custom fallback is provided
      if (fallback) {
        if (typeof fallback === 'function') {
          return fallback(error, errorInfo, this.resetErrorBoundary);
        }
        return fallback;
      }

      // Default fallback
      return (
        <ErrorFallback
          error={error}
          errorInfo={errorInfo}
          retry={this.resetErrorBoundary}
          errorId={errorId}
        />
      );
    }

    return children;
  }
}

/**
 * Page-specific Error Boundary
 */
export class PageErrorBoundary extends Component<
  PageErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: PageErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const errorId = errorLogger.logError(
      error,
      errorInfo.componentStack || '',
      {
        boundaryType: 'PageErrorBoundary',
        pageName: this.props.pageName,
      }
    );

    this.setState({
      errorInfo: {
        componentStack: errorInfo.componentStack || '',
      },
      errorId,
    });

    if (this.props.onError) {
      const customErrorInfo = {
        componentStack: errorInfo.componentStack || '',
      };
      this.props.onError(error, customErrorInfo, errorId);
    }
  }

  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    });
  };

  render() {
    const { hasError, error, errorInfo, errorId } = this.state;
    const { children, fallback, pageName } = this.props;

    if (hasError && error && errorInfo && errorId) {
      if (fallback) {
        if (typeof fallback === 'function') {
          return fallback(error, errorInfo, this.resetErrorBoundary);
        }
        return fallback;
      }

      return (
        <PageErrorFallback
          error={error}
          errorInfo={errorInfo}
          retry={this.resetErrorBoundary}
          errorId={errorId}
          pageName={pageName}
        />
      );
    }

    return children;
  }
}

/**
 * Minimal Error Boundary for smaller components
 */
export class MinimalErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const errorId = errorLogger.logError(
      error,
      errorInfo.componentStack || '',
      {
        boundaryType: 'MinimalErrorBoundary',
      }
    );

    this.setState({
      errorInfo: {
        componentStack: errorInfo.componentStack || '',
      },
      errorId,
    });

    if (this.props.onError) {
      const customErrorInfo = {
        componentStack: errorInfo.componentStack || '',
      };
      this.props.onError(error, customErrorInfo, errorId);
    }
  }

  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    });
  };

  render() {
    const { hasError, error, errorInfo, errorId } = this.state;
    const { children, fallback } = this.props;

    if (hasError && error && errorInfo && errorId) {
      if (fallback) {
        if (typeof fallback === 'function') {
          return fallback(error, errorInfo, this.resetErrorBoundary);
        }
        return fallback;
      }

      return (
        <MinimalErrorFallback
          error={error}
          errorInfo={errorInfo}
          retry={this.resetErrorBoundary}
          errorId={errorId}
        />
      );
    }

    return children;
  }
}

/**
 * Higher-order component for wrapping components with error boundaries
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

/**
 * Hook for manually triggering error boundaries (for testing or error simulation)
 */
export function useErrorHandler() {
  return (error: Error) => {
    // This will trigger the nearest error boundary
    throw error;
  };
}
