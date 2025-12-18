import { z } from 'zod';

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
    firstName: z.string().min(1, 'First name required'),
    lastName: z.string().min(1, 'Last name required'),
  }),

  secondaryContact: z
    .object({
      firstName: z.string().optional().nullable().or(z.literal('')),
      lastName: z.string().optional().nullable().or(z.literal('')),
    })
    .optional()
    .nullable(),

  status: z.enum(['registered', 'active', 'inactive']),
});

export type ClientDetailsSchema = z.infer<typeof clientDetailsSchema>;
