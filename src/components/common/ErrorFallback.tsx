/**
 * Error fallback components for error boundaries
 */

import React from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import type { ErrorFallbackProps } from '../../types/errors';

/**
 * Generic error fallback component
 */
export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  errorInfo,
  retry,
  errorId,
}) => {
  const handleReportError = () => {
    // Copy error details to clipboard for easy reporting
    const errorDetails = `Error ID: ${errorId}\nMessage: ${error.message}\nStack: ${error.stack}\nComponent Stack: ${errorInfo.componentStack}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(errorDetails).then(() => {
        alert(
          'Error details copied to clipboard. Please share this with support.'
        );
      });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = errorDetails;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert(
        'Error details copied to clipboard. Please share this with support.'
      );
    }
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Something went wrong
          </CardTitle>
          <CardDescription className="text-gray-600">
            We encountered an unexpected error. Don't worry, we've been notified
            and are working on a fix.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-100 p-3 rounded-md">
            <p className="text-sm text-gray-700 font-medium">Error ID:</p>
            <p className="text-xs text-gray-600 font-mono break-all">
              {errorId}
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <Button onClick={retry} className="w-full" variant="default">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>

            <Button onClick={handleGoHome} variant="outline" className="w-full">
              <Home className="w-4 h-4 mr-2" />
              Go to Homepage
            </Button>

            <Button
              onClick={handleReportError}
              variant="ghost"
              className="w-full"
            >
              <Bug className="w-4 h-4 mr-2" />
              Report Error
            </Button>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                Technical Details (Development)
              </summary>
              <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm font-medium text-red-800 mb-2">
                  Error Message:
                </p>
                <p className="text-xs text-red-700 mb-3 font-mono">
                  {error.message}
                </p>

                <p className="text-sm font-medium text-red-800 mb-2">
                  Stack Trace:
                </p>
                <pre className="text-xs text-red-700 whitespace-pre-wrap font-mono overflow-auto max-h-32">
                  {error.stack}
                </pre>

                <p className="text-sm font-medium text-red-800 mb-2 mt-3">
                  Component Stack:
                </p>
                <pre className="text-xs text-red-700 whitespace-pre-wrap font-mono overflow-auto max-h-32">
                  {errorInfo.componentStack}
                </pre>
              </div>
            </details>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

/**
 * Minimal error fallback for smaller components
 */
export const MinimalErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  retry,
  errorId,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-red-50 border border-red-200 rounded-lg">
      <AlertTriangle className="w-8 h-8 text-red-600 mb-3" />
      <h3 className="text-lg font-medium text-red-800 mb-2">Component Error</h3>
      <p className="text-sm text-red-700 text-center mb-4">
        This component encountered an error and couldn't render properly.
      </p>
      <div className="flex space-x-2">
        <Button onClick={retry} size="sm" variant="outline">
          <RefreshCw className="w-3 h-3 mr-1" />
          Retry
        </Button>
      </div>
      {process.env.NODE_ENV === 'development' && (
        <details className="mt-3 w-full">
          <summary className="cursor-pointer text-xs text-red-600 hover:text-red-800">
            Error Details
          </summary>
          <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded text-xs">
            <p className="font-mono text-red-800">{error.message}</p>
            <p className="text-red-600 mt-1">ID: {errorId}</p>
          </div>
        </details>
      )}
    </div>
  );
};

/**
 * Page-specific error fallback
 */
export const PageErrorFallback: React.FC<
  ErrorFallbackProps & { pageName?: string }
> = ({ error, errorInfo, retry, errorId, pageName = 'page' }) => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {pageName.charAt(0).toUpperCase() + pageName.slice(1)} Unavailable
        </h1>

        <p className="text-gray-600 mb-6">
          We're having trouble loading this {pageName}. This might be a
          temporary issue.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={retry} className="min-w-[120px]">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>

          <Button
            onClick={handleGoHome}
            variant="outline"
            className="min-w-[120px]"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-6">Error ID: {errorId}</p>
      </div>
    </div>
  );
};
