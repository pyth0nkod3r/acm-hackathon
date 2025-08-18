/**
 * useFormValidation hook tests
 * Tests form validation logic, state management, and error handling
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { z } from 'zod';
import { useFormValidation } from '../useFormValidation';

// Test schema for validation
const testSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  age: z.number().min(18, 'Must be at least 18 years old'),
  optional: z.string().optional(),
});

type TestFormData = z.infer<typeof testSchema>;

describe('useFormValidation', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with default values', () => {
    const initialValues = { name: 'John', email: 'john@example.com', age: 25 };
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        initialValues,
        onSubmit: mockOnSubmit,
      })
    );

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isValid).toBe(true);
  });

  it('initializes with empty values when no initial values provided', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        onSubmit: mockOnSubmit,
      })
    );

    expect(result.current.values).toEqual({});
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
  });

  it('updates field values correctly', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        onSubmit: mockOnSubmit,
      })
    );

    act(() => {
      result.current.setValue('name', 'John Doe');
    });

    expect(result.current.values.name).toBe('John Doe');
  });

  it('validates fields on blur when touched', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        onSubmit: mockOnSubmit,
      })
    );

    act(() => {
      result.current.setValue('name', 'J'); // Invalid - too short
      result.current.handleBlur('name');
    });

    expect(result.current.touched.name).toBe(true);
    expect(result.current.errors.name).toBe(
      'Name must be at least 2 characters'
    );
    expect(result.current.isValid).toBe(false);
  });

  it('clears errors when field becomes valid', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        onSubmit: mockOnSubmit,
      })
    );

    // Set invalid value first
    act(() => {
      result.current.setValue('name', 'J');
      result.current.handleBlur('name');
    });

    expect(result.current.errors.name).toBe(
      'Name must be at least 2 characters'
    );

    // Fix the value
    act(() => {
      result.current.setValue('name', 'John');
    });

    expect(result.current.errors.name).toBeUndefined();
  });

  it('validates email format correctly', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        onSubmit: mockOnSubmit,
      })
    );

    act(() => {
      result.current.setValue('email', 'invalid-email');
      result.current.handleBlur('email');
    });

    expect(result.current.errors.email).toBe('Invalid email format');

    act(() => {
      result.current.setValue('email', 'valid@example.com');
    });

    expect(result.current.errors.email).toBeUndefined();
  });

  it('validates number fields correctly', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        onSubmit: mockOnSubmit,
      })
    );

    act(() => {
      result.current.setValue('age', 16);
      result.current.handleBlur('age');
    });

    expect(result.current.errors.age).toBe('Must be at least 18 years old');

    act(() => {
      result.current.setValue('age', 25);
    });

    expect(result.current.errors.age).toBeUndefined();
  });

  it('handles form submission with valid data', async () => {
    const mockSubmit = vi.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        onSubmit: mockSubmit,
      })
    );

    // Set valid values
    act(() => {
      result.current.setValue('name', 'John Doe');
      result.current.setValue('email', 'john@example.com');
      result.current.setValue('age', 25);
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(mockSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      age: 25,
    });
  });

  it('prevents submission with invalid data', async () => {
    const mockSubmit = vi.fn();
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        onSubmit: mockSubmit,
      })
    );

    // Set invalid values
    act(() => {
      result.current.setValue('name', 'J'); // Too short
      result.current.setValue('email', 'invalid'); // Invalid email
      result.current.setValue('age', 16); // Too young
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(result.current.errors.name).toBe(
      'Name must be at least 2 characters'
    );
    expect(result.current.errors.email).toBe('Invalid email format');
    expect(result.current.errors.age).toBe('Must be at least 18 years old');
  });

  it('marks all fields as touched on submission', async () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        onSubmit: mockOnSubmit,
      })
    );

    act(() => {
      result.current.setValue('name', 'John');
      result.current.setValue('email', 'john@example.com');
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.touched.name).toBe(true);
    expect(result.current.touched.email).toBe(true);
  });

  it('handles submission loading state', async () => {
    const mockSubmit = vi
      .fn()
      .mockImplementation(
        () => new Promise(resolve => setTimeout(resolve, 100))
      );
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        onSubmit: mockSubmit,
      })
    );

    // Set valid values
    act(() => {
      result.current.setValue('name', 'John Doe');
      result.current.setValue('email', 'john@example.com');
      result.current.setValue('age', 25);
    });

    const submitPromise = act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.isSubmitting).toBe(true);

    await submitPromise;

    expect(result.current.isSubmitting).toBe(false);
  });

  it('handles submission errors gracefully', async () => {
    const mockSubmit = vi
      .fn()
      .mockRejectedValue(new Error('Submission failed'));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        onSubmit: mockSubmit,
      })
    );

    // Set valid values
    act(() => {
      result.current.setValue('name', 'John Doe');
      result.current.setValue('email', 'john@example.com');
      result.current.setValue('age', 25);
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.isSubmitting).toBe(false);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Form submission error:',
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });

  it('resets form state correctly', () => {
    const initialValues = { name: 'John', email: 'john@example.com', age: 25 };
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        initialValues,
        onSubmit: mockOnSubmit,
      })
    );

    // Modify form state
    act(() => {
      result.current.setValue('name', 'Jane');
      result.current.handleBlur('name');
    });

    expect(result.current.values.name).toBe('Jane');
    expect(result.current.touched.name).toBe(true);

    // Reset form
    act(() => {
      result.current.reset();
    });

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
  });

  it('provides correct field props for form inputs', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        initialValues: { name: 'John' },
        onSubmit: mockOnSubmit,
      })
    );

    const fieldProps = result.current.getFieldProps('name');

    expect(fieldProps.value).toBe('John');
    expect(typeof fieldProps.onChange).toBe('function');
    expect(typeof fieldProps.onBlur).toBe('function');
  });

  it('handles change events from field props correctly', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        onSubmit: mockOnSubmit,
      })
    );

    const fieldProps = result.current.getFieldProps('name');
    const mockEvent = {
      target: { value: 'New Name' },
    } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      fieldProps.onChange(mockEvent);
    });

    expect(result.current.values.name).toBe('New Name');
  });

  it('validates entire form correctly', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        onSubmit: mockOnSubmit,
      })
    );

    // Set invalid values
    act(() => {
      result.current.setValue('name', 'J');
      result.current.setValue('email', 'invalid');
    });

    act(() => {
      const isValid = result.current.validateForm();
      expect(isValid).toBe(false);
    });

    expect(result.current.errors.name).toBe(
      'Name must be at least 2 characters'
    );
    expect(result.current.errors.email).toBe('Invalid email format');

    // Fix values
    act(() => {
      result.current.setValue('name', 'John Doe');
      result.current.setValue('email', 'john@example.com');
      result.current.setValue('age', 25);
    });

    act(() => {
      const isValid = result.current.validateForm();
      expect(isValid).toBe(true);
    });

    expect(result.current.errors).toEqual({});
  });

  it('handles optional fields correctly', () => {
    const { result } = renderHook(() =>
      useFormValidation({
        schema: testSchema,
        onSubmit: mockOnSubmit,
      })
    );

    // Set required fields only
    act(() => {
      result.current.setValue('name', 'John Doe');
      result.current.setValue('email', 'john@example.com');
      result.current.setValue('age', 25);
      // optional field is not set
    });

    act(() => {
      const isValid = result.current.validateForm();
      expect(isValid).toBe(true);
    });

    expect(result.current.errors).toEqual({});
  });
});
