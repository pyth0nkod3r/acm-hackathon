import { z } from 'zod';

// Common validation patterns
export const ValidationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  url: /^https?:\/\/.+/,
  strongPassword:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

// Form field validation helpers
export const createFieldValidator = <T>(schema: z.ZodSchema<T>) => {
  return (value: unknown): { isValid: boolean; error?: string } => {
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
};

// Form data transformation helpers
export const transformFormData = {
  trimStrings: (data: Record<string, any>): Record<string, any> => {
    const transformed: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        transformed[key] = value.trim();
      } else if (Array.isArray(value)) {
        transformed[key] = value.map(item =>
          typeof item === 'string' ? item.trim() : item
        );
      } else {
        transformed[key] = value;
      }
    }
    return transformed;
  },

  removeEmptyStrings: (data: Record<string, any>): Record<string, any> => {
    const cleaned: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== '' && value !== null && value !== undefined) {
        cleaned[key] = value;
      }
    }
    return cleaned;
  },

  normalizePhoneNumber: (phone: string): string => {
    return phone.replace(/\D/g, '');
  },

  normalizeEmail: (email: string): string => {
    return email.toLowerCase().trim();
  },
};

// Error message helpers
export const getFieldErrorMessage = (
  errors: Record<string, string>,
  fieldName: string
): string | undefined => {
  return errors[fieldName];
};

export const hasFieldError = (
  errors: Record<string, string>,
  fieldName: string
): boolean => {
  return Boolean(errors[fieldName]);
};

// Form state helpers
export const isFormValid = (errors: Record<string, string>): boolean => {
  return Object.keys(errors).length === 0;
};

export const getFormErrorCount = (errors: Record<string, string>): number => {
  return Object.keys(errors).length;
};

// Field focus helpers
export const focusFirstErrorField = (errors: Record<string, string>): void => {
  const firstErrorField = Object.keys(errors)[0];
  if (firstErrorField) {
    const element = document.querySelector(
      `[name="${firstErrorField}"]`
    ) as HTMLElement;
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
};

// Form submission helpers
export const createFormSubmissionHandler = <T>(
  onSubmit: (data: T) => Promise<void> | void,
  onError?: (error: Error) => void
) => {
  return async (data: T) => {
    try {
      await onSubmit(data);
    } catch (error) {
      if (onError) {
        onError(
          error instanceof Error ? error : new Error('Form submission failed')
        );
      } else {
        console.error('Form submission error:', error);
      }
    }
  };
};

// Country and nationality data (commonly used in forms)
export const countries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];

// Gender options
export const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
  { value: 'other', label: 'Other' },
];

// Challenge areas for hackathon
export const challengeAreas = [
  'Digital Trade Infrastructure',
  'Cross-border Payments',
  'Supply Chain Management',
  'Trade Finance',
  'Customs and Compliance',
  'E-commerce Platforms',
  'Trade Data Analytics',
  'Blockchain Solutions',
  'AI/ML Applications',
  'Mobile Solutions',
];
