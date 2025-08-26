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
  .or(z.literal(''))
  .transform(val => val || '') // Transform undefined to empty string
  .refine(val => val === '' || val.match(/^https?:\/\/.+/), {
    message: 'Please enter a valid URL or leave empty',
  });
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
  gender: requiredTextSchema,
  dateOfBirth: z.string().optional(),
  stateCity: requiredTextSchema,
  educationLevel: requiredTextSchema,
  fieldOfStudy: requiredTextSchema,
  occupation: requiredTextSchema,
  organization: optionalTextSchema,
  portfolio: urlSchema,
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
  applicationType: z.enum(['Individual', 'Team Representative', 'Team Member']),
  teamRoles: z
    .array(z.string())
    .min(1, 'At least one team role must be selected'),
  teamIntroduction: z
    .string()
    .min(10, 'Team introduction must be at least 10 characters')
    .max(150, 'Team introduction must be less than 150 characters'),
  projectTitle: z
    .string()
    .min(5, 'Project title must be at least 5 characters'),
  ideaSummary: z
    .string()
    .min(50, 'Idea summary must be at least 50 characters'),
  problemSolving: z
    .string()
    .min(50, 'Problem solving description must be at least 50 characters'),
  technology: z
    .string()
    .min(10, 'Technology description must be at least 10 characters'),
  alignment: z
    .string()
    .min(50, 'Alignment description must be at least 50 characters'),
  hasPrototype: z.boolean(),
  prototypeURL: z.string().url().optional().or(z.literal('')),
  projectRepo: z.string().url().optional().or(z.literal('')),
  challengeAreas: z
    .array(z.string())
    .min(1, 'At least one challenge area must be selected'),
  declarations: z
    .array(z.string())
    .min(3, 'All required declarations must be accepted'),
  travelSupport: z.boolean(),
  accommodationSupport: z.boolean(),
  dietaryPreferences: z.string().optional(),
  accessibilityNeeds: z.string().optional(),
  hackathonExperience: z.enum(['yes', 'no']),
  hackathonExperienceDetails: z.string().optional(),
  motivation: z
    .string()
    .min(100, 'Motivation must be at least 100 characters')
    .max(300, 'Motivation must be less than 300 characters'),
  technicalSkills: z.array(z.string()).optional(),
  creativeSkills: z.array(z.string()).optional(),
  digitalSignature: z.string().min(1, 'Digital signature is required'),
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
      const errorMessage = error.issues[0]?.message;
      return {
        isValid: false,
        error: errorMessage || 'Validation failed',
      };
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
