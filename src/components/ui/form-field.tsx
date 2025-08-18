import * as React from 'react';
import { cn } from '../../lib/utils';
import { Label } from './label';
import { FormError } from './form-error';

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string | undefined;
  required?: boolean;
  children: React.ReactNode;
  htmlFor?: string;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, label, error, required, children, htmlFor, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {label && (
          <Label
            htmlFor={htmlFor}
            className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              error && 'text-destructive'
            )}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        <div className="relative">{children}</div>
        <FormError message={error} />
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export { FormField };
