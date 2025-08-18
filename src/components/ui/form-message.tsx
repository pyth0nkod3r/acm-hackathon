import * as React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export interface FormMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string;
  show?: boolean;
}

const FormMessage = React.forwardRef<HTMLDivElement, FormMessageProps>(
  ({ className, type = 'info', message, show = true, ...props }, ref) => {
    if (!message || !show) {
      return null;
    }

    const icons = {
      success: CheckCircle,
      error: AlertCircle,
      warning: AlertTriangle,
      info: Info,
    };

    const styles = {
      success: 'text-green-600 bg-green-50 border-green-200',
      error: 'text-red-600 bg-red-50 border-red-200',
      warning: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      info: 'text-blue-600 bg-blue-50 border-blue-200',
    };

    const Icon = icons[type];

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-3 p-3 rounded-md border text-sm',
          styles[type],
          className
        )}
        {...props}
      >
        <Icon className="h-4 w-4 flex-shrink-0" />
        <span>{message}</span>
      </div>
    );
  }
);

FormMessage.displayName = 'FormMessage';

export { FormMessage };
