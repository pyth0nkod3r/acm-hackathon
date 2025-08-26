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

// Team member validation schema (simplified for new form)
export const teamMemberSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  role: requiredTextSchema,
  linkedin: urlSchema,
});

// Contact form validation schema
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: requiredTextSchema.min(5, 'Subject must be at least 5 characters'),
  message: requiredTextSchema.min(10, 'Message must be at least 10 characters'),
});

// Registration form validation schema (updated for new form structure)
export const registrationFormSchema = z.object({
  // Section 1: Team Information
  teamName: requiredTextSchema.min(
    3,
    'Team name must be at least 3 characters'
  ),
  teamSize: z
    .number()
    .min(3, 'Team must have at least 3 members')
    .max(5, 'Team cannot exceed 5 members'),
  countryOfResidence: requiredTextSchema,
  hackathonExperience: z.enum(['yes', 'no']),
  hackathonExperienceDetails: z.string().optional(),

  // Section 2: Team Lead Information
  teamLeader: teamMemberSchema,

  // Section 3: Team Members Information
  teamMembers: z.array(teamMemberSchema).optional(),

  // Section 4: Idea Summary
  creativeIndustryChallenge: requiredTextSchema.min(
    10,
    'Challenge description must be at least 10 characters'
  ),
  distributionChallenge: requiredTextSchema
    .min(50, 'Distribution challenge must be at least 50 characters')
    .max(250, 'Distribution challenge must be less than 250 characters'),
  solutionVision: requiredTextSchema
    .min(50, 'Solution vision must be at least 50 characters')
    .max(250, 'Solution vision must be less than 250 characters'),
  teamPositioning: requiredTextSchema
    .min(50, 'Team positioning must be at least 50 characters')
    .max(150, 'Team positioning must be less than 150 characters'),

  // Section 5: Logistics
  allMembersAvailable: z.boolean(),
  availabilityExplanation: z.string().optional(),
  hasDietaryRestrictions: z.boolean(),
  dietaryNeeds: z.string().optional(),

  // Section 6: Declaration & Consent
  declarations: z
    .array(z.string())
    .min(3, 'All required declarations must be accepted'),
  digitalSignature: requiredTextSchema.min(
    2,
    'Digital signature must be at least 2 characters'
  ),
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
