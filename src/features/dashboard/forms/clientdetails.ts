import { z } from 'zod';

const nameRegex = /^[A-Za-z\s]+$/;

export const clientDetailsSchema = z.object({
  id: z.string().min(1, 'Client ID is required'),

  organizationName: z.string().min(1, 'Organization name is required'),
  email: z.string().email('Invalid email'),

  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Invalid mobile number')
    .min(10, 'Mobile is required'),

  location: z.string().trim().optional().nullable().or(z.literal('')),

  gstin: z
    .string()
    .regex(/^[0-9A-Z]{15}$/, 'Invalid GSTIN format')
    .optional()
    .nullable()
    .or(z.literal('')),

  panCard: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'Invalid PAN format')
    .optional()
    .nullable()
    .or(z.literal('')),

  primaryContact: z.object({
    firstName: z
      .string()
      .min(1, 'First name required')
      .regex(nameRegex, 'First name must contain only letters'),

    lastName: z
      .string()
      .min(1, 'Last name required')
      .regex(nameRegex, 'Last name must contain only letters'),
  }),

  secondaryContact: z
    .object({
      firstName: z
        .string()
        .regex(nameRegex, 'First name must contain only letters')
        .optional()
        .nullable()
        .or(z.literal('')),

      lastName: z
        .string()
        .regex(nameRegex, 'Last name must contain only letters')
        .optional()
        .nullable()
        .or(z.literal('')),
    })
    .optional()
    .nullable(),

  status: z.enum(['registered', 'active', 'inactive']),
});

export type ClientDetailsSchema = z.infer<typeof clientDetailsSchema>;
