import { useState, useCallback } from 'react';
import { z } from 'zod';

export interface UseFormValidationOptions<T> {
  schema: z.ZodSchema<T>;
  initialValues?: Partial<T>;
  onSubmit?: (data: T) => void | Promise<void>;
}

export interface FormValidationState {
  errors: Record<string, string>;
  isSubmitting: boolean;
  isValid: boolean;
  touched: Record<string, boolean>;
}

export function useFormValidation<T extends Record<string, any>>({
  schema,
  initialValues = {},
  onSubmit,
}: UseFormValidationOptions<T>) {
  const [values, setValues] = useState<Partial<T>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback(
    (name: string, value: any) => {
      try {
        // For simple field validation, we'll validate the current form state
        const testValues = { ...values, [name]: value };
        schema.parse(testValues);

        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });

        return true;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldError = error.issues.find(err => err.path.includes(name));
          if (fieldError) {
            setErrors(prev => ({
              ...prev,
              [name]: fieldError.message,
            }));
          }
        }
        return false;
      }
    },
    [schema, values]
  );

  const validateForm = useCallback(() => {
    try {
      schema.parse(values);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach(err => {
          const path = err.path.join('.');
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  }, [schema, values]);

  const setValue = useCallback(
    (name: string, value: any, shouldValidate = true) => {
      setValues(prev => ({ ...prev, [name]: value }));

      if (shouldValidate && touched[name]) {
        validateField(name, value);
      }
    },
    [validateField, touched]
  );

  const setFieldTouched = useCallback((name: string, isTouched = true) => {
    setTouched(prev => ({ ...prev, [name]: isTouched }));
  }, []);

  const handleBlur = useCallback(
    (name: string) => {
      setFieldTouched(name, true);
      if (values[name] !== undefined) {
        validateField(name, values[name]);
      }
    },
    [validateField, setFieldTouched, values]
  );

  const handleChange = useCallback(
    (name: string, value: any) => {
      setValue(name, value, touched[name]);
    },
    [setValue, touched]
  );

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();

      // Mark all fields as touched
      const allFieldNames = Object.keys(values);
      const touchedState: Record<string, boolean> = {};
      allFieldNames.forEach(name => {
        touchedState[name] = true;
      });
      setTouched(touchedState);

      if (!validateForm()) {
        return;
      }

      if (onSubmit) {
        setIsSubmitting(true);
        try {
          await onSubmit(values as T);
        } catch (error) {
          console.error('Form submission error:', error);
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [values, validateForm, onSubmit]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const getFieldProps = useCallback(
    (name: string) => ({
      value: (values[name] ?? '') as string,
      onChange: (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      ) => {
        handleChange(name, e.target.value);
      },
      onBlur: () => handleBlur(name),
      error: touched[name] ? errors[name] : undefined,
    }),
    [values, errors, touched, handleChange, handleBlur]
  );

  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    setValue,
    setFieldTouched,
    handleChange,
    handleBlur,
    handleSubmit,
    validateField,
    validateForm,
    reset,
    getFieldProps,
  };
}
