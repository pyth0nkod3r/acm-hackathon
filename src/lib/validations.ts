import { z } from 'zod';

// Email validation schema
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address');

// Phone validation schema
export const phoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .regex(/^[+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number');

// Name validation schema
export const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters');

// Age validation schema
export const ageSchema = z
  .number()
  .min(16, 'Must be at least 16 years old')
  .max(100, 'Age must be less than 100');

// URL validation schema
export const urlSchema = z
  .string()
  .url('Please enter a valid URL')
  .optional()
  .or(z.literal(''));

// Required text field validation
export const requiredTextSchema = z
  .string()
  .min(1, 'This field is required')
  .trim();

// Optional text field validation
export const optionalTextSchema = z.string().optional();

// Team member validation schema
export const teamMemberSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  role: requiredTextSchema,
  linkedin: urlSchema,
  country: requiredTextSchema,
  nationality: requiredTextSchema,
  age: ageSchema,
  gender: optionalTextSchema,
});

// Contact form validation schema
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: requiredTextSchema.min(5, 'Subject must be at least 5 characters'),
  message: requiredTextSchema.min(10, 'Message must be at least 10 characters'),
});

// Registration form validation schema
export const registrationFormSchema = z.object({
  teamName: requiredTextSchema.min(
    3,
    'Team name must be at least 3 characters'
  ),
  teamSize: z
    .number()
    .min(1, 'Team must have at least 1 member')
    .max(5, 'Team cannot exceed 5 members'),
  teamLeader: teamMemberSchema,
  teamMembers: z
    .array(teamMemberSchema)
    .max(4, 'Maximum 4 additional team members'),
  projectTitle: requiredTextSchema.min(
    5,
    'Project title must be at least 5 characters'
  ),
  ideaSummary: requiredTextSchema.min(
    50,
    'Idea summary must be at least 50 characters'
  ),
  problemSolving: requiredTextSchema.min(
    50,
    'Problem solving description must be at least 50 characters'
  ),
  technology: requiredTextSchema.min(
    20,
    'Technology description must be at least 20 characters'
  ),
  alignment: requiredTextSchema.min(
    30,
    'Alignment description must be at least 30 characters'
  ),
  hasPrototype: z.boolean(),
  prototypeURL: urlSchema,
  projectRepo: urlSchema,
  challengeAreas: z
    .array(z.string())
    .min(1, 'Please select at least one challenge area'),
  declarations: z
    .array(z.string())
    .min(1, 'Please accept the required declarations'),
});

// Validation helper functions
export const validateField = <T>(
  schema: z.ZodSchema<T>,
  value: unknown
): { isValid: boolean; error?: string } => {
  try {
    schema.parse(value);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.issues[0]?.message };
    }
    return { isValid: false, error: 'Validation failed' };
  }
};

export const validateForm = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { isValid: boolean; errors: Record<string, string> } => {
  try {
    schema.parse(data);
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.issues.forEach(err => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: 'Validation failed' } };
  }
};

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type RegistrationFormData = z.infer<typeof registrationFormSchema>;
export type TeamMemberData = z.infer<typeof teamMemberSchema>;
