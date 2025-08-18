import * as React from 'react';
import { cn } from '../../lib/utils';
import { AlertCircle } from 'lucide-react';

export interface FormErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string | undefined;
  show?: boolean;
}

const FormError = React.forwardRef<HTMLDivElement, FormErrorProps>(
  ({ className, message, show = true, ...props }, ref) => {
    if (!message || !show) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-2 text-sm text-destructive mt-1',
          className
        )}
        {...props}
      >
        <AlertCircle className="h-4 w-4 flex-shrink-0" />
        <span>{message}</span>
      </div>
    );
  }
);

FormError.displayName = 'FormError';

export { FormError };
