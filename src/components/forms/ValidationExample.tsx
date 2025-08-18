import React from 'react';
import { Button, Input, FormField, FormMessage } from '@/components/ui';
import { useFormValidation } from '@/hooks';
import { contactFormSchema, type ContactFormData } from '@/lib/validations';

export const ValidationExample: React.FC = () => {
  const {
    values,
    errors,
    isSubmitting,
    isValid,
    getFieldProps,
    handleSubmit,
    reset,
  } = useFormValidation<ContactFormData>({
    schema: contactFormSchema,
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    onSubmit: async data => {
      console.log('Form submitted:', data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Form submitted successfully!');
    },
  });

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Form Validation Example</h2>
        <p className="text-muted-foreground">
          Testing form validation with Zod
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Name" required htmlFor="name" error={errors.name}>
          <Input
            id="name"
            name="name"
            placeholder="Enter your name"
            {...getFieldProps('name')}
          />
        </FormField>

        <FormField label="Email" required htmlFor="email" error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            {...getFieldProps('email')}
          />
        </FormField>

        <FormField
          label="Subject"
          required
          htmlFor="subject"
          error={errors.subject}
        >
          <Input
            id="subject"
            name="subject"
            placeholder="Enter subject (min 5 chars)"
            {...getFieldProps('subject')}
          />
        </FormField>

        <FormField
          label="Message"
          required
          htmlFor="message"
          error={errors.message}
        >
          <Input
            id="message"
            name="message"
            placeholder="Enter message (min 10 chars)"
            {...getFieldProps('message')}
          />
        </FormField>

        <div className="flex gap-2">
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
          <Button type="button" variant="outline" onClick={reset}>
            Reset
          </Button>
        </div>
      </form>

      {Object.keys(errors).length > 0 && (
        <FormMessage
          type="error"
          message={`Please fix ${Object.keys(errors).length} error(s) above`}
        />
      )}

      {isValid &&
        Object.keys(values).some(
          key => values[key as keyof ContactFormData]
        ) && (
          <FormMessage
            type="success"
            message="Form is valid and ready to submit!"
          />
        )}

      <div className="text-xs text-muted-foreground">
        <p>Form State:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Valid: {isValid ? 'Yes' : 'No'}</li>
          <li>Submitting: {isSubmitting ? 'Yes' : 'No'}</li>
          <li>Errors: {Object.keys(errors).length}</li>
        </ul>
      </div>
    </div>
  );
};
