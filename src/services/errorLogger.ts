/**
 * Error logging and reporting service
 */

import type {
  ErrorReportData,
  ErrorLoggerConfig,
  CategorizedError,
  ErrorSeverity,
} from '../types/errors';

class ErrorLogger {
  private config: ErrorLoggerConfig = {
    enableConsoleLogging: true,
    enableRemoteLogging: false,
    maxRetries: 3,
    retryDelay: 1000,
  };

  private sessionId: string;
  private retryQueue: ErrorReportData[] = [];

  constructor(config?: Partial<ErrorLoggerConfig>) {
    this.config = { ...this.config, ...config };
    this.sessionId = this.generateSessionId();
  }

  /**
   * Generate a unique session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate a unique error ID
   */
  private generateErrorId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Categorize error based on its properties
   */
  private categorizeError(error: Error): CategorizedError {
    const message = error.message.toLowerCase();
    const stack = error.stack?.toLowerCase() || '';

    // Network errors
    if (
      message.includes('network') ||
      message.includes('fetch') ||
      message.includes('connection')
    ) {
      return {
        category: 'network',
        severity: 'medium',
        recoverable: true,
        userMessage:
          'Connection issue. Please check your internet connection and try again.',
        technicalMessage: error.message,
      };
    }

    // Validation errors
    if (
      message.includes('validation') ||
      message.includes('invalid') ||
      message.includes('required')
    ) {
      return {
        category: 'validation',
        severity: 'low',
        recoverable: true,
        userMessage: 'Please check your input and try again.',
        technicalMessage: error.message,
      };
    }

    // Runtime errors
    if (
      stack.includes('typeerror') ||
      stack.includes('referenceerror') ||
      stack.includes('syntaxerror')
    ) {
      return {
        category: 'runtime',
        severity: 'high',
        recoverable: false,
        userMessage:
          'Something went wrong. Please refresh the page and try again.',
        technicalMessage: error.message,
      };
    }

    // Error boundary errors
    if (message.includes('boundary') || stack.includes('errorboundary')) {
      return {
        category: 'boundary',
        severity: 'high',
        recoverable: true,
        userMessage:
          'A component error occurred. Please try refreshing the page.',
        technicalMessage: error.message,
      };
    }

    // Default unknown error
    return {
      category: 'unknown',
      severity: 'medium',
      recoverable: true,
      userMessage: 'An unexpected error occurred. Please try again.',
      technicalMessage: error.message,
    };
  }

  /**
   * Log error to console with formatting
   */
  private logToConsole(
    errorData: ErrorReportData,
    categorizedError: CategorizedError
  ): void {
    if (!this.config.enableConsoleLogging) return;

    const logLevel = this.getConsoleLogLevel(categorizedError.severity);
    const logMethod = console[logLevel] || console.error;

    logMethod.call(
      console,
      `🚨 Error [${categorizedError.category.toUpperCase()}]`,
      {
        errorId: errorData.errorId,
        message: errorData.message,
        severity: categorizedError.severity,
        recoverable: categorizedError.recoverable,
        timestamp: errorData.timestamp,
        url: errorData.url,
        userAgent: errorData.userAgent,
        stack: errorData.stack,
        componentStack: errorData.componentStack,
      }
    );
  }

  /**
   * Get appropriate console log level based on severity
   */
  private getConsoleLogLevel(
    severity: ErrorSeverity
  ): 'error' | 'warn' | 'info' {
    switch (severity) {
      case 'critical':
      case 'high':
        return 'error';
      case 'medium':
        return 'warn';
      case 'low':
        return 'info';
      default:
        return 'error';
    }
  }

  /**
   * Send error to remote logging service
   */
  private async logToRemote(
    errorData: ErrorReportData,
    retryCount = 0
  ): Promise<void> {
    if (!this.config.enableRemoteLogging || !this.config.remoteEndpoint) return;

    try {
      const response = await fetch(this.config.remoteEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorData),
      });

      if (!response.ok) {
        throw new Error(`Remote logging failed: ${response.status}`);
      }
    } catch (error) {
      if (retryCount < this.config.maxRetries) {
        setTimeout(
          () => {
            this.logToRemote(errorData, retryCount + 1);
          },
          this.config.retryDelay * Math.pow(2, retryCount)
        ); // Exponential backoff
      } else {
        console.error(
          'Failed to send error to remote logging service after retries:',
          error
        );
        // Add to retry queue for later processing
        this.retryQueue.push(errorData);
      }
    }
  }

  /**
   * Create error report data from error and additional context
   */
  private createErrorReportData(
    error: Error,
    componentStack: string,
    additionalContext?: Record<string, unknown>
  ): ErrorReportData {
    const errorData: ErrorReportData = {
      errorId: this.generateErrorId(),
      message: error.message,
      componentStack,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
    };
    if (error.stack) {
      errorData.stack = error.stack;
    }

    if (additionalContext) {
      errorData.additionalContext = additionalContext;
    }

    return errorData;
  }

  /**
   * Main method to log an error
   */
  public logError(
    error: Error,
    componentStack: string,
    additionalContext?: Record<string, unknown>
  ): string {
    const errorData = this.createErrorReportData(
      error,
      componentStack,
      additionalContext
    );
    const categorizedError = this.categorizeError(error);

    // Log to console
    this.logToConsole(errorData, categorizedError);

    // Log to remote service
    this.logToRemote(errorData);

    return errorData.errorId;
  }

  /**
   * Get user-friendly error message
   */
  public getUserMessage(error: Error): string {
    const categorizedError = this.categorizeError(error);
    return categorizedError.userMessage;
  }

  /**
   * Check if error is recoverable
   */
  public isRecoverable(error: Error): boolean {
    const categorizedError = this.categorizeError(error);
    return categorizedError.recoverable;
  }

  /**
   * Process retry queue
   */
  public processRetryQueue(): void {
    if (this.retryQueue.length === 0) return;

    const queueCopy = [...this.retryQueue];
    this.retryQueue = [];

    queueCopy.forEach(errorData => {
      this.logToRemote(errorData);
    });
  }

  /**
   * Update configuration
   */
  public updateConfig(config: Partial<ErrorLoggerConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

// Create singleton instance
export const errorLogger = new ErrorLogger({
  enableConsoleLogging: import.meta.env.MODE === 'development',
  enableRemoteLogging: import.meta.env.MODE === 'production',
  ...(import.meta.env.VITE_ERROR_LOGGING_ENDPOINT && {
    remoteEndpoint: import.meta.env.VITE_ERROR_LOGGING_ENDPOINT,
  }),
});

export default ErrorLogger;
