/**
 * Error handling types for error boundaries and error reporting
 */

import type { ReactNode } from 'react';

export interface ErrorInfo {
  componentStack: string;
  errorBoundary?: string;
  errorBoundaryStack?: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string | null;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?:
    | ReactNode
    | ((error: Error, errorInfo: ErrorInfo, retry: () => void) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo, errorId: string) => void;
  isolateErrors?: boolean;
  resetOnPropsChange?: boolean;
  resetKeys?: Array<string | number>;
}

export interface PageErrorBoundaryProps extends ErrorBoundaryProps {
  pageName: string;
}

export interface ErrorFallbackProps {
  error: Error;
  errorInfo: ErrorInfo;
  retry: () => void;
  errorId: string;
}

export interface ErrorReportData {
  errorId: string;
  message: string;
  stack?: string;
  componentStack: string;
  userAgent: string;
  url: string;
  timestamp: string;
  userId?: string;
  sessionId?: string;
  additionalContext?: Record<string, unknown>;
}

export interface ErrorLoggerConfig {
  enableConsoleLogging: boolean;
  enableRemoteLogging: boolean;
  remoteEndpoint?: string;
  maxRetries: number;
  retryDelay: number;
}

export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface CategorizedError {
  category: 'network' | 'validation' | 'runtime' | 'boundary' | 'unknown';
  severity: ErrorSeverity;
  recoverable: boolean;
  userMessage: string;
  technicalMessage: string;
}
