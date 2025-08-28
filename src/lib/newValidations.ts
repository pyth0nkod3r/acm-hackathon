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

// Team member validation schema for new structure
export const newTeamMemberSchema = z.object({
  teamMemberFullName: nameSchema,
  teamMemberEmail: emailSchema,
  teamMemberPhone: phoneSchema,
  teamMemberRole: requiredTextSchema,
  teamMemberLinkedIn: urlSchema,
});

// New hackathon form validation schema matching HackathonForm interface
export const newHackathonFormSchema = z.object({
  // Team Information
  teamName: requiredTextSchema.min(
    3,
    'Team name must be at least 3 characters'
  ),
  teamSize: z.string().min(1, 'Team size is required'),
  countryOfResidence: requiredTextSchema,
  hackathonExperience: z.enum(['Yes', 'No']),
  hackathonExperienceDesc: z.string().optional(),

  // Team Leader Information
  teamLeaderFullName: nameSchema,
  teamLeaderPhone: phoneSchema,
  teamLeaderEmail: emailSchema,
  teamLeaderLinkedIn: urlSchema,
  teamLeaderRole: requiredTextSchema,

  // Team Members Information
  teamMembers: z.array(newTeamMemberSchema).optional(),

  // Challenge and Solution Information
  challengeSolving: requiredTextSchema.min(
    10,
    'Challenge description must be at least 10 characters'
  ),
  challengeAims: requiredTextSchema
    .min(50, 'Challenge aims must be at least 50 characters')
    .max(250, 'Challenge aims must be less than 250 characters'),
  solutionEnvision: requiredTextSchema
    .min(50, 'Solution vision must be at least 50 characters')
    .max(250, 'Solution vision must be less than 250 characters'),
  uniquelyPositioned: requiredTextSchema
    .min(50, 'Team positioning must be at least 50 characters')
    .max(150, 'Team positioning must be less than 150 characters'),

  // Availability and Logistics
  teamAvailability: z.enum(['Yes', 'No']),
  teamAvailabilityDesc: z.string().optional(),
  dietaryRestrictions: z.enum(['Yes', 'No']),
  dietaryRestrictionsDesc: z.string().optional(),

  // Declaration & Consent
  declarations: z
    .array(z.string())
    .min(3, 'All required declarations must be accepted'),
  teamLeadSignature: requiredTextSchema.min(
    2,
    'Team lead signature must be at least 2 characters'
  ),
});

// Validation helper functions
export const validateNewField = <T>(
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

export const validateNewForm = <T>(
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

export type NewHackathonFormData = z.infer<typeof newHackathonFormSchema>;
export type NewTeamMemberData = z.infer<typeof newTeamMemberSchema>;