import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export const clientRegisterSchema = z.object({
  organizationName: z.string().min(1, 'Organization name is required'),

  primaryFirstName: z
    .string()
    .min(1, 'First name is required')
    .regex(/^[A-Za-z ]+$/, 'Only letters  are allowed'),

  primaryLastName: z
    .string()
    .min(1, 'Last name is required')
    .regex(/^[A-Za-z ]+$/, 'Only letters  are allowed'),

  email: z.string().email('Invalid email address'),

  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain uppercase, lowercase, number and special character'
    )
    .min(8, 'Password must be at least 8 characters long')
    .max(16, 'Password must be at most 16 characters long'),

  mobile: z.string().min(10, 'Mobile is required'),

  location: z
    .union([z.string(), z.undefined()])
    .refine((val) => !val || val === '' || val.length > 0, {
      message: 'Enter a valid location',
    }),

  gstin: z
    .string()
    .regex(/^[0-9A-Z]{15}$/, 'Invalid GSTIN format')
    .min(1, 'GSTIN is required'),

  panCard: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'Invalid PAN format')
    .min(1, 'PAN Card is required'),

  category: z.enum(['IT', 'Non-IT'], {
    errorMap: () => ({ message: 'Category is required' }),
  }),

  logoImage: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `File size must be less than 5MB`
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only JPG, JPEG, and PNG formats are accepted'
    )
    .optional()
    .nullable()
    .or(z.literal('')),
});

export type ClientRegisterFormValues = z.infer<typeof clientRegisterSchema>;
